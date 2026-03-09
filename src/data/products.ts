import type { CategorySlug } from "./categories";
import type { CollectionSlug } from "./collections";

export type Product = {
  id: string;
  titleKey: string;
  collection: CollectionSlug,
  category: CategorySlug;
  images: string[];
};

// For images to add, use .webp format and use squoosh to convert properly
export const products: Product[] = [
  {
    id: "akoya-necklace",
    collection: "akoya",
    category:"necklaces",
    titleKey: "products.akoya-necklace",
    images: [
      "/gallery/placeholder.png",
      "/gallery/placeholder.png",
      "/gallery/placeholder.png",
    ],
  },
  {
    id: "akoya-earrings",
    collection: "akoya",
    category:"earrings",
    titleKey: "products.akoya-earrings",
    images: [
      "/gallery/placeholder.png",
    ],
  },
]
