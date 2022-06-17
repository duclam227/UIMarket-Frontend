import React, { useEffect } from 'react';

export function useIntersectionObserver (
	item: any,
	callbackFn: IntersectionObserverCallback,
	threshold: number,
) {
	useEffect(() => {
		const observer = new IntersectionObserver(callbackFn, { threshold: threshold });
		const { current = null } = item;

		if (!current) return;

		observer.observe(current);

		return () => {
			observer.unobserve(current);
		};
	});
}
