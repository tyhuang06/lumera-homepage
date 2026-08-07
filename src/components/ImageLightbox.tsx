import { useState, type MouseEvent } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';

type ImageLightboxProps = {
	images: string[];
	alt: string;
	index: number;
	onIndexChange: (index: number) => void;
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

/** Full-screen click-to-zoom viewer for product images. */
export function ImageLightbox({
	images,
	alt,
	index,
	onIndexChange,
	open,
	onOpenChange,
}: ImageLightboxProps) {
	const [zoomed, setZoomed] = useState(false);
	const [origin, setOrigin] = useState('50% 50%');

	const goTo = (next: number) => {
		setZoomed(false);
		onIndexChange((next + images.length) % images.length);
	};

	const toggleZoom = (e: MouseEvent<HTMLImageElement>) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const x = ((e.clientX - rect.left) / rect.width) * 100;
		const y = ((e.clientY - rect.top) / rect.height) * 100;
		setOrigin(`${x}% ${y}%`);
		setZoomed((z) => !z);
	};

	return (
		<Dialog.Root
			open={open}
			onOpenChange={(next) => {
				if (!next) setZoomed(false);
				onOpenChange(next);
			}}
		>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 z-[100] bg-black/95 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
				<Dialog.Content
					className="fixed inset-0 z-[100] flex items-center justify-center outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
					onKeyDown={(e) => {
						if (e.key === 'ArrowLeft') goTo(index - 1);
						if (e.key === 'ArrowRight') goTo(index + 1);
					}}
				>
					<Dialog.Title className="sr-only">{alt}</Dialog.Title>

					<Dialog.Close
						aria-label="Close"
						className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center text-white/80 transition-colors hover:text-white"
					>
						<X className="h-6 w-6" />
					</Dialog.Close>

					{images.length > 1 && (
						<>
							<button
								onClick={() => goTo(index - 1)}
								aria-label="Previous image"
								className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-white/80 transition-colors hover:text-white sm:left-4"
							>
								<ChevronLeft className="h-7 w-7" />
							</button>
							<button
								onClick={() => goTo(index + 1)}
								aria-label="Next image"
								className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-white/80 transition-colors hover:text-white sm:right-4"
							>
								<ChevronRight className="h-7 w-7" />
							</button>
						</>
					)}

					<div className="flex h-full w-full items-center justify-center overflow-hidden p-6 sm:p-12">
						<img
							src={images[index]}
							alt={`${alt} ${index + 1}`}
							onClick={toggleZoom}
							className={cn(
								'max-h-full max-w-full select-none object-contain transition-transform duration-300 ease-out',
								zoomed ? 'cursor-zoom-out scale-[2.2]' : 'cursor-zoom-in scale-100',
							)}
							style={{ transformOrigin: origin }}
						/>
					</div>

					{images.length > 1 && (
						<div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs tracking-[0.2em] text-white/60">
							{index + 1} / {images.length}
						</div>
					)}
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
