// Verifies that the split product data (src/data/products/*) and its
// translations (src/i18n/*/products/*) haven't drifted apart. Run via
// `yarn check-data`; wired into CI so a missing translation or a dangling
// homeIcons/image reference fails the build instead of shipping broken.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { products } from "../src/data/products/index.ts";
import { homeIcons } from "../src/data/homeIcons.ts";
import { findLine, reportError, reportWarning } from "./lib/annotate.ts";

import ringsEN from "../src/i18n/en/products/rings.json" with { type: "json" };
import necklacesEN from "../src/i18n/en/products/necklaces.json" with { type: "json" };
import earringsEN from "../src/i18n/en/products/earrings.json" with { type: "json" };
import braceletsEN from "../src/i18n/en/products/bracelets.json" with { type: "json" };
import ringsZH from "../src/i18n/zh-Hant/products/rings.json" with { type: "json" };
import necklacesZH from "../src/i18n/zh-Hant/products/necklaces.json" with { type: "json" };
import earringsZH from "../src/i18n/zh-Hant/products/earrings.json" with { type: "json" };
import braceletsZH from "../src/i18n/zh-Hant/products/bracelets.json" with { type: "json" };

type ProductsNS = {
	products?: Record<string, string>;
	descriptions?: Record<string, string>;
	sidenotes?: Record<string, string>;
};

function mergeNamespaces(...namespaces: ProductsNS[]) {
	const merged: Required<ProductsNS> = { products: {}, descriptions: {}, sidenotes: {} };
	for (const ns of namespaces) {
		Object.assign(merged.products, ns.products);
		Object.assign(merged.descriptions, ns.descriptions);
		Object.assign(merged.sidenotes, ns.sidenotes);
	}
	return merged;
}

const en = mergeNamespaces(ringsEN, necklacesEN, earringsEN, braceletsEN);
const zh = mergeNamespaces(ringsZH, necklacesZH, earringsZH, braceletsZH);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const publicDir = path.join(repoRoot, "public");

let errorCount = 0;
let warningCount = 0;

function relDataFile(category: string) {
	return path.join("src", "data", "products", `${category}.ts`);
}
function relI18nFile(lang: string, category: string) {
	return path.join("src", "i18n", lang, "products", `${category}.json`);
}

/** Line of `id: "<id>"` inside its own category's data file. */
function productDefLine(id: string, category: string): number | undefined {
	return findLine(path.join(repoRoot, relDataFile(category)), `id: "${id}"`);
}

// 1. Duplicate product ids
const seenIds = new Map<string, string>(); // id -> category of first sighting
for (const p of products) {
	const firstCategory = seenIds.get(p.id);
	if (firstCategory) {
		errorCount++;
		reportError(`Duplicate product id "${p.id}" (also defined in ${relDataFile(firstCategory)})`, {
			file: relDataFile(p.category),
			line: productDefLine(p.id, p.category),
		});
	}
	seenIds.set(p.id, p.category);
}

// 2. Every product's title/description resolve in both languages; every image exists
for (const p of products) {
	const titleId = p.titleKey.replace(/^products\./, "");
	const defLine = productDefLine(p.id, p.category);
	const defLoc = { file: relDataFile(p.category), line: defLine };

	if (!(titleId in en.products)) {
		errorCount++;
		reportError(`Missing EN title for "${p.id}" — add "${titleId}" to ${relI18nFile("en", p.category)}`, defLoc);
	}
	if (!(titleId in zh.products)) {
		errorCount++;
		reportError(`Missing ZH title for "${p.id}" — add "${titleId}" to ${relI18nFile("zh-Hant", p.category)}`, defLoc);
	}

	if (p.descriptionKey) {
		if (!(p.descriptionKey in en.descriptions)) {
			errorCount++;
			reportError(
				`Missing EN description for "${p.id}" — add "${p.descriptionKey}" to ${relI18nFile("en", p.category)}`,
				defLoc,
			);
		}
		if (!(p.descriptionKey in zh.descriptions)) {
			errorCount++;
			reportError(
				`Missing ZH description for "${p.id}" — add "${p.descriptionKey}" to ${relI18nFile("zh-Hant", p.category)}`,
				defLoc,
			);
		}
	}

	for (const img of p.images) {
		const abs = path.join(publicDir, img);
		if (!fs.existsSync(abs)) {
			errorCount++;
			const imgLine = findLine(path.join(repoRoot, relDataFile(p.category)), `"${img}"`);
			reportError(`Missing image file for "${p.id}": ${img}`, { file: relDataFile(p.category), line: imgLine });
		}
	}
}

// 3. Every homeIcons entry resolves to a real product
const homeIconsFile = path.join("src", "data", "homeIcons.ts");
const productIds = new Set(products.map((p) => p.id));
for (const id of homeIcons) {
	if (!productIds.has(id)) {
		errorCount++;
		const line = findLine(path.join(repoRoot, homeIconsFile), `"${id}"`);
		reportError(`homeIcons references unknown product id: "${id}"`, { file: homeIconsFile, line });
	}
}

// 4. Orphaned translations (present in JSON, no matching product) — non-fatal
const titleIds = new Set(products.map((p) => p.titleKey.replace(/^products\./, "")));
const categories = ["rings", "necklaces", "earrings", "bracelets"] as const;
const perCategoryEN = { rings: ringsEN, necklaces: necklacesEN, earrings: earringsEN, bracelets: braceletsEN };
const perCategoryZH = { rings: ringsZH, necklaces: necklacesZH, earrings: earringsZH, bracelets: braceletsZH };

for (const category of categories) {
	for (const [lang, data] of [["en", perCategoryEN[category]], ["zh-Hant", perCategoryZH[category]]] as const) {
		for (const key of Object.keys(data.products ?? {})) {
			if (!titleIds.has(key)) {
				warningCount++;
				const file = relI18nFile(lang, category);
				const line = findLine(path.join(repoRoot, file), `"${key}":`, { before: '"descriptions"' });
				reportWarning(`${lang} products.${key} has no matching product (orphaned translation)`, { file, line });
			}
		}
	}
}

if (errorCount > 0) {
	console.error(`\n✖ ${errorCount} error(s), ${warningCount} warning(s)`);
	process.exit(1);
}

if (warningCount > 0) console.warn(`\n⚠ ${warningCount} warning(s)`);
console.log(`✓ Data integrity check passed (${products.length} products, ${homeIcons.length} home icons).`);
