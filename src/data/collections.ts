export type CollectionSlug = "akoya" | "akoya-gray" | "tahitian" | "southsea" | "keshi" | "freshwater";

export type Collection = {
    slug: CollectionSlug,
    cover: string,
}

export const collections: Collection[] = [
    {
        slug: "akoya",
        cover: "/collections/placeholder.png",
    },
    {
        slug: "akoya-gray",
        cover: "/collections/placeholder.png",
    },
    {
        slug: "tahitian",
        cover: "/collections/placeholder.png",
    },
    {
        slug: "southsea",
        cover: "/collections/placeholder.png",
    },
    {
        slug: "keshi",
        cover: "/collections/placeholder.png",
    },
    {
        slug: "freshwater",
        cover: "/collections/placeholder.png",
    },

]