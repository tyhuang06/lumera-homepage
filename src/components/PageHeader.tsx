export function PageHeader({
	eyebrow,
	title,
	description,
	variant = 'light',
	as: Heading = 'h1',
	className = 'mb-14',
}: {
	eyebrow: string;
	title: string;
	description?: string;
	variant?: 'light' | 'dark';
	as?: 'h1' | 'h2';
	className?: string;
}) {
	const isDark = variant === 'dark';

	return (
		<div className={`${className} text-center`}>
			<p className={`text-[0.65rem] tracking-[0.35em] uppercase mb-3 ${isDark ? 'text-gold-light' : 'text-gold'}`}>
				{eyebrow}
			</p>
			<Heading className={`font-cormorant text-4xl font-light tracking-wide mb-4 ${isDark ? 'text-white' : 'text-charcoal'}`}>
				{title}
			</Heading>
			<div className="mx-auto w-10 h-px bg-gold" />
			{description && (
				<p className={`mt-4 text-sm max-w-md mx-auto leading-relaxed ${isDark ? 'text-white/50' : 'text-muted-foreground'}`}>
					{description}
				</p>
			)}
		</div>
	);
}
