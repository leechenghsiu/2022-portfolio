import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { use100vh } from 'react-div-100vh';

import { useScroll } from 'utils/hook/event';

import styles from './styles.module.scss';

const Intro = () => {
	const height = use100vh();
	const { scrollY } = useScroll();
	const [isFixed, setIsFixed] = useState(true);

	useEffect(() => {
		if (height && scrollY >= height * 0.5) {
			if (isFixed) {
				setIsFixed(false);
			}
		} else if (!isFixed) {
			setIsFixed(true);
		}
	}, [scrollY]);

	return (
		<div className={styles.wrapper}>
			<div className={classnames(styles.intro, isFixed && styles.fixed)}>
				<h1>Matthew Lee</h1>
				<p>With great passion in front-end develop, also, UI/UX design is interested in.</p>
				<p>Currently, I&apos;m continuously learning more techniques of front-end development.</p>
			</div>
		</div>
	);
};

export default Intro;
