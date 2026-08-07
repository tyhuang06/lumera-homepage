import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Breadcrumb } from '@/components/Breadcrumb';
import { PageHeader } from '@/components/PageHeader';
import { Gallery } from '@/components/Gallery';
import { LazyImage } from '@/components/LazyImage';
import { Seo } from '@/components/Seo';
import { products } from '@/data/products';
import { GIFT_PICK_IDS, PREMIUM_PICK_IDS } from '@/data/giftPicks';

const GIFT_IMAGES = [
	'/gallery/gift/gifting-1.webp',
	'/gallery/gift/gifting-2.webp',
	'/gallery/gift/gifting-3.webp',
];

export default function GiftingPage() {
	const { t } = useTranslation();

	const giftPicks = GIFT_PICK_IDS
		.map((id) => products.find((p) => p.id === id))
		.filter((p) => p !== undefined);

	const premiumPicks = PREMIUM_PICK_IDS
		.map((id) => products.find((p) => p.id === id))
		.filter((p) => p !== undefined);

	return (
		<>
			<Seo
				title={t('seo.gifting.title')}
				description={t('seo.gifting.description')}
				image={GIFT_IMAGES[0]}
			/>

			<main className="pt-20 bg-cream min-h-screen">
				<div className="mx-auto max-w-7xl px-6 py-12">
					<Breadcrumb items={[{ label: t('nav.gifting') }]} />

					<PageHeader
						eyebrow={t('gifting.hero.label')}
						title={t('gifting.hero.title')}
						className="mb-10"
					/>

					{/* Three images */}
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
						{GIFT_IMAGES.map((src, i) => (
							<div key={src} className="aspect-[4/3] overflow-hidden bg-cream-dark">
								<LazyImage
									src={src}
									alt={t('gifting.hero.title')}
									priority={i === 0}
									className="h-full w-full object-cover"
								/>
							</div>
						))}
					</div>

					{/* Description below images */}
					<p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground">
						{t('gifting.hero.description')}
					</p>
				</div>

				{/* ─── Gift picks (styled like the Icons page) ─── */}
				<section className="bg-white py-24 px-6">
					<div className="mx-auto max-w-7xl">
						<div className="mb-14 text-center">
							<p className="text-[0.65rem] tracking-[0.35em] uppercase mb-3 text-gold">
								{t('gifting.picks.label')}
							</p>
							<h2 className="font-cormorant text-4xl font-light tracking-wide mb-4 text-charcoal">
								{t('gifting.picks.title')}
							</h2>
							<div className="mx-auto w-10 h-px bg-gold" />
							<span className="mt-5 inline-block border border-gold/50 px-5 py-1.5 text-[0.7rem] tracking-[0.2em] uppercase text-gold">
								{t('gifting.picks.priceBadge')}
							</span>
							<p className="mt-4 text-sm max-w-md mx-auto leading-relaxed text-muted-foreground">
								{t('gifting.picks.desc')}
							</p>
						</div>

						<Gallery products={giftPicks} />

						<div className="mt-12 text-center">
							<Link
								to="/#collections"
								className="text-xs tracking-[0.2em] uppercase text-gold hover:text-gold-dark transition-colors"
							>
								{t('gifting.picks.cta')} →
							</Link>
						</div>
					</div>
				</section>

				{/* ─── Premium jewelry ─── */}
				<section className="bg-cream py-24 px-6">
					<div className="mx-auto max-w-7xl">
						<div className="mb-14 text-center">
							<p className="text-[0.65rem] tracking-[0.35em] uppercase mb-3 text-gold">
								{t('gifting.premium.label')}
							</p>
							<h2 className="font-cormorant text-4xl font-light tracking-wide mb-4 text-charcoal">
								{t('gifting.premium.title')}
							</h2>
							<div className="mx-auto w-10 h-px bg-gold" />
							<span className="mt-5 inline-block border border-gold/50 px-5 py-1.5 text-[0.7rem] tracking-[0.2em] uppercase text-gold">
								{t('gifting.premium.priceBadge')}
							</span>
							<p className="mt-4 text-sm max-w-md mx-auto leading-relaxed text-muted-foreground">
								{t('gifting.premium.desc')}
							</p>
						</div>

						<Gallery products={premiumPicks} />
					</div>
				</section>

				{/* ─── Packaging features ─── */}
				<section className="bg-white py-24 px-6">
					<div className="mx-auto max-w-5xl flex flex-col gap-20">
						<GiftFeature
							image={GIFT_IMAGES[0]}
							title={t('gifting.features.box.title')}
							text={t('gifting.features.box.text')}
							items={t('gifting.features.box.items', { returnObjects: true }) as string[]}
						/>
						<GiftFeature
							image={GIFT_IMAGES[1]}
							title={t('gifting.features.bag.title')}
							text={t('gifting.features.bag.text')}
						/>
						<GiftFeature
							image={GIFT_IMAGES[2]}
							title={t('gifting.features.box2.title')}
							text={t('gifting.features.box2.text')}
						/>
					</div>
				</section>
			</main>
		</>
	);
}

function GiftFeature({
	image,
	title,
	text,
	items,
}: {
	image: string;
	title: string;
	text: string;
	items?: string[];
}) {
	return (
		<div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-14">
			<div className="aspect-[4/3] w-full overflow-hidden bg-cream-dark md:w-1/2">
				<LazyImage src={image} alt={title} className="h-full w-full object-cover" />
			</div>

			<div className="md:w-1/2">
				<h3 className="font-cormorant text-2xl font-light text-charcoal mb-4 tracking-[0.02em]">
					{title}
				</h3>
				<p className="text-sm leading-relaxed text-muted-foreground mb-5">{text}</p>

				{items && (
					<ul className="flex flex-col gap-2.5">
						{items.map((item, i) => (
							<li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
								<span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
								{item}
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}
