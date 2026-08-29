import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { Product } from '@/data/products';
import { LazyImage } from '@/components/LazyImage';

export function Gallery({ products }: { products: Product[] }) {
	const { t } = useTranslation();

	if (products.length === 0) {
		return (
			<p className="text-sm text-muted-foreground py-12 text-center">
				{t('ui.collectionNotFound')}
			</p>
		);
	}

	return (
		<div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
			{products.map((product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</div>
	);
}

export function ProductCard({ product }: { product: Product }) {
	const { t } = useTranslation();

	return (
		<Link
			to={`/products/${product.id}`}
			className="group block"
		>
			{/* Image */}
			<div className="relative aspect-[3/4] overflow-hidden bg-cream-dark">
				{product.outOfStock ? (
					<span className="absolute left-2 top-2 z-10 border border-charcoal/40 bg-cream/90 px-2.5 py-1 text-[0.6rem] tracking-[0.2em] uppercase text-charcoal/70">
						{t('ui.outOfStockTag')}
					</span>
				) : product.limited ? (
					<span className="absolute left-2 top-2 z-10 border border-gold/60 bg-cream/90 px-2.5 py-1 text-[0.6rem] tracking-[0.2em] uppercase text-gold">
						{t('ui.limitedTag')}
					</span>
				) : null}
				<LazyImage
					src={product.images[0]}
					alt={t(`products:${product.titleKey}`)}
					className="h-full w-full object-cover group-hover:scale-[1.04]"
				/>
				{/* Soft cream veil for out-of-stock pieces — dims without desaturating,
				    so the piece still reads as fine jewelry rather than a discount bin.
				    Lifts on hover so customers can still admire the full piece. */}
				{product.outOfStock && (
					<div className="absolute inset-0 bg-cream/55 transition-opacity duration-300 group-hover:opacity-0" />
				)}
				{/* Hover overlay */}
				<div className="absolute inset-0 flex items-end justify-center pb-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
					<span className="text-[0.65rem] tracking-[0.2em] uppercase text-white font-jost">
						{t('ui.viewPiece')} →
					</span>
				</div>
			</div>

			{/* Title */}
			<div className="mt-3 px-0.5">
				<p className="font-cormorant text-base font-light tracking-wide text-foreground leading-snug">
					{t(`products:${product.titleKey}`)}
				</p>
			</div>
		</Link>
	);
}
