import { Button } from '@/components/ui/button';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from './ui/navigation-menu';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from './ui/accordion';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Navbar() {
	const { t } = useTranslation();

	return (
		<header className="fixed top-0 z-50 w-full border-b bg-white/80 backdrop-blur pointer-events-none">
			<div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 pointer-events-auto">
				{/* Logo */}
				<Link
					to="/"
					className="text-lg font-didot font-semibold leading-none tracking-[0.12em]"
				>
					LUMÉRA
				</Link>

				{/* Desktop nav */}
				<NavigationMenu className="hidden md:flex">
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuTrigger className="text-sm">
								{t('nav.collections')}
							</NavigationMenuTrigger>

							<NavigationMenuContent>
								<ul className="grid w-50 gap-2 p-4">
									<li>
										<NavigationMenuLink asChild>
											<Link to="/collections/necklaces">
												{t('categories.necklaces')}
											</Link>
										</NavigationMenuLink>
									</li>
									<li>
										<NavigationMenuLink asChild>
											<Link to="/collections/earrings">
												{t('categories.earrings')}
											</Link>
										</NavigationMenuLink>
									</li>
									<li>
										<NavigationMenuLink asChild>
											<Link to="/collections/bracelets">
												{t('categories.bracelets')}
											</Link>
										</NavigationMenuLink>
									</li>
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuLink
								asChild
								className={navigationMenuTriggerStyle()}
							>
								<Link to="/story">{t('nav.ourStory')}</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuLink
								asChild
								className={navigationMenuTriggerStyle()}
							>
								<Link to="/faq">{t('nav.faq')}</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuLink
								asChild
								className={navigationMenuTriggerStyle()}
							>
								<a href="#contact">{t('nav.contact')}</a>
							</NavigationMenuLink>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<Button
								variant="ghost"
								size="icon-lg"
								className="rounded-full"
							>
								<LanguageSwitcher />
							</Button>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>

				{/* Mobile menu */}
				<div className="flex items-center gap-1 md:hidden">
					<Button
						variant="ghost"
						size="icon-lg"
						className="rounded-full"
					>
						<LanguageSwitcher />
					</Button>

					<Sheet>
						<SheetTrigger asChild>
							<Button
								variant="ghost"
								size="icon-lg"
								className="md:hidden rounded-full z-40"
							>
								<Menu className="h-4 w-4" />
							</Button>
						</SheetTrigger>

						<SheetContent
							side="right"
							className="
                            w-[75%] sm:w-[320px]
                            bg-white/95 backdrop-blur
                            border-l
                            px-4
                            pb-10
                        "
						>
							<nav className="mt-12 pt-4 flex flex-col gap-5 text-base tracking-wide">
								<Accordion type="single" collapsible>
									<AccordionItem
										value="collections"
										className="border-none"
									>
										<AccordionTrigger
											className="
                                            py-0
                                            text-base
                                            font-normal
                                            tracking-wide
                                            text-muted-foreground
                                            hover:text-foreground
                                            hover:no-underline
                                        "
										>
											{t('nav.collections')}
										</AccordionTrigger>

										<AccordionContent className="mt-4 flex flex-col gap-4 pl-2">
											<SheetClose asChild>
												<Link
													to="/collections/necklaces"
													className="text-muted-foreground hover:text-foreground transition"
												>
													{t('categories.necklaces')}
												</Link>
											</SheetClose>

											<SheetClose asChild>
												<Link
													to="/collections/earrings"
													className="text-muted-foreground hover:text-foreground transition"
												>
													{t('categories.earrings')}
												</Link>
											</SheetClose>

											<SheetClose asChild>
												<Link
													to="/collections/bracelets"
													className="text-muted-foreground hover:text-foreground transition"
												>
													{t('categories.bracelets')}
												</Link>
											</SheetClose>
										</AccordionContent>
									</AccordionItem>
								</Accordion>

								<SheetClose asChild>
									<Link
										to="/"
										className="text-muted-foreground hover:text-foreground transition"
									>
										{t('nav.home')}
									</Link>
								</SheetClose>

								<SheetClose asChild>
									<Link
										to="/story"
										className="text-muted-foreground hover:text-foreground transition"
									>
										{t('nav.ourStory')}
									</Link>
								</SheetClose>

								<SheetClose asChild>
									<Link
										to="/faq"
										className="text-muted-foreground hover:text-foreground transition"
									>
										{t('nav.faq')}
									</Link>
								</SheetClose>

								<SheetClose asChild>
									<a
										href="#contact"
										className="text-muted-foreground hover:text-foreground transition"
									>
										{t('nav.contact')}
									</a>
								</SheetClose>
							</nav>

							<div className="mt-auto pt-10 text-xs tracking-[0.2em] text-muted-foreground">
								LUMÉRA
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
}
