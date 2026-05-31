import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ProductCard } from '@/components/Gallery';
import { categories } from '@/data/categories';
import { products, homeIcons } from '@/data/products';

// SVG icons matching the wireframe design
const categoryIcons: Record<string, React.ReactNode> = {
	rings: (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-7 h-7">
			<circle cx="12" cy="12" r="8" />
			<circle cx="12" cy="12" r="3" />
		</svg>
	),
	necklaces: (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-7 h-7">
			<path d="M12 2L8 8h8l-4-6z" />
			<line x1="12" y1="8" x2="12" y2="22" />
			<circle cx="12" cy="15" r="3" />
		</svg>
	),
	earrings: (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-7 h-7">
			<path d="M6 12a6 6 0 0112 0" />
			<line x1="6" y1="12" x2="6" y2="18" />
			<line x1="18" y1="12" x2="18" y2="18" />
		</svg>
	),
	bracelets: (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-7 h-7">
			<ellipse cx="12" cy="12" rx="10" ry="4" />
			<path d="M2 12v2c0 2.2 4.5 4 10 4s10-1.8 10-4v-2" />
		</svg>
	),
};

export function Home() {
	const { t } = useTranslation();

	const featuredProducts = homeIcons
		.map((id) => products.find((p) => p.id === id))
		.filter((p) => p !== undefined);

	// Scroll-reveal refs
	const iconsHeaderRef = useScrollReveal<HTMLDivElement>();
	const iconsGridRef = useScrollReveal<HTMLDivElement>();
	const collectionsHeaderRef = useScrollReveal<HTMLDivElement>();
	const collectionsGridRef = useScrollReveal<HTMLDivElement>();
	const experienceHeaderRef = useScrollReveal<HTMLDivElement>();
	const experienceGridRef = useScrollReveal<HTMLDivElement>();

	return (
		<>
			<Helmet>
				<title>{t('seo.home.title')}</title>
				<meta name="description" content={t('seo.home.description')} />
			</Helmet>

			{/* ─── Hero ─── */}
			<section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
				{/* Background gradient */}
				<div
					className="absolute inset-0"
					style={{
						background:
							'radial-gradient(ellipse at 30% 40%, #3a2f28 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, #2a2520 0%, transparent 50%), linear-gradient(165deg, #1a1714 0%, #2d261f 40%, #1f1b17 100%)',
					}}
				/>

				{/* Content */}
				<div className="relative z-10 text-center px-6">
					<p
						className="animate-hero text-gold-light text-xs tracking-[0.35em] uppercase mb-6"
						style={{ animationDelay: '200ms' }}
					>
						{t('home.hero.tagline')}
					</p>

					<h1
						className="animate-hero font-cormorant font-light text-white leading-none tracking-[0.08em]"
						style={{
							animationDelay: '500ms',
							fontSize: 'clamp(3.5rem, 10vw, 7rem)',
						}}
					>
						Luméra
					</h1>

					<p
						className="animate-hero font-cormorant italic text-gold-light mt-4"
						style={{
							animationDelay: '800ms',
							fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
						}}
					>
						{t('home.hero.subtitle')}
					</p>

					<div
						className="animate-hero mt-10"
						style={{ animationDelay: '1100ms' }}
					>
						<Link
							to="/icons"
							className="inline-block border border-gold px-10 py-3.5 text-xs tracking-[0.25em] uppercase text-white hover:bg-gold hover:text-charcoal transition-all duration-400"
						>
							{t('home.hero.cta')}
						</Link>
					</div>
				</div>

				{/* Scroll indicator */}
				<div
					className="animate-hero absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
					style={{ animationDelay: '1400ms' }}
				>
					<span className="text-[0.55rem] tracking-[0.3em] uppercase text-gold-light/60">
						Scroll
					</span>
					<div
						className="w-px bg-gradient-to-b from-transparent to-gold/50"
						style={{ height: '50px' }}
					/>
				</div>
			</section>

			{/* ─── The Luméra Icons ─── */}
			<section className="bg-white py-28 px-6">
				<div className="mx-auto max-w-7xl">
					{/* Header */}
					<div ref={iconsHeaderRef} className="reveal text-center mb-14">
						<p className="text-[0.65rem] tracking-[0.35em] uppercase text-gold mb-3">
							{t('home.icons.label')}
						</p>
						<h2 className="font-cormorant text-4xl font-light tracking-wide text-charcoal mb-4">
							{t('home.icons.title')}
						</h2>
						<div className="mx-auto w-10 h-px bg-gold mb-4" />
						<p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
							{t('home.icons.desc')}
						</p>
					</div>

					{/* Carousel */}
					{featuredProducts.length > 0 ? (
						<div ref={iconsGridRef} className="reveal -mx-6 px-6 md:mx-0 md:px-0">
							<Swiper
								spaceBetween={16}
								slidesPerView={1.5}
								breakpoints={{
									640: { slidesPerView: 2, spaceBetween: 20 },
									1024: { slidesPerView: 4, spaceBetween: 32 },
								}}
							>
								{featuredProducts.map((product) => (
									<SwiperSlide key={product.id}>
										<ProductCard product={product} />
									</SwiperSlide>
								))}
							</Swiper>
						</div>
					) : (
						<p className="text-center text-sm text-muted-foreground py-10">
							— Coming soon —
						</p>
					)}

					{/* View all link */}
					<div className="mt-12 text-center">
						<Link
							to="/icons"
							className="text-xs tracking-[0.2em] uppercase text-gold hover:text-gold-dark transition-colors"
						>
							{t('home.icons.viewAll')} →
						</Link>
					</div>
				</div>
			</section>

			{/* ─── Collections ─── */}
			<section className="bg-cream py-28 px-6">
				<div className="mx-auto max-w-7xl">
					{/* Header */}
					<div ref={collectionsHeaderRef} className="reveal text-center mb-14">
						<p className="text-[0.65rem] tracking-[0.35em] uppercase text-gold mb-3">
							{t('home.collections.label')}
						</p>
						<h2 className="font-cormorant text-4xl font-light tracking-wide text-charcoal mb-4">
							{t('home.collections.title')}
						</h2>
						<div className="mx-auto w-10 h-px bg-gold mb-4" />
						<p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
							{t('home.collections.desc')}
						</p>
					</div>

					{/* 4 category cards */}
					<div
						ref={collectionsGridRef}
						className="reveal-stagger grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6"
					>
						{categories.map((cat, index) => (
							<CategoryCard key={cat.slug} slug={cat.slug} index={index} />
						))}
					</div>
				</div>
			</section>

			{/* ─── The Luméra Experience ─── */}
			<section className="bg-charcoal py-28 px-6">
				<div className="mx-auto max-w-7xl">
					{/* Header */}
					<div ref={experienceHeaderRef} className="reveal text-center mb-14">
						<p className="text-[0.65rem] tracking-[0.35em] uppercase text-gold-light mb-3">
							{t('home.experience.label')}
						</p>
						<h2 className="font-cormorant text-4xl font-light tracking-wide text-white mb-4">
							{t('home.experience.title')}
						</h2>
						<div className="mx-auto w-10 h-px bg-gold mb-4" />
						<p className="text-sm text-white/50 max-w-md mx-auto leading-relaxed">
							{t('home.experience.desc')}
						</p>
					</div>

					{/* 3 experience cards */}
					<div
						ref={experienceGridRef}
						className="reveal-stagger grid grid-cols-1 gap-6 md:grid-cols-3"
					>
						<ExperienceCard
							title={t('home.experience.story.title')}
							text={t('home.experience.story.text')}
							cta={t('home.experience.story.cta')}
							to="/story"
							image="/experience/story.jpg"
						/>
						<ExperienceCard
							title={t('home.experience.materials.title')}
							text={t('home.experience.materials.text')}
							cta={t('home.experience.materials.cta')}
							to="/materials"
							image="/experience/materials.jpg"
						/>
						<ExperienceCard
							title={t('home.experience.visit.title')}
							text={t('home.experience.visit.text')}
							cta={t('home.experience.visit.cta')}
							href="#contact"
							image="/experience/visit.jpg"
						/>
					</div>
				</div>
			</section>
		</>
	);
}

