import {
	IconBrandWechat,
	IconBook2,
	IconBrandInstagram,
} from '@tabler/icons-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function Footer() {
	const { t } = useTranslation();
	const [showWechat, setShowWechat] = useState(false);

	return (
		<footer id="contact" className="bg-[#111111]">
			<div className="mx-auto max-w-7xl px-6 py-20">
				{/* Top: brand + columns */}
				<div className="flex flex-col gap-12 md:flex-row md:justify-between md:gap-8">
					{/* Brand */}
					<div className="flex-1 min-w-[200px]">
						<p className="font-cormorant text-xl tracking-[0.12em] uppercase text-white mb-3">
							Luméra
						</p>
						<p className="text-sm leading-relaxed text-white/35 max-w-[260px]">
							{t('footer.brandStatement')}
						</p>
					</div>

					{/* Explore column */}
					<div className="min-w-[130px]">
						<h4 className="text-[0.65rem] tracking-[0.25em] uppercase text-gold mb-5 font-normal">
							{t('footer.explore')}
						</h4>
						<div className="flex flex-col gap-3">
							<FooterLink to="/icons">{t('nav.icons')}</FooterLink>
							<FooterLink to="/collections/rings">{t('categories.rings')}</FooterLink>
							<FooterLink to="/collections/necklaces">{t('categories.necklaces')}</FooterLink>
							<FooterLink to="/collections/earrings">{t('categories.earrings')}</FooterLink>
							<FooterLink to="/collections/bracelets">{t('categories.bracelets')}</FooterLink>
						</div>
					</div>

					{/* About column */}
					<div className="min-w-[130px]">
						<h4 className="text-[0.65rem] tracking-[0.25em] uppercase text-gold mb-5 font-normal">
							{t('footer.about')}
						</h4>
						<div className="flex flex-col gap-3">
							<FooterLink to="/story">{t('nav.ourStory')}</FooterLink>
							<FooterLink to="/materials">{t('nav.materials')}</FooterLink>
							<FooterLink to="/faq">{t('nav.faq')}</FooterLink>
						</div>
					</div>

					{/* Contact column */}
					<div className="min-w-[130px]">
						<h4 className="text-[0.65rem] tracking-[0.25em] uppercase text-gold mb-5 font-normal">
							{t('footer.contact')}
						</h4>
						<div className="flex flex-col gap-3">
							<button
								onClick={() => setShowWechat(true)}
								className="flex items-center gap-2.5 text-sm text-white/45 hover:text-white transition-colors text-left"
							>
								<IconBrandWechat className="h-4 w-4 shrink-0" />
								<span>{t('footer.wechatLabel')}: dollyzsca24</span>
							</button>

							<a
								href="https://www.xiaohongshu.com/user/profile/65720f9b000000001902f3f6"
								target="_blank"
								rel="noreferrer"
								className="flex items-center gap-2.5 text-sm text-white/45 hover:text-white transition-colors"
							>
								<IconBook2 className="h-4 w-4 shrink-0" />
								<span>{t('footer.rednoteLabel')}: dollyzsca24</span>
							</a>

							<a
								href="https://instagram.com/lumera_pearls"
								target="_blank"
								rel="noreferrer"
								className="flex items-center gap-2.5 text-sm text-white/45 hover:text-white transition-colors"
							>
								<IconBrandInstagram className="h-4 w-4 shrink-0" />
								<span>Instagram: lumera_pearls</span>
							</a>
						</div>
					</div>
				</div>

				{/* Divider */}
				<div className="my-12 h-px bg-white/[0.06]" />

				{/* Bottom bar */}
				<div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
					<span className="text-xs text-white/25 tracking-[0.05em]">
						© {new Date().getFullYear()} Luméra Fine Pearls. All rights reserved.
					</span>
					<span className="text-xs text-white/25 tracking-[0.05em]">
						Seattle, Washington
					</span>
				</div>
			</div>

			{/* WeChat QR modal */}
			{showWechat && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
					onClick={() => setShowWechat(false)}
				>
					<div
						className="rounded-lg bg-white p-6 text-center mx-4"
						onClick={(e) => e.stopPropagation()}
					>
						<img
							src="/wechat-qr.png"
							alt="WeChat QR code"
							className="mx-auto h-48 w-48"
						/>
						<p className="mt-4 text-sm text-muted-foreground">
							{t('footer.wechatHint')}
						</p>
						<button
							onClick={() => setShowWechat(false)}
							className="mt-4 text-sm underline text-muted-foreground hover:text-foreground transition-colors"
						>
							{t('footer.close')}
						</button>
					</div>
				</div>
			)}
		</footer>
	);
}

function FooterLink({
	to,
	children,
}: {
	to: string;
	children: React.ReactNode;
}) {
	return (
		<Link
			to={to}
			className="text-sm text-white/45 hover:text-white transition-colors"
		>
			{children}
		</Link>
	);
}
