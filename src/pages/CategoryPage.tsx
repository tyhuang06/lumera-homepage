import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Gallery } from '@/components/Gallery';
import { Breadcrumb } from '@/components/Breadcrumb';
import { PageHeader } from '@/components/PageHeader';
import { Seo, SITE_URL } from '@/components/Seo';
import type { CategorySlug } from '@/data/categories';
import type { ProductLine } from '@/data/products/types';
import { products } from '@/data/products';
import { sortByCollectionSequence } from '@/lib/productLines';

// Necklaces & earrings split into Signature / Forever subsections.
const LINE_CATEGORIES: CategorySlug[] = ['necklaces', 'earrings'];
const LINE_ORDER: ProductLine[] = ['signature', 'forever'];

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

	// Price headlines pair a Signature line with a Forever line separated by
	// " | " — break them onto two lines for an easier read on mobile. Rings
	// and bracelets don't have a Signature/Forever split, so theirs is just
	// a single line.
	const priceHeadline =
		slug === 'earrings'
			? t('earrings.priceHeadline')
			: slug === 'necklaces'
				? t('necklaces.priceHeadline')
				: slug === 'rings'
					? t('rings.priceHeadline')
					: slug === 'bracelets'
						? t('bracelets.priceHeadline')
						: undefined;
	const [signatureLine, foreverLine] = priceHeadline?.split(' | ') ?? [];
	const pageDescription = priceHeadline
		? t('seo.category.descriptionWithPrice', { label, priceHeadline })
		: t('seo.category.description', { label });

	const itemListJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'CollectionPage',
		name: pageTitle,
		description: pageDescription,
		url: `${SITE_URL}/collections/${slug}`,
		mainEntity: {
			'@type': 'ItemList',
			itemListElement: filtered.map((p, i) => ({
				'@type': 'ListItem',
				position: i + 1,
				url: `${SITE_URL}/products/${p.id}`,
			})),
		},
	};

	return (
		<>
			<Seo
				title={pageTitle}
				description={pageDescription}
				image={filtered[0]?.images[0]}
				jsonLd={itemListJsonLd}
			/>

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
						description={
							signatureLine ? (
								foreverLine ? (
									<>
										{signatureLine}
										<br />
										{foreverLine}
									</>
								) : (
									signatureLine
								)
							) : undefined
						}
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
