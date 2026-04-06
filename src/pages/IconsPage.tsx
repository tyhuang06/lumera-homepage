import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Gallery } from '@/components/Gallery';
import { products } from '@/data/products';

export default function IconsPage() {
	const { t } = useTranslation();

	return (
		<>
			<Helmet>
				<title>{t('seo.icons.title')}</title>
				<meta name="description" content={t('seo.icons.description')} />
			</Helmet>

			<main className="pt-20 bg-cream min-h-screen">
				<div className="mx-auto max-w-7xl px-6 py-12">
					{/* Breadcrumb */}
					<nav className="mb-10 flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-muted-foreground">
						<Link to="/" className="hover:text-foreground transition-colors">
							{t('nav.home')}
						</Link>
						<span className="opacity-40">—</span>
						<span className="text-foreground">{t('nav.icons')}</span>
					</nav>

					{/* Header */}
					<div className="mb-14 text-center">
						<p className="text-[0.65rem] tracking-[0.35em] uppercase text-gold mb-3">
							{t('home.icons.label')}
						</p>
						<h1 className="font-cormorant text-4xl font-light tracking-wide text-charcoal mb-4">
							{t('icons.title')}
						</h1>
						<div className="mx-auto w-10 h-px bg-gold" />
						<p className="mt-4 text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
							{t('icons.desc')}
						</p>
					</div>

					<Gallery products={products.filter((p) => p.featured)} />
				</div>
			</main>
		</>
	);
}
