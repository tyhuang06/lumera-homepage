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
    id: "akoya-earrings-hanadama",
    featured: true,
    collection: "akoya",
    category:"earrings",
    titleKey: "products.akoya-earrings-hanadama",
    descriptionKey: "akoya-earrings-hanadama",
    images: [
     "/gallery/akoya/stud/hanadama/hanadama80-1.jpg",
      "/gallery/akoya/stud/hanadama/hanadama80-2.jpg",
      "/gallery/akoya/stud/hanadama/hanadama80-3.jpg",
      "/gallery/akoya/stud/hanadama/hanadama80-4.jpg"
    ],
  },
  {
    id: "akoya-earrings-hanadama85",
    featured: true,
    collection: "akoya",
    category:"earrings",
    titleKey: "products.akoya-earrings-hanadama85",
    descriptionKey: "akoya-earrings-hanadama85",
    images: [
     "/gallery/akoya/stud/hanadama/85/hanadama85-1.jpg",
     "/gallery/akoya/stud/hanadama/85/hanadama85-2.jpg",
     "/gallery/akoya/stud/hanadama/85/hanadama85-3.jpg",
     "/gallery/akoya/stud/hanadama/85/hanadama85-4.jpg",
     "/gallery/akoya/stud/hanadama/85/hanadama85-5.jpg",
     "/gallery/akoya/stud/hanadama/85/hanadama85-6.jpg"
    ],
  },
  {
    id: "akoya-earrings-tennyo",  
    featured: true,
    collection: "akoya",
    category:"earrings",
    titleKey: "products.akoya-earrings-tennyo",
    descriptionKey: "akoya-earrings-tennyo",
    images: [
      "/gallery/akoya/stud/tennyo/tennyo1.jpg",
      "/gallery/akoya/stud/tennyo/tennyo2.jpg",
      "/gallery/akoya/stud/tennyo/tennyo3.jpg"
    ],
  },
  {
    id: "akoya-earrings-diana",
    featured: true,
    collection: "akoya",
    category:"earrings",
    titleKey: "products.akoya-earrings-diana",
    descriptionKey: "akoya-earrings-diana",
    images: [
      "/gallery/akoya/stud/diana/diana0.jpg",
      "/gallery/akoya/stud/diana/diana1.jpg",
      "/gallery/akoya/stud/diana/diana2.jpg",
      "/gallery/akoya/stud/diana/diana3.jpg",
      "/gallery/akoya/stud/diana/diana4.jpg"
    ],
  },
  {
    id: "akoya-necklace-tennyo",
    featured: false,
    collection: "akoya",
    category:"necklaces",
    titleKey: "products.akoya-necklace-tennyo",
    descriptionKey: "akoya-necklace-tennyo",
    images: [
      "/gallery/akoya/necklace/classic/classic1.jpg",
      "/gallery/akoya/necklace/classic/classic2.jpg",
      "/gallery/akoya/necklace/classic/classic3.jpg",
      "/gallery/akoya/necklace/classic/classic4.jpg"
    ],
  },
  {
    id: "akoya-necklace-diana",
    featured: false,
    collection: "akoya",
    category:"necklaces",
    titleKey: "products.akoya-necklace-diana",
    descriptionKey: "akoya-necklace-diana",
    images: [
      "/gallery/akoya/necklace/diana/diananecklace1.jpg",
      "/gallery/akoya/necklace/diana/diananecklace2.jpg",
      "/gallery/akoya/necklace/diana/diananecklace3.jpg",
      "/gallery/akoya/necklace/diana/diananecklace4.jpg"
    ],
  },
  {
    id: "akoya-necklace-diana-y",
    featured: false,
    collection: "akoya",
    category:"necklaces",
    titleKey: "products.akoya-necklace-diana-y",
    descriptionKey: "akoya-necklace-diana-y",
    images: [
      "/gallery/akoya/necklace/diana-y/dianaynecklace1.jpg",
      "/gallery/akoya/necklace/diana-y/dianaynecklace2.jpg"
    ],
  },
]
