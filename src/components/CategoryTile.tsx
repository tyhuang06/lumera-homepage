import { Link } from 'react-router-dom';
import type { Category } from '@/data/categories';

export function CategoryTile({ category }: { category: Category }) {
	return (
		<div className="group break-inside-avoid mb-12">
			<Link to={`/collections/${category.slug}`}>
				<div className="relative aspect-4/5 overflow-hidden rounded-sm">
					<img
						src={category.cover}
						alt={category.name}
						className="
                            h-full w-full object-cover
                            transition-transform duration-700
                            group-hover:scale-[1.03]
                        "
					/>

					<div
						className="
                            absolute inset-x-0 bottom-0
                            bg-linear-to-t from-[rgba(20,20,22,0.55)] via-[rgba(20,20,22,0.25)] to-transparent
                            px-5 pt-10 pb-4
                        "
					>
						<div className="flex items-end justify-between text-white/95">
							<span className="text-sm tracking-wide">
								{category.name}
							</span>
							<span className="text-xs tracking-wide transition hover:text-white">
								View collection
							</span>
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
}
