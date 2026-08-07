// Single source of truth for the site's real, concrete URLs — matching
// src/App.tsx's <Routes>, src/data/categories.ts, and src/data/products/*.
// Shared by generate-sitemap.ts and prerender.ts so they can't drift apart
// from each other or from the actual route table.
import { products, type Product } from "../../src/data/products/index.ts";
import { categories, type Category } from "../../src/data/categories.ts";

export type Route =
	| { kind: "static"; path: string }
	| { kind: "category"; path: string; category: Category }
	| { kind: "product"; path: string; product: Product };

export function getRoutes(): Route[] {
	const staticRoutes: Route[] = [
		{ kind: "static", path: "/" },
		{ kind: "static", path: "/icons" },
		{ kind: "static", path: "/gifting" },
		{ kind: "static", path: "/story" },
		{ kind: "static", path: "/materials" },
		{ kind: "static", path: "/faq" },
	];

	const categoryRoutes: Route[] = categories.map((category) => ({
		kind: "category",
		path: `/collections/${category.slug}`,
		category,
	}));

	const productRoutes: Route[] = products.map((product) => ({
		kind: "product",
		path: `/products/${product.id}`,
		product,
	}));

	return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
