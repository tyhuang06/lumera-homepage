export type CategorySlug = "necklaces" | "earrings" | "bracelets";

export type Category = {
  slug: CategorySlug;
  name: string;
  cover: string;
};


export const categories: Category[] = [
  {
    slug: "necklaces",
    name: "Necklaces",
    cover: "/categories/placeholder.png",
  },
  {
    slug: "earrings",
    name: "Earrings",
    cover: "/categories/placeholder.png",
  },
  {
    slug: "bracelets",
    name: "Bracelets",
    cover: "/categories/placeholder.png",
  },
];
