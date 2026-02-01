import { useParams } from 'react-router';
import { CategoryBreadcrumb } from '@/components/CategoryBreadcrumb';
import { Gallery } from '@/components/Gallery';
import type { CategorySlug } from '@/data/categories';
import { products } from '@/data/products';

export default function CategoryPage() {
	const { category } = useParams();
	const slug = category as CategorySlug | undefined;

	if (!slug) {
		return (
			<main className="mx-auto max-w-7xl px-4 pt-24 pb-16">
				<p className="text-sm text-muted-foreground">
					Collection not found.
				</p>
			</main>
		);
	}

	const title = slug.charAt(0).toUpperCase() + slug.slice(1);
	const categoryProducts = products.filter((p) => p.category === slug);

	return (
		<main className="mx-auto max-w-7xl px-4 pt-24 pb-16">
			<section className="mb-12">
				<CategoryBreadcrumb category={title} />

				<h1 className="mt-4 font-didot text-3xl tracking-wide">
					{title}
				</h1>

				<p className="mt-2 max-w-xl text-sm text-muted-foreground">
					Some placeholder text
				</p>
			</section>

			<Gallery products={categoryProducts} />
		</main>
	);
}
