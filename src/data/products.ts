import type { CategorySlug } from "./categories";

export type Product = {
  id: string;
  titleKey: string;
  category: CategorySlug;
  images: string[];
};


export const products: Product[] = [
  {
    id: "akoya-necklace",
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
    category:"earrings",
    titleKey: "products.akoya-earrings",
    images: [
      "/gallery/placeholder.png",
    ],
  },
]
