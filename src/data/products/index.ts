import type { Product } from "./types";
import { ringsProducts } from "./rings";
import { necklacesProducts } from "./necklaces";
import { earringsProducts } from "./earrings";
import { braceletsProducts } from "./bracelets";

export type { Product };
export { homeIcons } from "../homeIcons";

// ─── How to add a new product ────────────────────────────────────────────────
// 1. Drop your photos (any format: .jpg/.jpeg/.png straight from your phone)
//    into a new folder under public/gallery/...
// 2. Run: yarn optimize-images
//    This resizes + converts everything under public/gallery to .webp in
//    place (originals are replaced). Skip this step and photos will load
//    very slowly on the live site.
// 3. Open the file for its category — rings.ts / necklaces.ts / earrings.ts /
//    bracelets.ts — and copy an existing entry
// 4. Set a unique id (e.g. "tahitian-necklace")
// 5. Set featured: true  → shows on the /icons page
//    Set featured: false → hidden from /icons (still accessible via category pages)
// 6. Set collection to one of: "akoya" | "akoya-gray" | "tahitian" | "southsea" | "keshi" | "freshwater"
// 7. Set category to match the file you're in: "rings" | "necklaces" | "earrings" | "bracelets"
// 8. Reference the new .webp image paths in the images array below
// 9. Add the product title to src/i18n/en/products/[category].json under "products"
//    and src/i18n/zh-Hant/products/[category].json
// 10. Optionally add a description under "descriptions" in the same files
// 11. To show it on the HOME PAGE carousel, add its id to src/data/homeIcons.ts
// ─────────────────────────────────────────────────────────────────────────────

export const products: Product[] = [
	...ringsProducts,
	...necklacesProducts,
	...earringsProducts,
	...braceletsProducts,
];
