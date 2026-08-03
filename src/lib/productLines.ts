import type { Product } from "@/data/products";
import type { CollectionSlug } from "@/data/collections";

const SEQUENCE: CollectionSlug[] = ["akoya", "southsea", "tahitian", "keshi"];
const CHUNK_SIZE: Partial<Record<CollectionSlug, number>> = {
	akoya: 4,
	southsea: 4,
};

/**
 * Orders products 4 akoya, 4 south sea, then all tahitian ("Eclipse") and all
 * keshi ("Nature") pieces, repeating the akoya/south sea chunks for any pieces
 * left over once the first pass runs out.
 */
export function sortByCollectionSequence(products: Product[]): Product[] {
	const buckets = new Map<CollectionSlug, Product[]>(
		SEQUENCE.map((collection) => [collection, products.filter((p) => p.collection === collection)]),
	);
	const leftover = products.filter((p) => !SEQUENCE.includes(p.collection));

	const result: Product[] = [];
	let tookSomething = true;
	while (tookSomething) {
		tookSomething = false;
		for (const collection of SEQUENCE) {
			const bucket = buckets.get(collection)!;
			if (bucket.length === 0) continue;
			const size = CHUNK_SIZE[collection] ?? bucket.length;
			result.push(...bucket.splice(0, size));
			tookSomething = true;
		}
	}

	return [...result, ...leftover];
}
