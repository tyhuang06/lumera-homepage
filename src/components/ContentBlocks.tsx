export type ListBlock = {
	type: 'list';
	items: string[];
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
