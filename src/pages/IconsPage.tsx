import { useTranslation } from 'react-i18next';
import { Gallery } from '@/components/Gallery';
import { Breadcrumb } from '@/components/Breadcrumb';
import { PageHeader } from '@/components/PageHeader';
import { Seo } from '@/components/Seo';
import { products } from '@/data/products';

export default function IconsPage() {
	const { t } = useTranslation();

	return (
		<>
			<Seo title={t('seo.icons.title')} description={t('seo.icons.description')} />

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
