import { useParams } from 'react-router';
import { CollectionBreadcrumb } from '@/components/CollectionBreadcrumb';
import { Gallery } from '@/components/Gallery';
import type { CollectionSlug } from '@/data/collections';
import { products } from '@/data/products';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

export default function CollectionPage() {
	const { t } = useTranslation();
	const { collection } = useParams();
	const slug = collection as CollectionSlug | undefined;

	if (!slug) {
		return (
			<main className="mx-auto max-w-7xl px-4 py-8">
				<p className="text-sm text-muted-foreground">
					Collection not found.
				</p>
			</main>
		);
	}

	const collectionLabel = t(`collections.${slug}`);
	const pageTitle = `${collectionLabel} | Luméra Fine Pearls`;
	const collectionProducts = products.filter((p) => p.collection === slug);

	return (
		<>
			<Helmet>
				<title>{pageTitle}</title>
				{/* description is optional for now */}
				{/* 
				<meta
					name="description"
					content={t('seo.collectionFallback')}
				/>
				*/}
			</Helmet>
			<main className="mx-auto max-w-7xl px-4 py-8">
				<section className="mb-12">
					<CollectionBreadcrumb collection={slug} />

					<h1 className="mt-4 font-didot text-3xl tracking-wide">
						{collectionLabel}
					</h1>

					{/* <p className="mt-2 max-w-xl text-sm text-muted-foreground">
					Some placeholder text
				</p> */}
				</section>

				<Gallery products={collectionProducts} />
			</main>
		</>
	);
}
