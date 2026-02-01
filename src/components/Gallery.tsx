import { products } from '@/data/products';
import { ProductGallery } from './ProductGallery';

export function Gallery() {
	return (
		<section className="mx-auto max-w-6xl px-6 py-20">
			<div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
				{products.map((product) => (
					<div key={product.id} className="mb-6 break-inside-avoid">
						<ProductGallery images={product.images} />

						<p className="mt-2 text-xs text-muted-foreground">
							{product.title}
						</p>
					</div>
				))}
			</div>
		</section>
	);
}
