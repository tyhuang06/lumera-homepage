// Post-build static prerendering for GitHub Pages.
//
// Why this exists: GitHub Pages is a plain static file host. Only a URL that
// maps to a real file on disk returns HTTP 200 — every other path falls
// through to public/404.html (a client-side redirect stub) with an actual
// 404 status code. Since this is a client-rendered SPA, before this script
// ran, the *only* URL that ever returned 200 was "/" — every product page,
// category page, and content page 404'd at the HTTP level, which is enough
// for most crawlers (including AI/answer-engine bots that don't run JS, and
// often Googlebot's non-JS first pass) to skip them entirely.
//
// This script runs after `vite build` and writes a real dist/<route>/index.html
// for every route in scripts/lib/routes.ts, so the file — and therefore a 200
// status — genuinely exists at that path. Each file:
//   1. Carries the route's real <title>/description/canonical/OG/Twitter tags
//      and any page-specific JSON-LD (Product, CollectionPage, FAQPage), baked
//      into the HTML rather than injected by JS.
//   2. Has a small, real, crawlable content shell inside #root (heading,
//      description, links to related pages) built directly from the same
//      data/i18n sources the live app uses — not the full interactive app
//      (Swiper carousels etc. aren't SSR-safe without much bigger changes).
//   3. Still loads the normal client bundle, which mounts with
//      `createRoot(...).render(...)` (not `hydrateRoot`) — see src/main.tsx —
//      so it simply replaces the shell with the full interactive app for
//      real visitors. No hydration mismatch risk.
//
// Content is prerendered in English only. The EN/zh-Hant toggle
// (LanguageSwitcher.tsx) doesn't change the URL, so there's one shell per
// route; zh-Hant visitors still get the full experience client-side exactly
// as they do today.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import i18next from "i18next";

import { getRoutes, type Route } from "./lib/routes.ts";
import { products } from "../src/data/products/index.ts";
import { GIFT_PICK_IDS, PREMIUM_PICK_IDS } from "../src/data/giftPicks.ts";
import { homeIcons } from "../src/data/homeIcons.ts";

import commonEN from "../src/i18n/en/common.json" with { type: "json" };
import ringsEN from "../src/i18n/en/products/rings.json" with { type: "json" };
import necklacesEN from "../src/i18n/en/products/necklaces.json" with { type: "json" };
import earringsEN from "../src/i18n/en/products/earrings.json" with { type: "json" };
import braceletsEN from "../src/i18n/en/products/bracelets.json" with { type: "json" };

type ProductsNS = Record<string, Record<string, string>>;
function mergeProducts(...namespaces: ProductsNS[]): ProductsNS {
	const merged: ProductsNS = {};
	for (const ns of namespaces) {
		for (const [section, entries] of Object.entries(ns)) {
			merged[section] = { ...merged[section], ...entries };
		}
	}
	return merged;
}
const productsEN = mergeProducts(ringsEN, necklacesEN, earringsEN, braceletsEN);

await i18next.init({
	resources: { en: { common: commonEN, products: productsEN } },
	lng: "en",
	fallbackLng: "en",
	ns: ["common", "products"],
	defaultNS: "common",
	interpolation: { escapeValue: false },
});
const t = i18next.t.bind(i18next);

const SITE_URL = "https://lumerafinepearls.com";
const DEFAULT_IMAGE = `${SITE_URL}/gallery/logo.webp`;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const distDir = path.join(repoRoot, "dist");
const templatePath = path.join(distDir, "index.html");

if (!fs.existsSync(templatePath)) {
	console.error("✖ dist/index.html not found — run `vite build` before `yarn prerender`.");
	process.exit(1);
}
const template = fs.readFileSync(templatePath, "utf8");

function escapeHtml(s: string): string {
	return s
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}

function absoluteUrl(image: string): string {
	return image.startsWith("http") ? image : `${SITE_URL}${image}`;
}

type PageData = {
	title: string;
	description: string;
	image?: string;
	type?: "website" | "product";
	jsonLd?: object[];
	bodyHtml: string;
};

