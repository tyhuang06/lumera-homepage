import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Breadcrumb } from '@/components/Breadcrumb';
import { PageHeader } from '@/components/PageHeader';

export default function MaterialsPage() {
	const { t } = useTranslation();

	const careTips = t('materials.care.tips', {
		returnObjects: true,
	}) as string[];

	return (
		<>
			<Helmet>
				<title>{t('seo.materials.title')}</title>
				<meta name="description" content={t('seo.materials.description')} />
			</Helmet>

			<main className="pt-20 bg-cream min-h-screen">
				<div className="mx-auto max-w-3xl px-6 py-16">
					<Breadcrumb items={[{ label: t('nav.materials') }]} className="mb-12" />

					<PageHeader
						eyebrow={t('materials.subtitle')}
						title={t('materials.title')}
						className="mb-16"
					/>

					{/* Sourcing */}
					<section className="mb-14">
						<h2 className="font-cormorant text-2xl font-light text-charcoal mb-4">
							{t('materials.sourcing.title')}
						</h2>
						<p className="text-sm leading-relaxed text-muted-foreground">
							{t('materials.sourcing.text')}
						</p>
					</section>

					<div className="h-px bg-border mb-14" />

					{/* 18K Gold */}
					<section className="mb-14">
						<h2 className="font-cormorant text-2xl font-light text-charcoal mb-4">
							{t('materials.gold.title')}
						</h2>
						<p className="text-sm leading-relaxed text-muted-foreground">
							{t('materials.gold.text')}
						</p>
					</section>

					<div className="h-px bg-border mb-14" />

					{/* Pearl types */}
					<section className="mb-14">
						<h2 className="font-cormorant text-2xl font-light text-charcoal mb-8">
							{t('materials.pearls.title')}
						</h2>
						<div className="flex flex-col gap-8">
							<div>
								<h3 className="text-xs tracking-[0.2em] uppercase text-gold mb-2">
									Akoya
								</h3>
								<p className="text-sm leading-relaxed text-muted-foreground">
									{t('materials.pearls.akoya')}
								</p>
							</div>
							<div>
								<h3 className="text-xs tracking-[0.2em] uppercase text-gold mb-2">
									Tahitian
								</h3>
								<p className="text-sm leading-relaxed text-muted-foreground">
									{t('materials.pearls.tahitian')}
								</p>
							</div>
							<div>
								<h3 className="text-xs tracking-[0.2em] uppercase text-gold mb-2">
									South Sea
								</h3>
								<p className="text-sm leading-relaxed text-muted-foreground">
									{t('materials.pearls.southsea')}
								</p>
							</div>
						</div>
					</section>

					<div className="h-px bg-border mb-14" />

					{/* Pearl care */}
					<section>
						<h2 className="font-cormorant text-2xl font-light text-charcoal mb-4">
							{t('materials.care.title')}
						</h2>
						<p className="text-sm leading-relaxed text-muted-foreground mb-8">
							{t('materials.care.intro')}
						</p>
						<ul className="flex flex-col gap-3">
							{careTips.map((tip, i) => (
								<li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
									<span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-gold" />
									{tip}
								</li>
							))}
						</ul>
					</section>
				</div>
			</main>
		</>
	);
}
