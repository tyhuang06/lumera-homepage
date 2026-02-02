import type { Product } from '@/data/products';
import { ProductGallery } from './ProductGallery';
import { useTranslation } from 'react-i18next';

export function Gallery({ products }: { products: Product[] }) {
	const { t } = useTranslation();

	return (
		<section className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
			{products.map((product) => (
				<div key={product.id} className="mb-6 break-inside-avoid">
					<ProductGallery images={product.images} />

					<p className="mt-2 text-sm text-muted-foreground">
						{t(`products:${product.titleKey}`)}
					</p>
				</div>
			))}
		</section>
	);
}
