import { useParams } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Gallery } from '@/components/Gallery';
import { Breadcrumb } from '@/components/Breadcrumb';
import { PageHeader } from '@/components/PageHeader';
import type { CategorySlug } from '@/data/categories';
import { products } from '@/data/products';

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

	return (
		<>
			<Helmet>
				<title>{pageTitle}</title>
			</Helmet>

			<main className="pt-20 bg-cream min-h-screen">
				<div className="mx-auto max-w-7xl px-6 py-12">
					<Breadcrumb items={[{ label }]} />

					<PageHeader eyebrow={t('home.collections.label')} title={label} />

					<Gallery products={filtered} />
				</div>
			</main>
		</>
	);
}