// ─── Category card ────────────────────────────────────────────────────────────
const categoryGradients = [
	'linear-gradient(145deg, #2c2420, #4a3c32)',
	'linear-gradient(145deg, #1e2a2a, #344040)',
	'linear-gradient(145deg, #2a2535, #3d3548)',
	'linear-gradient(145deg, #2c2828, #403838)',
];

function CategoryCard({ slug, index }: { slug: string; index: number }) {
	const { t } = useTranslation();
	const count = products.filter((p) => p.category === slug).length;

	return (
		<Link to={`/collections/${slug}`} className="group block">
			<div
				className="relative aspect-square overflow-hidden"
				style={{ background: categoryGradients[index % categoryGradients.length] }}
			>
				{/* Background zoom on hover */}
				<div className="absolute inset-0 bg-inherit transition-transform duration-700 group-hover:scale-[1.05]" />

				{/* Content */}
				<div className="absolute inset-0 flex flex-col justify-end p-7">
					<span className="text-gold-light/80 mb-3">
						{categoryIcons[slug]}
					</span>
					<p className="font-cormorant text-2xl font-light text-white tracking-[0.04em] mb-1">
						{t(`categories.${slug}`)}
					</p>
					<p className="text-[0.65rem] tracking-[0.15em] uppercase text-white/40">
						{count > 0 ? `${count} ${t('ui.pieces')}` : t('ui.viewAll')}
					</p>
				</div>
			</div>
		</Link>
	);
}

// ─── Experience card ──────────────────────────────────────────────────────────
function ExperienceCard({
	title,
	text,
	cta,
	to,
	href,
	image,
}: {
	title: string;
	text: string;
	cta: string;
	to?: string;
	href?: string;
	image?: string;
}) {
	const className =
		'border border-white/8 p-8 transition-colors duration-400 hover:border-gold/25 group';

	const inner = (
		<>
			<div className="w-full aspect-[4/3] mb-7 overflow-hidden">
				{image ? (
					<img
						src={image}
						alt={title}
						className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
					/>
				) : (
					<div className="w-full h-full bg-white/3 flex items-center justify-center">
						<div className="w-8 h-px bg-gold/30" />
					</div>
				)}
			</div>

			<h3 className="font-cormorant text-2xl font-light text-white mb-3 tracking-[0.03em]">
				{title}
			</h3>
			<p className="text-sm text-white/45 leading-relaxed mb-6">{text}</p>
			<span className="text-xs tracking-[0.2em] uppercase text-gold group-hover:tracking-[0.25em] transition-all duration-300">
				{cta} →
			</span>
		</>
	);

	if (to) {
		return (
			<Link to={to} className={className}>
				{inner}
			</Link>
		);
	}
	return (
		<a href={href} className={className}>
			{inner}
		</a>
	);
}
