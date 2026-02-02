import { useParams } from 'react-router';
import { CategoryBreadcrumb } from '@/components/CategoryBreadcrumb';
import { Gallery } from '@/components/Gallery';
import type { CategorySlug } from '@/data/categories';
import { products } from '@/data/products';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

export default function CategoryPage() {
	const { t } = useTranslation();
	const { category } = useParams();
	const slug = category as CategorySlug | undefined;

	if (!slug) {
		return (
			<main className="mx-auto max-w-7xl px-4 py-8">
				<p className="text-sm text-muted-foreground">
					Collection not found.
				</p>
			</main>
		);
	}

	const categoryLabel = t(`categories.${slug}`);
	const pageTitle = `${categoryLabel} | Luméra Fine Pearls`;
	const categoryProducts = products.filter((p) => p.category === slug);

	return (
		<>
			<Helmet>
				<title>{pageTitle}</title>
				{/* description is optional for now */}
				{/* 
				<meta
					name="description"
					content={t('seo.categoryFallback')}
				/>
				*/}
			</Helmet>
			<main className="mx-auto max-w-7xl px-4 py-8">
				<section className="mb-12">
					<CategoryBreadcrumb category={slug} />

					<h1 className="mt-4 font-didot text-3xl tracking-wide">
						{categoryLabel}
					</h1>

					{/* <p className="mt-2 max-w-xl text-sm text-muted-foreground">
					Some placeholder text
				</p> */}
				</section>

				<Gallery products={categoryProducts} />
			</main>
		</>
	);
}
