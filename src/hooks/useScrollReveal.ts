import { useEffect, useRef } from 'react';

/**
 * Attaches an IntersectionObserver to the returned ref.
 * When the element enters the viewport, it adds the 'is-visible' CSS class
 * (used by .reveal and .reveal-stagger in index.css) and then stops observing.
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>() {
	const ref = useRef<T>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					el.classList.add('is-visible');
					observer.unobserve(el);
				}
			},
			{ threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	return ref;
}
