import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

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
				<nav className="hidden md:flex gap-8 text-sm">
					<Link to="/" className="hover:opacity-70">
						Home
					</Link>
					<Link
						to="/collections/necklaces"
						className="hover:opacity-70"
					>
						Collections
					</Link>
					<Link to="/#story" className="hover:opacity-70">
						Our Story
					</Link>
					<Link to="/#contact" className="hover:opacity-70">
						Contact
					</Link>
				</nav>

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
						<nav className="mt-12 flex flex-col gap-5 text-base tracking-wide">
							<Link to="/collections/necklaces">Collections</Link>

							<Link
								to="/"
								className="text-muted-foreground hover:text-foreground transition"
							>
								Home
							</Link>

							<Link
								to="/#story"
								className="text-muted-foreground hover:text-foreground transition"
							>
								Our Story
							</Link>

							<Link
								to="/#contact"
								className="text-muted-foreground hover:text-foreground transition"
							>
								Contact
							</Link>
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
