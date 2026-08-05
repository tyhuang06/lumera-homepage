import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Thin campaign strip that sits directly below the fixed Navbar, overlaid on
// the hero — home page only. Positioned `absolute` (not `fixed`) so it's
// anchored to the document rather than the viewport: it scrolls away with
// the hero as the page scrolls, instead of staying pinned. Measures its own
// (responsive, can wrap to 2 lines on small screens) height and exposes it
// as the --announcement-h CSS variable in case other layout needs to offset
// around it; that var is reset to 0 on every other page since the bar isn't
// rendered there.
export function AnnouncementBar() {
	const { t, i18n } = useTranslation();
	const { pathname } = useLocation();
	const isHome = pathname === '/';
	const isZh = i18n.language === 'zh-Hant';
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isHome) {
			document.documentElement.style.setProperty('--announcement-h', '0px');
			return;
		}

		const el = ref.current;
		if (!el) return;

		const setVar = () => {
			document.documentElement.style.setProperty(
				'--announcement-h',
				`${el.offsetHeight}px`,
			);
		};

		setVar();
		const ro = new ResizeObserver(setVar);
		ro.observe(el);
		window.addEventListener('resize', setVar);

		return () => {
			ro.disconnect();
			window.removeEventListener('resize', setVar);
		};
	}, [isHome]);

	if (!isHome) return null;

	return (
		<div
			ref={ref}
			className="animate-hero absolute top-16 inset-x-0 z-40 bg-cream border-b border-gold/25"
			style={{ animationDelay: '0ms' }}
		>
			<div className="mx-auto max-w-4xl px-6 py-2 text-center leading-snug">
				<p
					className={`text-charcoal uppercase ${
						isZh
							? 'font-noto-tc text-[0.68rem] tracking-[0.1em]'
							: 'font-jost text-[0.62rem] tracking-[0.15em] sm:text-[0.68rem] sm:tracking-[0.25em]'
					}`}
				>
					{t('announcement.line1')}
				</p>
				<p
					className={`mt-0.5 text-charcoal/60 normal-case ${
						isZh
							? 'font-noto-tc text-[0.78rem] tracking-[0.02em]'
							: 'font-jost text-[0.72rem] tracking-[0.03em] sm:text-[0.78rem]'
					}`}
				>
					{t('announcement.line2')}
				</p>
			</div>
		</div>
	);
}