function renderRoute(routePath: string, page: PageData): string {
	const url = `${SITE_URL}${routePath}`;
	const image = absoluteUrl(page.image ?? DEFAULT_IMAGE);
	const type = page.type ?? "website";

	let html = template;
	html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(page.title)}</title>`);
	html = html.replace(
		/<meta name="description" content="[^"]*"\s*\/>/,
		`<meta name="description" content="${escapeHtml(page.description)}" />`,
	);

	const headTags = [
		`<link rel="canonical" href="${url}" />`,
		`<meta property="og:type" content="${type}" />`,
		`<meta property="og:site_name" content="Luméra Fine Pearls" />`,
		`<meta property="og:title" content="${escapeHtml(page.title)}" />`,
		`<meta property="og:description" content="${escapeHtml(page.description)}" />`,
		`<meta property="og:url" content="${url}" />`,
		`<meta property="og:image" content="${image}" />`,
		`<meta name="twitter:card" content="summary_large_image" />`,
		`<meta name="twitter:title" content="${escapeHtml(page.title)}" />`,
		`<meta name="twitter:description" content="${escapeHtml(page.description)}" />`,
		`<meta name="twitter:image" content="${image}" />`,
		...(page.jsonLd ?? []).map((obj) => `<script type="application/ld+json">${JSON.stringify(obj)}</script>`),
	].join("\n    ");

	html = html.replace("</head>", `    ${headTags}\n  </head>`);
	html = html.replace('<div id="root"></div>', `<div id="root">${page.bodyHtml}</div>`);

	return html;
}

function writeRoute(routePath: string, html: string): void {
	const outPath =
		routePath === "/"
			? path.join(distDir, "index.html")
			: path.join(distDir, routePath.replace(/^\//, ""), "index.html");
	fs.mkdirSync(path.dirname(outPath), { recursive: true });
	fs.writeFileSync(outPath, html);
}

function productLink(id: string): string {
	const product = products.find((p) => p.id === id);
	if (!product) return "";
	const title = t(`products:${product.titleKey}`);
	return `<li><a href="/products/${product.id}">${escapeHtml(title)}</a></li>`;
}

/** Flattens a faq.qN.answer block (string | {type:'list', items}) into plain text. */
function flattenAnswer(blocks: unknown): string {
	if (!Array.isArray(blocks)) return "";
	return blocks
		.map((block) => {
			if (typeof block === "string") return block;
			if (block && typeof block === "object" && "items" in block) {
				return (block as { items: string[] }).items.join("; ");
			}
			return "";
		})
		.join(" ");
}

function buildPage(route: Route): PageData {
	switch (route.kind) {
		case "static":
			return buildStaticPage(route.path);
		case "category":
			return buildCategoryPage(route);
		case "product":
			return buildProductPage(route);
	}
}

function buildStaticPage(routePath: string): PageData {
	switch (routePath) {
		case "/": {
			const description = t("seo.home.description");
			const featured = homeIcons.map(productLink).join("");
			return {
				title: t("seo.home.title"),
				description,
				bodyHtml: `
					<h1>Luméra Fine Pearls</h1>
					<p>${escapeHtml(description)}</p>
					<nav>
						<a href="/collections/rings">${escapeHtml(t("categories.rings"))}</a>
						<a href="/collections/necklaces">${escapeHtml(t("categories.necklaces"))}</a>
						<a href="/collections/earrings">${escapeHtml(t("categories.earrings"))}</a>
						<a href="/collections/bracelets">${escapeHtml(t("categories.bracelets"))}</a>
						<a href="/icons">${escapeHtml(t("nav.icons"))}</a>
						<a href="/gifting">${escapeHtml(t("nav.gifting"))}</a>
						<a href="/story">${escapeHtml(t("nav.ourStory"))}</a>
					</nav>
					<ul>${featured}</ul>
				`,
			};
		}
		case "/icons": {
			const description = t("seo.icons.description");
			const featured = products.filter((p) => p.featured).map((p) => productLink(p.id)).join("");
			return {
				title: t("seo.icons.title"),
				description,
				bodyHtml: `<h1>${escapeHtml(t("icons.title"))}</h1><p>${escapeHtml(description)}</p><ul>${featured}</ul>`,
			};
		}
		case "/gifting": {
			const description = t("seo.gifting.description");
			const giftPicks = GIFT_PICK_IDS.map(productLink).join("");
			const premiumPicks = PREMIUM_PICK_IDS.map(productLink).join("");
			return {
				title: t("seo.gifting.title"),
				description,
				image: "/gallery/gift/gifting-1.webp",
				bodyHtml: `
					<h1>${escapeHtml(t("gifting.hero.title"))}</h1>
					<p>${escapeHtml(description)}</p>
					<ul>${giftPicks}${premiumPicks}</ul>
				`,
			};
		}
		case "/story":
			return {
				title: t("seo.story.title"),
				description: t("seo.story.description"),
				image: "/gallery/our-story/ourstory-1.webp",
				bodyHtml: `<h1>${escapeHtml(t("story.title"))}</h1><p>${escapeHtml(t("seo.story.description"))}</p>`,
			};
		case "/materials":
			return {
				title: t("seo.materials.title"),
				description: t("seo.materials.description"),
				bodyHtml: `<h1>${escapeHtml(t("materials.title"))}</h1><p>${escapeHtml(t("seo.materials.description"))}</p>`,
			};
		case "/faq": {
			const description = t("seo.faq.description");
			const keys = ["q1", "q2", "q3"] as const;
			const qas = keys.map((key) => ({
				question: t(`faq.${key}.question`),
				answer: flattenAnswer(t(`faq.${key}.answer`, { returnObjects: true })),
			}));
			const faqJsonLd = {
				"@context": "https://schema.org",
				"@type": "FAQPage",
				mainEntity: qas.map((qa) => ({
					"@type": "Question",
					name: qa.question,
					acceptedAnswer: { "@type": "Answer", text: qa.answer },
				})),
			};
			return {
				title: t("seo.faq.title"),
				description,
				jsonLd: [faqJsonLd],
				bodyHtml: `
					<h1>${escapeHtml(t("faq.title"))}</h1>
					<dl>
						${qas.map((qa) => `<dt>${escapeHtml(qa.question)}</dt><dd>${escapeHtml(qa.answer)}</dd>`).join("")}
					</dl>
				`,
			};
		}
		default:
			throw new Error(`Unknown static route: ${routePath}`);
	}
}

function buildCategoryPage(route: Extract<Route, { kind: "category" }>): PageData {
	const slug = route.category.slug;
	const label = t(`categories.${slug}`);
	const title = `${label} | Luméra Fine Pearls`;
	const filtered = products.filter((p) => p.category === slug);
	const priceHeadline = t(`${slug}.priceHeadline`, { defaultValue: "" });
	const description = priceHeadline
		? t("seo.category.descriptionWithPrice", { label, priceHeadline })
		: t("seo.category.description", { label });

	const itemListJsonLd = {
		"@context": "https://schema.org",
		"@type": "CollectionPage",
		name: title,
		description,
		url: `${SITE_URL}${route.path}`,
		mainEntity: {
			"@type": "ItemList",
			itemListElement: filtered.map((p, i) => ({
				"@type": "ListItem",
				position: i + 1,
				url: `${SITE_URL}/products/${p.id}`,
			})),
		},
	};

	return {
		title,
		description,
		image: filtered[0]?.images[0],
		jsonLd: [itemListJsonLd],
		bodyHtml: `
			<h1>${escapeHtml(label)}</h1>
			<p>${escapeHtml(description)}</p>
			<ul>${filtered.map((p) => productLink(p.id)).join("")}</ul>
		`,
	};
}

function buildProductPage(route: Extract<Route, { kind: "product" }>): PageData {
	const product = route.product;
	const title = t(`products:${product.titleKey}`);
	const categoryLabel = t(`categories.${product.category}`);
	const description = product.descriptionKey
		? t(`products:descriptions.${product.descriptionKey}`)
		: t("seo.product.descriptionFallback", { title });

	const productJsonLd = {
		"@context": "https://schema.org",
		"@type": "Product",
		name: title,
		description,
		image: product.images.map(absoluteUrl),
		url: `${SITE_URL}${route.path}`,
		category: categoryLabel,
		brand: { "@type": "Brand", name: "Luméra Fine Pearls" },
	};

	return {
		title: `${title} | Luméra Fine Pearls`,
		description,
		image: product.images[0],
		type: "product",
		jsonLd: [productJsonLd],
		bodyHtml: `
			<h1>${escapeHtml(title)}</h1>
			<p>${escapeHtml(description)}</p>
			<img src="${product.images[0]}" alt="${escapeHtml(title)}" />
			<a href="/collections/${product.category}">${escapeHtml(categoryLabel)}</a>
		`,
	};
}

let count = 0;
for (const route of getRoutes()) {
	const page = buildPage(route);
	const html = renderRoute(route.path, page);
	writeRoute(route.path, html);
	count++;
}

console.log(`✓ Prerendered ${count} routes to dist/`);
