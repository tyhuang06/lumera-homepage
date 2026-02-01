import {
	IconMail,
	IconBrandInstagram,
	IconBrandWechat,
	IconBook2,
} from '@tabler/icons-react';

export function Footer() {
	const iconClass = 'h-4 w-4 text-muted-foreground';

	return (
		<footer className="border-t bg-white">
			<div className="mx-auto max-w-6xl px-6 py-20">
				{/* Brand */}
				<div className="mb-10 text-center">
					<h3 className="text-lg font-semibold tracking-wide">
						Lumera Fine Pearls
					</h3>
					<p className="mt-2 text-sm text-muted-foreground">
						Some placeholder text
					</p>
				</div>

				{/* Contact + socials */}
				<div className="flex flex-col gap-3 text-sm text-muted-foreground">
					<div className="flex items-start gap-2.5">
						<IconBrandWechat className={`${iconClass} mt-0.5`} />
						<span>WeChat: dollyzsca24</span>
					</div>

					<FooterLink
						href="https://www.xiaohongshu.com/user/profile/xxxx"
						icon={<IconBook2 className={iconClass} />}
						label="小红书: dollyzsca24"
					/>

					<FooterLink
						href="mailto:hello@lumerafinepearls.com"
						icon={<IconMail className={iconClass} />}
						label="hello@lumerafinepearls.com"
					/>

					{/* <FooterLink
						href="https://instagram.com/yourhandle"
						icon={<IconBrandInstagram className={iconClass} />}
						label="Instagram"
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
