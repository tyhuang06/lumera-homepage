import type { CategorySlug } from "./categories";
import type { CollectionSlug } from "./collections";

export type Product = {
	id: string;
	featured: boolean;       // Show in home page "Icons" section (max 4 shown)
	collection: CollectionSlug;
	category: CategorySlug;
	titleKey: string;        // Key into src/i18n/[lang]/products.json "products"
	descriptionKey?: string; // Key into src/i18n/[lang]/products.json "descriptions" (optional)
	images: string[];
};

// ─── How to add a new product ────────────────────────────────────────────────
// 1. Copy an existing entry below and fill in the details
// 2. Set a unique id (e.g. "tahitian-necklace")
// 3. Set featured: true to show it on the home page icons section (keep ≤ 4)
// 4. Set collection to one of: "akoya" | "akoya-gray" | "tahitian" | "southsea"
// 5. Set category to one of: "rings" | "necklaces" | "earrings" | "bracelets"
// 6. Add product images as .webp files to public/products/[id]/
//    e.g. /products/tahitian-necklace/1.webp
//    Use squoosh.app to convert photos to .webp for smaller file sizes
// 7. Add the product title to src/i18n/en/products.json under "products"
//    and src/i18n/zh-Hant/products.json
// 8. Optionally add a description under "descriptions" in the same files
// ─────────────────────────────────────────────────────────────────────────────

export const products: Product[] = [
	{
		id: "akoya-necklace",
		featured: true,
		collection: "akoya",
		category: "necklaces",
		titleKey: "products.akoya-necklace",
		descriptionKey: "akoya-necklace",
		images: [
			"/gallery/placeholder.png",
			"/gallery/placeholder.png",
			"/gallery/placeholder.png",
		],
	},
	{
		id: "akoya-earrings",
		featured: false,
		collection: "akoya",
		category: "earrings",
		titleKey: "products.akoya-earrings",
		images: [
			"/gallery/placeholder.png",
		],
	},
];
