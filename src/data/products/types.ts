import type { CategorySlug } from "../categories";
import type { CollectionSlug } from "../collections";

export type Product = {
	id: string;
	featured: boolean;       // Show on the /icons page
	collection: CollectionSlug;
	category: CategorySlug;
	titleKey: string;        // Key into src/i18n/[lang]/products/[category].json "products"
	descriptionKey?: string; // Key into src/i18n/[lang]/products/[category].json "descriptions" (optional)
	images: string[];
};
