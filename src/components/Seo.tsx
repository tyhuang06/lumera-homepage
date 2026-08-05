// Shared per-page SEO tags: title, description, canonical URL, and
// Open Graph / Twitter Card meta. Every page should render this once instead
// of a bare <Helmet> so canonical/OG/Twitter stay consistent site-wide.
//
// Note: react-helmet-async reconciles against the static <title>/<meta
// name="description"> already declared in index.html, so those act as a
// pre-hydration fallback for crawlers that don't run JS, and get overridden
// here once React mounts — same pattern this codebase already relied on for
// title/description before this component existed.
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

export const SITE_URL = 'https://lumerafinepearls.com';
const DEFAULT_IMAGE = `${SITE_URL}/gallery/logo.webp`;

type SeoProps = {
	title: string;
	description?: string;
	/** Absolute or root-relative image URL for OG/Twitter cards. */
	image?: string;
	type?: 'website' | 'product' | 'article';
};

export function Seo({ title, description, image = DEFAULT_IMAGE, type = 'website' }: SeoProps) {
	const { pathname } = useLocation();
	const url = `${SITE_URL}${pathname}`;
	const absoluteImage = image.startsWith('http') ? image : `${SITE_URL}${image}`;

	return (
		<Helmet>
			<title>{title}</title>
			{description && <meta name="description" content={description} />}
			<link rel="canonical" href={url} />

			<meta property="og:type" content={type} />
			<meta property="og:site_name" content="Luméra Fine Pearls" />
			<meta property="og:title" content={title} />
			{description && <meta property="og:description" content={description} />}
			<meta property="og:url" content={url} />
			<meta property="og:image" content={absoluteImage} />

			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={title} />
			{description && <meta name="twitter:description" content={description} />}
			<meta name="twitter:image" content={absoluteImage} />
		</Helmet>
	);
}
