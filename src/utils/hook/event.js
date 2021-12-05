import { useState, useEffect } from 'react';

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
