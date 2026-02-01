import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

export function Navbar() {
	return (
		<header className="fixed top-0 z-50 w-full border-b bg-white/80 backdrop-blur">
			<div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
				{/* Logo */}
				<div className="text-lg font-semibold tracking-wide">
					Lumera
				</div>

				{/* Desktop nav */}
				<nav className="hidden md:flex gap-8 text-sm">
					<a href="#gallery" className="hover:opacity-70">
						Gallery
					</a>
					<a href="#story" className="hover:opacity-70">
						Our Story
					</a>
					<a href="#contact" className="hover:opacity-70">
						Contact
					</a>
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

					<SheetContent side="right" className="w-[75%] sm:w-[300px]">
						<nav className="mt-8 flex flex-col gap-6 text-lg">
							<a href="#gallery" className="hover:opacity-70">
								Gallery
							</a>
							<a href="#story" className="hover:opacity-70">
								Our Story
							</a>
							<a href="#contact" className="hover:opacity-70">
								Contact
							</a>
						</nav>
					</SheetContent>
				</Sheet>
			</div>
		</header>
	);
}
