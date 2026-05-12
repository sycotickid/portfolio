import { FADE_THRESHOLD, FADE_ROOT_MARGIN } from '$lib/constants';

export function fadeIn(node: HTMLElement) {
	node.classList.add('fade-section');

	const observer = new IntersectionObserver(
		([entry]) => {
			if (entry.isIntersecting) {
				node.classList.add('visible');
				observer.unobserve(node);
			}
		},
		{ threshold: FADE_THRESHOLD, rootMargin: FADE_ROOT_MARGIN }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
