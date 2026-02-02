import {
	IconBrandWechat,
	IconBook2,
	IconBrandInstagram,
} from '@tabler/icons-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export function Footer() {
	const { t } = useTranslation();
	const iconClass = 'h-4 w-4 text-muted-foreground';
	const [showWechat, setShowWechat] = useState(false);

	return (
		<footer id="contact" className="border-t bg-white">
			<div className="mx-auto max-w-6xl px-6 py-20">
				{/* Brand */}
				<div className="mb-10 text-center">
					<h3 className="text-lg font-didot font-semibold tracking-wide">
						Luméra Fine Pearls
					</h3>
					<p className="mt-2 text-sm text-muted-foreground">
						{t('footer.tagline')}
					</p>
				</div>

				{/* Contact + socials */}
				<div className="flex flex-col gap-3 text-sm text-muted-foreground">
					<button
						onClick={() => setShowWechat(true)}
						className="flex items-start gap-2.5 text-sm text-muted-foreground hover:text-foreground transition"
					>
						<IconBrandWechat className={`${iconClass} mt-0.5`} />
						<span>{t('footer.wechatLabel')}: dollyzsca24</span>
					</button>

					{showWechat && (
						<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
							<div className="rounded-lg bg-white p-6 text-center">
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
									className="mt-4 text-sm underline"
								>
									{t('footer.close')}
								</button>
							</div>
						</div>
					)}

					{/* <div className="flex items-start gap-2.5">
						<IconBrandWechat className={`${iconClass} mt-0.5`} />
						<span>WeChat: dollyzsca24</span>
					</div> */}

					<FooterLink
						href="https://www.xiaohongshu.com/user/profile/65720f9b000000001902f3f6"
						icon={<IconBook2 className={iconClass} />}
						label={`${t('footer.rednoteLabel')}: dollyzsca24`}
					/>

					<FooterLink
						href="https://instagram.com/lumera_pearls"
						icon={<IconBrandInstagram className={iconClass} />}
						label="Instagram: lumera_pearls"
					/>

					{/* <FooterLink
						href="mailto:hello@lumerafinepearls.com"
						icon={<IconMail className={iconClass} />}
						label="hello@lumerafinepearls.com"
					/> */}
				</div>

				{/* Divider */}
				<div className="my-12 h-px bg-gray-100" />

				{/* Copyright */}
				<p className="text-center text-xs text-muted-foreground">
					© {new Date().getFullYear()} Lumera Fine Pearls
				</p>
			</div>
		</footer>
	);
}

function FooterLink({
	href,
	icon,
	label,
}: {
	href: string;
	icon: React.ReactNode;
	label: string;
}) {
	return (
		<a
			href={href}
			target="_blank"
			rel="noreferrer"
			className="flex items-start gap-2.5 hover:text-foreground transition"
		>
			<span className="mt-0.5">{icon}</span>
			<span>{label}</span>
		</a>
	);
}
