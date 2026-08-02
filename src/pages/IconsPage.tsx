import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Gallery } from '@/components/Gallery';
import { Breadcrumb } from '@/components/Breadcrumb';
import { PageHeader } from '@/components/PageHeader';
import { products } from '@/data/products';

export default function IconsPage() {
	const { t } = useTranslation();

	return (
		<>
			<Helmet>
				<title>{t('seo.icons.title')}</title>
				<meta name="description" content={t('seo.icons.description')} />
			</Helmet>

			<main className="pt-20 bg-cream min-h-screen">
				<div className="mx-auto max-w-7xl px-6 py-12">
					<Breadcrumb items={[{ label: t('nav.icons') }]} />

					<PageHeader
						eyebrow={t('home.icons.label')}
						title={t('icons.title')}
						description={t('icons.desc')}
					/>

					<Gallery products={products.filter((p) => p.featured)} />
				</div>
			</main>
		</>
	);
}
