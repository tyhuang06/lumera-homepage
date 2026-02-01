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

export function Navbar() {
	return (
		<header className="fixed top-0 z-50 w-full border-b bg-white/80 backdrop-blur">
			<div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
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
								Collections
							</NavigationMenuTrigger>

							<NavigationMenuContent>
								<ul className="grid w-200px gap-2 p-4">
									<li>
										<NavigationMenuLink asChild>
											<Link to="/collections/necklaces">
												Necklaces
											</Link>
										</NavigationMenuLink>
									</li>
									<li>
										<NavigationMenuLink asChild>
											<Link to="/collections/earrings">
												Earrings
											</Link>
										</NavigationMenuLink>
									</li>
									<li>
										<NavigationMenuLink asChild>
											<Link to="/collections/bracelets">
												Bracelets
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
								<Link to="/story">Our Story</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuLink
								asChild
								className={navigationMenuTriggerStyle()}
							>
								<Link to="/faq">FAQ</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuLink
								asChild
								className={navigationMenuTriggerStyle()}
							>
								<Link to="/contact">Contact</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>

				{/* Mobile menu */}
				<Sheet>
					<SheetTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							className="md:hidden rounded-full"
						>
							<Menu className="h-5 w-5" />
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
										Collections
									</AccordionTrigger>

									<AccordionContent className="mt-4 flex flex-col gap-4 pl-2">
										<SheetClose asChild>
											<Link
												to="/collections/necklaces"
												className="text-muted-foreground hover:text-foreground transition"
											>
												Necklaces
											</Link>
										</SheetClose>

										<SheetClose asChild>
											<Link
												to="/collections/earrings"
												className="text-muted-foreground hover:text-foreground transition"
											>
												Earrings
											</Link>
										</SheetClose>

										<SheetClose asChild>
											<Link
												to="/collections/bracelets"
												className="text-muted-foreground hover:text-foreground transition"
											>
												Bracelets
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
									Home
								</Link>
							</SheetClose>

							<SheetClose asChild>
								<Link
									to="/story"
									className="text-muted-foreground hover:text-foreground transition"
								>
									Our Story
								</Link>
							</SheetClose>

							<SheetClose asChild>
								<Link
									to="/faq"
									className="text-muted-foreground hover:text-foreground transition"
								>
									FAQ
								</Link>
							</SheetClose>

							<SheetClose asChild>
								<Link
									to="/contact"
									className="text-muted-foreground hover:text-foreground transition"
								>
									Contact
								</Link>
							</SheetClose>
						</nav>

						<div className="mt-auto pt-10 text-xs tracking-[0.2em] text-muted-foreground">
							LUMÉRA
						</div>
					</SheetContent>
				</Sheet>
			</div>
		</header>
	);
}
