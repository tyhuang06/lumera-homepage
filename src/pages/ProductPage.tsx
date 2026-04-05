import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { products } from '@/data/products';

export default function ProductPage() {
	const { t } = useTranslation();
	const { id } = useParams<{ id: string }>();
	const product = products.find((p) => p.id === id);
	const [activeIndex, setActiveIndex] = useState(0);

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

	const prev = () =>
		setActiveIndex((i) => (i - 1 + images.length) % images.length);
	const next = () =>
		setActiveIndex((i) => (i + 1) % images.length);

	return (
		<>
			<Helmet>
				<title>{`${title} | Luméra Fine Pearls`}</title>
			</Helmet>

			<main className="pt-20 bg-cream min-h-screen">
				<div className="mx-auto max-w-6xl px-6 py-12">
					{/* Breadcrumb */}
					<nav className="mb-10 flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-muted-foreground">
						<Link to="/" className="hover:text-foreground transition-colors">
							{t('nav.home')}
						</Link>
						<span className="opacity-40">—</span>
						<Link to="/icons" className="hover:text-foreground transition-colors">
							{t('nav.icons')}
						</Link>
						<span className="opacity-40">—</span>
						<span className="text-foreground truncate max-w-[140px]">{title}</span>
					</nav>

					{/* Product layout */}
					<div className="lg:grid lg:grid-cols-2 lg:gap-16">
						{/* Left: image carousel */}
						<div>
							{/* Main image */}
							<div className="relative aspect-[3/4] overflow-hidden bg-[#f0ebe3]">
								<img
									key={activeIndex}
									src={images[activeIndex]}
									alt={title}
									className="h-full w-full object-cover"
								/>

								{images.length > 1 && (
									<>
										<button
											onClick={prev}
											aria-label="Previous image"
											className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center bg-white/80 hover:bg-white transition-colors"
										>
											<ChevronLeft className="h-4 w-4 text-charcoal" />
										</button>
										<button
											onClick={next}
											aria-label="Next image"
											className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center bg-white/80 hover:bg-white transition-colors"
										>
											<ChevronRight className="h-4 w-4 text-charcoal" />
										</button>
									</>
								)}
							</div>

							{/* Thumbnail strip */}
							{images.length > 1 && (
								<div className="mt-3 flex gap-2">
									{images.map((src, i) => (
										<button
											key={i}
											onClick={() => setActiveIndex(i)}
											className={cn(
												'h-16 w-16 overflow-hidden border-2 transition-all',
												i === activeIndex
													? 'border-gold opacity-100'
													: 'border-transparent opacity-50 hover:opacity-80',
											)}
										>
											<img
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
