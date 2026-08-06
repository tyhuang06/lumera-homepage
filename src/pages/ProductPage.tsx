import { useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import { cn } from '@/lib/utils';
import { products } from '@/data/products';
import { LazyImage } from '@/components/LazyImage';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Seo, SITE_URL } from '@/components/Seo';

export default function ProductPage() {
	const { t } = useTranslation();
	const { id } = useParams<{ id: string }>();
	const product = products.find((p) => p.id === id);
	const [activeIndex, setActiveIndex] = useState(0);
	const swiperRef = useRef<SwiperType | null>(null);

	if (!product) {
		return (
			<main className="pt-20 min-h-screen bg-cream flex items-center justify-center">
				<div className="text-center">
					<p className="text-muted-foreground mb-4">{t('ui.productNotFound')}</p>
					<Link to="/icons" className="text-sm tracking-[0.15em] uppercase text-gold hover:text-gold-dark transition-colors">
						← {t('ui.backToIcons')}
					</Link>
				</div>
			</main>
		);
	}

	const { images } = product;
	const title = t(`products:${product.titleKey}`);
	const sidenote = t(`products:sidenotes.${product.id}`, '');
	const sidenoteLines = sidenote.split('\n').filter(Boolean);
	const categoryLabel = t(`categories.${product.category}`);
	const description = product.descriptionKey
		? t(`products:descriptions.${product.descriptionKey}`)
		: t('seo.product.descriptionFallback', { title });

	// No per-item price data in the product model — omit `offers` rather than
	// guess. Once real prices are wired in, add an `offers` block here to
	// become eligible for Google's Product rich results.
	const productJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Product',
		name: title,
		description,
		image: images.map((img) => `${SITE_URL}${img}`),
		url: `${SITE_URL}/products/${product.id}`,
		category: categoryLabel,
		brand: {
			'@type': 'Brand',
			name: 'Luméra Fine Pearls',
		},
	};

	const breadcrumbJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: t('nav.home'), item: SITE_URL },
			{ '@type': 'ListItem', position: 2, name: categoryLabel, item: `${SITE_URL}/collections/${product.category}` },
			{ '@type': 'ListItem', position: 3, name: title, item: `${SITE_URL}/products/${product.id}` },
		],
	};

	return (
		<>
			<Seo
				title={`${title} | Luméra Fine Pearls`}
				description={description}
				image={images[0]}
				type="product"
				jsonLd={[productJsonLd, breadcrumbJsonLd]}
			/>

			<main className="pt-20 bg-cream min-h-screen">
				<div className="mx-auto max-w-6xl px-6 py-12">
					<Breadcrumb
						items={[
							{ label: t(`categories.${product.category}`), to: `/collections/${product.category}` },
							{ label: title },
						]}
					/>

					{/* Product layout */}
					<div className="lg:grid lg:grid-cols-2 lg:gap-16">
						{/* Left: swipeable image carousel */}
						<div>
							{/* Main swiper */}
							<div className="relative product-swiper">
								<Swiper
									slidesPerView={1}
									onSwiper={(swiper) => { swiperRef.current = swiper; }}
									onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
									className="aspect-[3/4] overflow-hidden bg-[#f0ebe3]"
								>
									{images.map((src, i) => (
										<SwiperSlide key={i} className="!h-auto">
											<LazyImage
												src={src}
												alt={`${title} ${i + 1}`}
												priority={i === 0}
												className="h-full w-full object-cover"
											/>
										</SwiperSlide>
									))}
								</Swiper>

								{/* Arrow buttons — only shown when multiple images */}
								{images.length > 1 && (
									<>
										<button
											onClick={() => swiperRef.current?.slidePrev()}
											aria-label="Previous image"
											className="absolute left-3 top-[calc(50%-2rem)] -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center bg-white/80 hover:bg-white transition-colors"
										>
											<ChevronLeft className="h-4 w-4 text-charcoal" />
										</button>
										<button
											onClick={() => swiperRef.current?.slideNext()}
											aria-label="Next image"
											className="absolute right-3 top-[calc(50%-2rem)] -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center bg-white/80 hover:bg-white transition-colors"
										>
											<ChevronRight className="h-4 w-4 text-charcoal" />
										</button>
									</>
								)}
							</div>

							{/* Thumbnail strip */}
							{images.length > 1 && (
								<div className="mt-3 flex gap-2 flex-wrap">
									{images.map((src, i) => (
										<button
											key={i}
											onClick={() => swiperRef.current?.slideTo(i)}
											className={cn(
												'h-16 w-16 overflow-hidden border-2 transition-all',
												i === activeIndex
													? 'border-gold opacity-100'
													: 'border-transparent opacity-50 hover:opacity-80',
											)}
										>
											<LazyImage
												src={src}
												alt=""
												className="h-full w-full object-cover"
											/>
										</button>
									))}
								</div>
							)}
						</div>

						{/* Right: product info */}
						<div className="mt-10 lg:mt-0">
							<h1 className="font-cormorant text-4xl font-light tracking-wide text-charcoal leading-tight">
								{title}
							</h1>

							<div className="my-5 h-px bg-gold/40 w-16" />

							{product.descriptionKey && (
								<p className="text-sm leading-relaxed text-muted-foreground max-w-md">
									{t(`products:descriptions.${product.descriptionKey}`)}
								</p>
							)}

							{sidenoteLines.length > 1 ? (
								<div className="mt-6 pt-5 border-t border-gold/20">
									<div className="grid gap-2.5 rounded-lg border border-gold/15 bg-gold/5 px-4 py-4">
										{sidenoteLines.map((line, i) => (
											<p key={i} className="text-xs text-charcoal/70 tracking-wide leading-relaxed">
												{line}
											</p>
										))}
									</div>
								</div>
							) : sidenote ? (
								<div className="mt-6 pt-5 border-t border-gold/20">
									<p className="text-xs text-muted-foreground/60 tracking-wide leading-loose">
										{sidenote}
									</p>
								</div>
							) : null}

							<a
								href="#contact"
								className="mt-10 inline-block border border-gold px-10 py-3.5 text-xs tracking-[0.25em] uppercase text-charcoal hover:bg-gold hover:text-white transition-all duration-300"
							>
								{t('ui.enquire')}
							</a>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
