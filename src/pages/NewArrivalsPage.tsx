import { useTranslation } from 'react-i18next';
import { Gallery } from '@/components/Gallery';
import { Breadcrumb } from '@/components/Breadcrumb';
import { PageHeader } from '@/components/PageHeader';
import { Seo } from '@/components/Seo';
import { products } from '@/data/products';
import { NEW_ARRIVAL_IDS } from '@/data/newArrivals';

export default function NewArrivalsPage() {
	const { t } = useTranslation();

	const newArrivals = NEW_ARRIVAL_IDS
		.map((id) => products.find((p) => p.id === id))
		.filter((p) => p !== undefined);

	return (
		<>
			<Seo title={t('seo.newArrivals.title')} description={t('seo.newArrivals.description')} />

			<main className="pt-20 bg-cream min-h-screen">
				<div className="mx-auto max-w-7xl px-6 py-12">
					<Breadcrumb items={[{ label: t('nav.newArrivals') }]} />

					<PageHeader
						eyebrow={t('newArrivals.label')}
						title={t('newArrivals.title')}
						description={t('newArrivals.desc')}
					/>

					<Gallery products={newArrivals} />
				</div>
			</main>
		</>
	);
}
