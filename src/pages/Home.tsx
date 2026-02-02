import { categories } from '@/data/categories';
import { CategoryTile } from '@/components/CategoryTile';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

export function Home() {
	const { t } = useTranslation();

	return (
		<>
			<Helmet>
				<title>{t('seo.homeTitle')}</title>
				<meta name="description" content={t('seo.homeDescription')} />
			</Helmet>
			<section className="mx-auto max-w-7xl px-4 py-8">
				<div className="mb-10">
					<p className="text-sm tracking-[0.2em] text-muted-foreground mb-8">
						{t('nav.collections')}
					</p>
				</div>

				<div className="columns-1 gap-8 sm:columns-2 lg:columns-3">
					{categories.map((category) => (
						<CategoryTile key={category.slug} category={category} />
					))}
				</div>
			</section>
		</>
	);
}
