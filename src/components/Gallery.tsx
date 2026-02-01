import type { Product } from '@/data/products';
import { ProductGallery } from './ProductGallery';

export function Gallery({ products }: { products: Product[] }) {
	return (
		<section className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
			{products.map((product) => (
				<div key={product.id} className="mb-6 break-inside-avoid">
					<ProductGallery images={product.images} />

					<p className="mt-2 text-xs text-muted-foreground">
						{product.title}
					</p>
				</div>
			))}
		</section>
	);
}
