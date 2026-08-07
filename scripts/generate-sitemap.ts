// Regenerates public/sitemap.xml from the actual route table + product data,
// so it can't drift out of sync the way a hand-maintained sitemap does. Run
// via `yarn generate-sitemap`; wired into CI ahead of the build so every
// deploy ships a sitemap that matches src/App.tsx's <Routes> and
// src/data/products/*.
//
// Note: this site doesn't use locale-specific URLs (the EN/zh-Hant toggle in
// LanguageSwitcher.tsx swaps content client-side without changing the path),
// so there's nothing here to hreflang — one <url> per route covers both
// languages.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { getRoutes } from "./lib/routes.ts";

const SITE_URL = "https://lumerafinepearls.com";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const outFile = path.join(repoRoot, "public", "sitemap.xml");

const routes = getRoutes().map((r) => r.path);

const urlEntries = routes
	.map((route) => `\t<url>\n\t\t<loc>${SITE_URL}${route}</loc>\n\t</url>`)
	.join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`;

fs.writeFileSync(outFile, xml);
console.log(`✓ Wrote ${routes.length} URLs to public/sitemap.xml`);
