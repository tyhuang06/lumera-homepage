import type { CategorySlug } from "../categories";
import type { CollectionSlug } from "../collections";

export type ProductLine = "signature" | "forever";

export type Product = {
	id: string;
	featured: boolean;       // Show on the /icons page
	collection: CollectionSlug;
	category: CategorySlug;
	line?: ProductLine;      // Signature / Forever — used to split necklaces & earrings pages into subsections
	limited?: boolean;       // Show a "Limited" tag on the product card
	outOfStock?: boolean;    // Grey out the card, show "Out of Stock" tag, and swap the product page CTA to "Join Waitlist"
	titleKey: string;        // Key into src/i18n/[lang]/products/[category].json "products"
	descriptionKey?: string; // Key into src/i18n/[lang]/products/[category].json "descriptions" (optional)
	images: string[];
};
