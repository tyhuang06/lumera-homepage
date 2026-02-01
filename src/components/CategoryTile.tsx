import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function CategoryTile({ category }) {
	return (
		<div className="group break-inside-avoid mb-8">
			<div className="relative aspect-[4/5] overflow-hidden rounded-sm">
				<img
					src={category.cover}
					className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
				/>
			</div>

			<div className="mt-4 flex items-center justify-between">
				<h3 className="text-sm font-medium tracking-wide">
					{category.name}
				</h3>

				<Button
					asChild
					variant="ghost"
					size="sm"
					className="text-muted-foreground"
				>
					<Link to={`/collections/${category.slug}`}>
						View collection
					</Link>
				</Button>
			</div>
		</div>
	);
}
