export type CategorySlug = "necklaces" | "earrings" | "bracelets";

export type Category = {
  slug: CategorySlug;
  cover: string;
};


export const categories: Category[] = [
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
