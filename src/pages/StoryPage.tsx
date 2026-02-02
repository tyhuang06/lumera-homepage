import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

export default function StoryPage() {
	const { t } = useTranslation();

	return (
		<>
			<Helmet>
				<title>{t('seo.story.title')}</title>
				<meta name="description" content={t('seo.story.description')} />
			</Helmet>

			<main className="mx-auto max-w-3xl px-4 py-16">
				<h1 className="font-didot text-3xl tracking-wide">
					{t('story.title')}
				</h1>

				<div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
					<p>{t('story.p1')}</p>
					<p>{t('story.p2')}</p>
					<p>{t('story.p3')}</p>
				</div>
			</main>
		</>
	);
}
