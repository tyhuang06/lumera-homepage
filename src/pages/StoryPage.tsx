import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import {
	ContentHeadingBlock,
	ContentImagesBlock,
	ContentListBlock,
	type HeadingBlock,
	type ImagesBlock,
	type ListBlock,
} from '@/components/ContentBlocks';

const STORY_IMAGES = [
	'/gallery/our-story/ourstory-1.webp',
	'/gallery/our-story/ourstory-2.webp',
	'/gallery/our-story/ourstory-3.webp',
];

type StoryBlock =
	| string
	| ListBlock
	| HeadingBlock
	| ImagesBlock
	| {
			type: 'quotes';
			items: {
				text: string;
				author?: string;
			}[];
	  };

export default function StoryPage() {
	const { t } = useTranslation();

	const content = t('story.content', {
		returnObjects: true,
	}) as StoryBlock[];

	return (
		<>
			<Helmet>
				<title>{t('seo.story.title')}</title>
				<meta name="description" content={t('seo.story.description')} />
			</Helmet>

			<main className="pt-20 bg-cream min-h-screen">
				<div className="mx-auto max-w-3xl px-6 py-16">
					<h1 className="font-cormorant text-4xl font-light tracking-wide text-charcoal mb-10">
						{t('story.title')}
					</h1>

					<div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
						{content.map((block, i) => {
							if (typeof block === 'string') {
								return <p key={i}>{block}</p>;
							}

							if (block.type === 'list') {
								return <ContentListBlock key={i} block={block} />;
							}

							if (block.type === 'heading') {
								return <ContentHeadingBlock key={i} block={block} />;
							}

							if (block.type === 'images') {
								return <ContentImagesBlock key={i} block={block} images={STORY_IMAGES} />;
							}

							if (block.type === 'quotes') {
								return (
									<div key={i} className="my-12 space-y-8">
										{block.items.map((quote, qIndex) => (
											<blockquote
												key={qIndex}
												className="relative pl-6 text-sm leading-relaxed text-foreground/80"
											>
												<span className="absolute left-0 top-0 h-full w-0.5 bg-gold/40" />
												<p className="font-cormorant text-base">{quote.text}</p>
												{quote.author && (
													<footer className="mt-2 text-xs text-muted-foreground">
														— {quote.author}
													</footer>
												)}
											</blockquote>
										))}
									</div>
								);
							}

							return null;
						})}
					</div>
				</div>
			</main>
		</>
	);
}
