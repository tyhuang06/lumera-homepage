import { categories } from '@/data/categories';
import { collections } from '@/data/collections';
import { CategoryTile } from '@/components/CategoryTile';
import { CollectionTile } from '@/components/CollectionTile';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

export function Home() {
	const { t } = useTranslation();

	return (
		<>
			<Helmet>
				<title>{t('seo.home.title')}</title>
				<meta name="description" content={t('seo.home.description')} />
			</Helmet>
			<section className="mx-auto max-w-7xl px-4 py-8">
				<div className="mb-10">
					<p className="text-sm tracking-[0.2em] text-muted-foreground mb-8">
						{t('nav.collections')}
					</p>
				</div>

				<div className="columns-2 gap-8 lg:columns-4">
					{collections.map((collection) => (
						<CollectionTile
							key={collection.slug}
							collection={collection}
						/>
					))}
				</div>

				<div className="mb-10">
					<p className="text-sm tracking-[0.2em] text-muted-foreground mb-8">
						{t('nav.categories')}
					</p>
				</div>

				<div className="columns-2 gap-8 lg:columns-4">
					{categories.map((category) => (
						<CategoryTile key={category.slug} category={category} />
					))}
				</div>
			</section>
		</>
	);
}
