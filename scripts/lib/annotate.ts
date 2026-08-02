// Shared error/warning reporting for scripts/check-*.ts.
//
// In GitHub Actions, emits `::error file=…,line=…::message` / `::warning …`
// workflow commands, which GitHub renders as inline annotations directly on
// the PR's "Files changed" tab — so a reviewer sees exactly which file (and
// line, when known) caused the failure without opening the Actions log.
// Locally (no GITHUB_ACTIONS env var), falls back to a plain readable line.
import fs from "node:fs";

const isCI = process.env.GITHUB_ACTIONS === "true";

// GitHub workflow commands require `%`, CR, and LF to be percent-encoded in
// message text; property values (like `file=`) additionally escape `:` and `,`.
// https://docs.github.com/actions/using-workflows/workflow-commands-for-github-actions
function escapeData(s: string): string {
	return s.replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
}

function escapeProperty(s: string): string {
	return escapeData(s).replace(/:/g, "%3A").replace(/,/g, "%2C");
}

export type Location = { file: string; line?: number };

function format(level: "error" | "warning", message: string, loc?: Location): string {
	if (!isCI) {
		const where = loc ? ` (${loc.file}${loc.line ? `:${loc.line}` : ""})` : "";
		return `${message}${where}`;
	}
	const props = loc
		? [`file=${escapeProperty(loc.file)}`, ...(loc.line ? [`line=${loc.line}`] : [])].join(",")
		: "";
	return `::${level}${props ? ` ${props}` : ""}::${escapeData(message)}`;
}

export function reportError(message: string, loc?: Location): void {
	console.error(format("error", message, loc));
}

export function reportWarning(message: string, loc?: Location): void {
	console.warn(format("warning", message, loc));
}

/** 1-based line number of the first line containing `needle`, searched between
 * `afterNeedle` (exclusive) and `beforeNeedle` (exclusive) if given. */
export function findLine(
	filePath: string,
	needle: string,
	range?: { after?: string; before?: string },
): number | undefined {
	const lines = fs.readFileSync(filePath, "utf8").split("\n");
	let start = 0;
	let end = lines.length;
	if (range?.after) {
		const idx = lines.findIndex((l) => l.includes(range.after!));
		if (idx >= 0) start = idx + 1;
	}
	if (range?.before) {
		const idx = lines.findIndex((l, i) => i >= start && l.includes(range.before!));
		if (idx >= 0) end = idx;
	}
	for (let i = start; i < end; i++) {
		if (lines[i].includes(needle)) return i + 1;
	}
	return undefined;
}
