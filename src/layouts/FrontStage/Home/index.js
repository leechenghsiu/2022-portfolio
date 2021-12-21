import React, { useState, useEffect } from 'react';
import { use100vh } from 'react-div-100vh';

import { useScroll } from 'utils/hook/event';
import Intro from 'components/organisms/Intro';
import Skill from 'components/organisms/Skill';

import styles from './styles.module.scss';

export const HomePage = () => {
	const height = use100vh();
	const { scrollY } = useScroll();
	const [hitFlag, setHitFlag] = useState('intro');

	useEffect(() => {
		if (height) {
			if (scrollY < height * 0.5) {
				setHitFlag('intro');
			}
			if (scrollY >= height * 0.5) {
				setHitFlag('skills');
			}
			if (scrollY >= height * 1.2) {
				setHitFlag('???');
			}
		}
	}, [scrollY]);

	return (
		<div className={styles.homeLayout}>
			<Intro hitFlag={hitFlag} />
			<Skill hitFlag={hitFlag} />
		</div>
	);
};
