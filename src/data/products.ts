import type { CategorySlug } from "./categories";

export type Product = {
  id: string;
  title: string;
  category: CategorySlug;
  images: string[];
};


export const products: Product[] = [
  {
    id: "akoya-necklace",
    category:"necklaces",
    title: "Akoya Pearl Necklace",
    images: [
      "/gallery/placeholder.png",
      "/gallery/placeholder.png",
      "/gallery/placeholder.png",
    ],
  },
  {
    id: "akoya-earrings",
    category:"earrings",
    title: "Akoya Pearl Earrings",
    images: [
      "/gallery/placeholder.png",
    ],
  },
]
