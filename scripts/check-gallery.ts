// Fails if a raw (unoptimized) raster image is committed under public/gallery.
// Photos should be converted to .webp via `yarn optimize-images` before
// committing — see the 671MB->57MB cleanup this guards against.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { reportError } from "./lib/annotate.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const galleryDir = path.join(repoRoot, "public", "gallery");

const RAW_EXT = new Set([".jpg", ".jpeg", ".png"]);

function walk(dir: string): string[] {
	const entries = fs.readdirSync(dir, { withFileTypes: true });
	let files: string[] = [];
	for (const entry of entries) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) files = files.concat(walk(full));
		else if (entry.isFile()) files.push(full);
	}
	return files;
}

const offenders = walk(galleryDir).filter((f) => RAW_EXT.has(path.extname(f).toLowerCase()));

for (const abs of offenders) {
	const rel = path.relative(repoRoot, abs);
	reportError(
		"Raw image committed without optimization — run `yarn optimize-images` and commit the .webp output instead.",
		{ file: rel },
	);
}

if (offenders.length > 0) {
	console.error(`\n✖ ${offenders.length} unoptimized image(s) under public/gallery`);
	process.exit(1);
}

console.log("✓ public/gallery contains only optimized .webp images.");
