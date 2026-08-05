import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger,
} from '@/components/ui/sheet';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from './ui/accordion';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from './ui/navigation-menu';
import { LanguageSwitcher } from './LanguageSwitcher';

const COLLECTIONS = [
	{ slug: 'rings' },
	{ slug: 'necklaces' },
	{ slug: 'earrings' },
	{ slug: 'bracelets' },
] as const;

export function Navbar() {
	const { t } = useTranslation();
	const { pathname } = useLocation();
	const isHome = pathname === '/';
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		if (!isHome) {
			setScrolled(false);
			return;
		}
		const handler = () => setScrolled(window.scrollY > 80);
		window.addEventListener('scroll', handler, { passive: true });
		handler();
		return () => window.removeEventListener('scroll', handler);
	}, [isHome]);

	const solid = !isHome || scrolled;

	return (
		<header
			className={cn(
				'fixed top-0 z-50 w-full transition-colors duration-300',
				solid
					? 'bg-[#2d261f]/95 backdrop-blur-md'
					: 'bg-transparent',
			)}
		>
			<div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
				{/* Left nav group */}
				<div className="hidden md:flex items-center gap-1">
					<NavLink to="/">{t('nav.home')}</NavLink>
					<NavLink to="/icons">{t('nav.icons')}</NavLink>

					{/* Collections dropdown */}
					<NavigationMenu viewport={false}>
						<NavigationMenuList>
							<NavigationMenuItem>
								<NavigationMenuTrigger
									className={cn(
										'bg-transparent text-white/80 hover:text-white hover:bg-white/10',
										'focus:bg-white/10 focus:text-white',
										'text-xs font-normal tracking-[0.15em] uppercase h-auto px-3 py-1',
										'data-[state=open]:bg-white/10 data-[state=open]:text-white',
										'data-[state=open]:hover:bg-white/10 data-[state=open]:focus:bg-white/10',
									)}
								>
									{t('nav.collections')}
								</NavigationMenuTrigger>
								<NavigationMenuContent className="p-1">
									<ul className="min-w-36 flex flex-col gap-0.5">
										{COLLECTIONS.map(({ slug }) => (
											<li key={slug}>
												<NavigationMenuLink asChild>
													<Link
														to={`/collections/${slug}`}
														className="block rounded-sm px-2 py-1.5 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
													>
														{t(`categories.${slug}`)}
													</Link>
												</NavigationMenuLink>
											</li>
										))}
									</ul>
								</NavigationMenuContent>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
				</div>

				{/* Centered logo */}
				<Link
					to="/"
					className="absolute left-1/2 -translate-x-1/2 font-cormorant text-xl tracking-[0.15em] uppercase text-white select-none"
				>
					Luméra
				</Link>

				{/* Right nav group */}
				<div className="hidden md:flex items-center gap-1">
					<NavLink to="/gifting">{t('nav.gifting')}</NavLink>
					<NavLink to="/story">{t('nav.ourStory')}</NavLink>
					<NavLink to="/materials">{t('nav.materials')}</NavLink>
					<NavLink to="/faq">{t('nav.faq')}</NavLink>
					<a
						href="#contact"
						className="px-3 py-1 text-xs font-normal tracking-[0.15em] uppercase text-white/80 hover:text-white transition-colors"
					>
						{t('nav.contact')}
					</a>
					<div className="ml-1 text-white/80 hover:text-white transition-colors">
						<LanguageSwitcher />
					</div>
				</div>

				{/* Mobile right: language + hamburger */}
				<div className="flex items-center gap-1 md:hidden ml-auto">
					<div className="text-white/80 hover:text-white transition-colors">
						<LanguageSwitcher />
					</div>

					<Sheet>
						<SheetTrigger asChild>
							<Button
								variant="ghost"
								size="icon-lg"
								className="rounded-full text-white/80 hover:text-white hover:bg-white/10"
							>
								<Menu className="h-5 w-5" />
							</Button>
						</SheetTrigger>

						<SheetContent
							side="right"
							className="w-[75%] sm:w-[320px] bg-charcoal border-l border-white/10 px-6 pb-10"
						>
							{/* Close button */}
							<SheetClose asChild>
								<Button
									variant="ghost"
									size="icon-lg"
									className="absolute right-4 top-4 rounded-full text-white/60 hover:text-white hover:bg-white/10"
								>
									<X className="h-5 w-5" />
								</Button>
							</SheetClose>

							<div className="mt-14 font-cormorant text-lg tracking-[0.15em] uppercase text-white mb-8">
								Luméra
							</div>

							<nav className="flex flex-col gap-1 text-sm">
								<SheetClose asChild>
									<Link to="/" className={mobileLink}>
										{t('nav.home')}
									</Link>
								</SheetClose>

								<SheetClose asChild>
									<Link to="/icons" className={mobileLink}>
										{t('nav.icons')}
									</Link>
								</SheetClose>

								{/* Collections accordion */}
								<Accordion type="single" collapsible className="w-full">
									<AccordionItem value="collections" className="border-none">
										<AccordionTrigger
											className={cn(
												mobileLink,
												'py-3 hover:no-underline [&>svg]:text-white/40',
											)}
										>
											{t('nav.collections')}
										</AccordionTrigger>
										<AccordionContent className="pb-0 pl-4 flex flex-col gap-1">
											{COLLECTIONS.map(({ slug }) => (
												<SheetClose key={slug} asChild>
													<Link
														to={`/collections/${slug}`}
														className="block py-2 text-white/50 hover:text-white transition-colors tracking-[0.1em]"
													>
														{t(`categories.${slug}`)}
													</Link>
												</SheetClose>
											))}
										</AccordionContent>
									</AccordionItem>
								</Accordion>

								<SheetClose asChild>
									<Link to="/gifting" className={mobileLink}>
										{t('nav.gifting')}
									</Link>
								</SheetClose>

								<SheetClose asChild>
									<Link to="/story" className={mobileLink}>
										{t('nav.ourStory')}
									</Link>
								</SheetClose>

								<SheetClose asChild>
									<Link to="/materials" className={mobileLink}>
										{t('nav.materials')}
									</Link>
								</SheetClose>

								<SheetClose asChild>
									<Link to="/faq" className={mobileLink}>
										{t('nav.faq')}
									</Link>
								</SheetClose>

								<SheetClose asChild>
									<a href="#contact" className={mobileLink}>
										{t('nav.contact')}
									</a>
								</SheetClose>
							</nav>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
}

function NavLink({
	to,
	children,
}: {
	to: string;
	children: React.ReactNode;
}) {
	return (
		<Link
			to={to}
			className="px-3 py-1 text-xs font-normal tracking-[0.15em] uppercase text-white/80 hover:text-white transition-colors"
		>
			{children}
		</Link>
	);
}

const mobileLink =
	'block py-3 text-sm tracking-[0.1em] uppercase text-white/70 hover:text-white transition-colors border-b border-white/5';
