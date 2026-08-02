import { useState, type ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type LazyImageProps = ImgHTMLAttributes<HTMLImageElement> & {
	/** Mark the first/above-the-fold image on a page so it loads eagerly instead of lazily. */
	priority?: boolean;
};

export function LazyImage({ priority, className, style, onLoad, ...props }: LazyImageProps) {
	const [loaded, setLoaded] = useState(false);

	return (
		<img
			{...props}
			loading={priority ? "eager" : "lazy"}
			decoding="async"
			fetchPriority={priority ? "high" : "auto"}
			onLoad={(e) => {
				setLoaded(true);
				onLoad?.(e);
			}}
			// Set the transition shorthand inline (rather than a Tailwind class) so it can't be
			// silently clobbered by a caller's own `transition-transform`-style class — both end up
			// setting the same `transition-property` CSS rule, and only one can win.
			style={{ transition: "opacity 500ms ease, transform 500ms ease", ...style }}
			className={cn(loaded ? "opacity-100" : "opacity-0", className)}
		/>
	);
}
