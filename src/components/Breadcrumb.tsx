import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export type BreadcrumbItem = {
	label: string;
	to?: string;
};

export function Breadcrumb({
	items,
	className = 'mb-10',
}: {
	items: BreadcrumbItem[];
	className?: string;
}) {
	const { t } = useTranslation();

	return (
		<nav className={`${className} flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-muted-foreground`}>
			<Link to="/" className="hover:text-foreground transition-colors">
				{t('nav.home')}
			</Link>
			{items.map((item, i) => (
				<span key={i} className="flex items-center gap-2">
					<span className="opacity-40">—</span>
					{item.to ? (
						<Link to={item.to} className="hover:text-foreground transition-colors">
							{item.label}
						</Link>
					) : (
						<span className="text-foreground truncate max-w-[140px]">{item.label}</span>
					)}
				</span>
			))}
		</nav>
	);
}
