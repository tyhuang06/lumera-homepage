import { useParams } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Gallery } from '@/components/Gallery';
import { Breadcrumb } from '@/components/Breadcrumb';
import { PageHeader } from '@/components/PageHeader';
import type { CategorySlug } from '@/data/categories';
import type { ProductLine } from '@/data/products/types';
import { products } from '@/data/products';
import { sortByCollectionSequence } from '@/lib/productLines';

// Necklaces & earrings split into Signature / Forever / Movement subsections.
const LINE_CATEGORIES: CategorySlug[] = ['necklaces', 'earrings'];
const LINE_ORDER: ProductLine[] = ['signature', 'forever', 'movement'];

export default function CategoryPage() {
	const { t } = useTranslation();
	const { type } = useParams<{ type: string }>();
	const slug = type as CategorySlug | undefined;

	if (!slug) {
		return (
			<main className="pt-20 min-h-screen bg-cream flex items-center justify-center">
				<p className="text-sm text-muted-foreground">
					{t('ui.collectionNotFound')}
				</p>
			</main>
		);
	}

	const label = t(`categories.${slug}`);
	const pageTitle = `${label} | Luméra Fine Pearls`;
	const filtered = products.filter((p) => p.category === slug);
	const useLineSections = LINE_CATEGORIES.includes(slug);

	return (
		<>
			<Helmet>
				<title>{pageTitle}</title>
			</Helmet>

			<main className="pt-20 bg-cream min-h-screen">
				<div className="mx-auto max-w-7xl px-6 py-12">
					<Breadcrumb
						items={[
							{ label: t('nav.collections'), to: '/#collections' },
							{ label },
						]}
					/>

					<PageHeader
						eyebrow={t('home.collections.label')}
						title={label}
						className={useLineSections ? 'mb-20' : undefined}
					/>

					{useLineSections ? (
						<div className="flex flex-col gap-24">
							{LINE_ORDER.map((line) => {
								const lineFiltered = filtered.filter((p) => p.line === line);
								// Necklace Forever is a small, curated set — keep its authored order
								// instead of the collection-chunking used for larger line sections.
								const lineProducts =
									slug === 'necklaces' && line === 'forever'
										? lineFiltered
										: sortByCollectionSequence(lineFiltered);
								if (lineProducts.length === 0) return null;

								return (
									<section key={line}>
										<div className="mb-10 text-center">
											<h2 className="font-cormorant text-3xl font-light tracking-wide text-charcoal mb-3">
												{t(`lines.${line}.title`)}
											</h2>
											<div className="mx-auto w-10 h-px bg-gold mb-5" />
											<span className="inline-block border border-gold/50 px-5 py-1.5 text-[0.7rem] tracking-[0.2em] uppercase text-gold">
												{t(`lines.${line}.desc`)}
											</span>
										</div>

										<Gallery products={lineProducts} />
									</section>
								);
							})}
						</div>
					) : (
						<Gallery products={filtered} />
					)}
				</div>
			</main>
		</>
	);
}
