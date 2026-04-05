export type CategorySlug = "rings" | "necklaces" | "earrings" | "bracelets";

export type Category = {
	slug: CategorySlug;
	cover: string;
};

// ─── How to add a new category ───────────────────────────────────────────────
// 1. Add the slug to the CategorySlug union type above
// 2. Add an entry to the categories array below
// 3. Place a cover image at public/categories/[slug].webp
// 4. Add translation keys in src/i18n/en/common.json and zh-Hant/common.json
//    under "categories": { "[slug]": "Category Name" }
// ─────────────────────────────────────────────────────────────────────────────

export const categories: Category[] = [
	{
		slug: "rings",
		cover: "/categories/placeholder.png",
	},
	{
		slug: "necklaces",
		cover: "/categories/placeholder.png",
	},
	{
		slug: "earrings",
		cover: "/categories/placeholder.png",
	},
	{
		slug: "bracelets",
		cover: "/categories/placeholder.png",
	},
];
