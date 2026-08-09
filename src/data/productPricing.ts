import type { CategorySlug } from "./categories";
import type { ProductLine } from "./products/types";

// Structured, numeric counterpart to the price copy shown on category pages
// (the "priceHeadline" strings in src/i18n/*/common.json). Each piece is
// natural/handmade and varies slightly, so we intentionally publish a price
// *range* rather than claim an exact per-item price. Used to populate
// Product JSON-LD (schema.org AggregateOffer) so product pages satisfy
// Google's requirement that Product structured data include offers, review,
// or aggregateRating. Keep these numbers in sync with the i18n copy.
export type PriceRange = {
	low: number;
	high?: number;
	currency: "USD";
};

const CATEGORY_PRICE_RANGES: Record<CategorySlug, PriceRange> = {
	rings: { low: 249, high: 1299, currency: "USD" },
	bracelets: { low: 399, high: 3280, currency: "USD" },
	// Signature tier default; the "forever" line overrides this below.
	earrings: { low: 199, high: 888, currency: "USD" },
	necklaces: { low: 269, high: 1099, currency: "USD" },
};

// "Forever" line pieces only advertise a starting price ("from $X"), so
// these have no upper bound.
const LINE_PRICE_RANGES: Partial<Record<string, PriceRange>> = {
	"earrings:forever": { low: 1990, currency: "USD" },
	"necklaces:forever": { low: 1499, currency: "USD" },
};

export function getPriceRange(category: CategorySlug, line?: ProductLine): PriceRange {
	if (line) {
		const lineRange = LINE_PRICE_RANGES[`${category}:${line}`];
		if (lineRange) return lineRange;
	}
	return CATEGORY_PRICE_RANGES[category];
}
