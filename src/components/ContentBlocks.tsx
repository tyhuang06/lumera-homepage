import { LazyImage } from '@/components/LazyImage';

export type ListBlock = {
	type: 'list';
	items: string[];
};

export type HeadingBlock = {
	type: 'heading';
	text: string;
};

export type ImagesBlock = {
	type: 'images';
	caption?: string;
};

export function ContentListBlock({ block }: { block: ListBlock }) {
	return (
		<ul className="space-y-3">
			{block.items.map((item, i) => (
				<li key={i} className="flex gap-3 text-sm text-muted-foreground">
					<span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-gold/60" />
					<span className="leading-relaxed">{item}</span>
				</li>
			))}
		</ul>
	);
}

export function ContentHeadingBlock({ block }: { block: HeadingBlock }) {
	return (
		<h2 className="font-cormorant text-2xl font-light text-charcoal pt-4">{block.text}</h2>
	);
}

export function ContentImagesBlock({
	block,
	images,
}: {
	block: ImagesBlock;
	images: string[];
}) {
	return (
		<div>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
				{images.map((src) => (
					<div key={src} className="aspect-[4/3] overflow-hidden bg-cream-dark">
						<LazyImage
							src={src}
							alt={block.caption ?? ''}
							className="h-full w-full object-cover"
						/>
					</div>
				))}
			</div>
			{block.caption && (
				<p className="mt-3 text-center text-xs text-muted-foreground">{block.caption}</p>
			)}
		</div>
	);
}
