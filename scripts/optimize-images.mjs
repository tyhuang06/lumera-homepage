// One-off / repeatable batch image optimizer.
// Resizes + converts every raster image under a target directory to WebP,
// writes a manifest of old->new public paths, and prints a size summary.
//
// Usage:
//   node scripts/optimize-images.mjs [targetDir] [--max=1600] [--quality=82] [--dry-run]
//
// Defaults to public/gallery. Paths in the manifest are site-root-relative
// (e.g. "/gallery/ring/keshi/keshi-1.jpeg" -> "/gallery/ring/keshi/keshi-1.webp"),
// matching the string literals used in src/data/products.ts.

import sharp from "sharp";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const publicDir = path.join(repoRoot, "public");

const args = process.argv.slice(2);
const positional = args.filter((a) => !a.startsWith("--"));
const targetDir = path.resolve(repoRoot, positional[0] || "public/gallery");
const maxDim = Number(args.find((a) => a.startsWith("--max="))?.split("=")[1] || 1600);
const quality = Number(args.find((a) => a.startsWith("--quality="))?.split("=")[1] || 82);
const dryRun = args.includes("--dry-run");

const RASTER_EXT = new Set([".jpg", ".jpeg", ".png"]);

async function walk(dir) {
	const entries = await fs.readdir(dir, { withFileTypes: true });
	let files = [];
	for (const entry of entries) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			files = files.concat(await walk(full));
		} else if (entry.isFile()) {
			files.push(full);
		}
	}
	return files;
}

function toPublicPath(absPath) {
	return "/" + path.relative(publicDir, absPath).split(path.sep).join("/");
}

async function main() {
	const allFiles = await walk(targetDir);
	const targets = allFiles.filter((f) => RASTER_EXT.has(path.extname(f).toLowerCase()));

	console.log(`Found ${targets.length} raster images under ${path.relative(repoRoot, targetDir)}`);
	console.log(`Settings: max dimension ${maxDim}px, WebP quality ${quality}${dryRun ? " (dry run)" : ""}\n`);

	let totalBefore = 0;
	let totalAfter = 0;
	const manifest = [];
	let skipped = 0;

	for (const file of targets) {
		const before = (await fs.stat(file)).size;
		totalBefore += before;

		const dir = path.dirname(file);
		const base = path.basename(file, path.extname(file));
		const outFile = path.join(dir, `${base}.webp`);
		const isRename = outFile !== file;

		if (dryRun) {
			// Estimate only: skip actual encode for speed in dry-run mode.
			continue;
		}

		try {
			const buffer = await sharp(file)
				.rotate() // auto-orient from EXIF, then strip EXIF on output
				.resize({ width: maxDim, height: maxDim, fit: "inside", withoutEnlargement: true })
				.webp({ quality })
				.toBuffer();

			// Skip if somehow the new file is bigger (rare, e.g. already-tiny images).
			if (buffer.length >= before && path.extname(file).toLowerCase() === ".webp") {
				skipped++;
				totalAfter += before;
				continue;
			}

			await fs.writeFile(outFile, buffer);
			if (isRename) await fs.unlink(file);

			totalAfter += buffer.length;
			if (isRename) {
				manifest.push({ from: toPublicPath(file), to: toPublicPath(outFile) });
			}
		} catch (err) {
			console.error(`FAILED: ${path.relative(repoRoot, file)} — ${err.message}`);
		}
	}

	if (!dryRun) {
		const manifestPath = path.join(repoRoot, "scripts", "image-rename-manifest.json");
		await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
		console.log(`Wrote ${manifest.length} renamed paths to ${path.relative(repoRoot, manifestPath)}`);
	}

	const fmtMB = (bytes) => (bytes / 1024 / 1024).toFixed(1);
	console.log(`\nTotal: ${fmtMB(totalBefore)}MB -> ${fmtMB(totalAfter)}MB (${skipped} skipped, already optimal)`);
	if (totalBefore > 0) {
		console.log(`Reduction: ${(100 - (totalAfter / totalBefore) * 100).toFixed(1)}%`);
	}
}

main();
