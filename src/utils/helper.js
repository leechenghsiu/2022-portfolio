export const isExist = value => value !== null && value !== '' && typeof value !== 'undefined';

export const isEmpty = value => !isExist(value);

export const scrollToRef = (ref = null, offset = 0) => {
	if (ref && ref.current) {
		window.scrollTo({
			behavior: 'smooth',
			top: ref.current.offsetTop + offset,
		});
	} else {
		window.scrollTo({
			behavior: 'smooth',
			top: offset,
		});
	}
};
