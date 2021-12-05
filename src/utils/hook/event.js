import { useState, useEffect } from 'react';

// Handle the Dom event
export const useDom = eventHandlers => {
	// Only subscribe/unsubscribe on mount/unmount lifecycle
	useEffect(() => {
		Object.keys(eventHandlers).forEach(event =>
			window.addEventListener(event, eventHandlers[event]),
		);

		return () => {
			Object.keys(eventHandlers).forEach(event =>
				window.removeEventListener(event, eventHandlers[event]),
			);
		};
	}, []);
};

export const useScroll = () => {
	const [scrollY, setState] = useState(0);

	const scrollEvent = () => {
		setState(window.scrollY);
	};

	useDom({ scroll: scrollEvent });

	return { scrollY };
};

export const useScrollDirection = () => {
	const [scrollDir, setScrollDir] = useState('up');

	useEffect(() => {
		setScrollDir('up');
	}, []);

	useEffect(() => {
		const threshold = 40;
		let lastScrollY = window.pageYOffset;
		let ticking = false;

		const updateScrollDir = () => {
			const scrollY = window.pageYOffset;

			if (Math.abs(scrollY - lastScrollY) < threshold) {
				ticking = false;
				return;
			}
			setScrollDir(scrollY > lastScrollY ? 'down' : 'up');
			lastScrollY = scrollY > 0 ? scrollY : 0;
			ticking = false;
		};

		const onScroll = () => {
			if (!ticking) {
				window.requestAnimationFrame(updateScrollDir);
				ticking = true;
			}
		};

		window.addEventListener('scroll', onScroll);

		return () => window.removeEventListener('scroll', onScroll);
	}, [scrollDir]);

	return scrollDir;
};
