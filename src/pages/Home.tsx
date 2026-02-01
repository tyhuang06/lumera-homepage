import { categories } from '@/data/categories';
import { CategoryTile } from '@/components/CategoryTile';

export function Home() {
	return (
		<section className="mx-auto max-w-7xl px-4 py-16">
			<div className="mb-10">
				<p className="text-xs tracking-[0.2em] text-muted-foreground mb-8">
					Collections
				</p>
			</div>

			<div className="columns-1 gap-8 sm:columns-2 lg:columns-3">
				{categories.map((category) => (
					<CategoryTile key={category.slug} category={category} />
				))}
			</div>
		</section>
	);
}
