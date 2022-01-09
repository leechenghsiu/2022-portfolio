import React, { useState, useEffect } from 'react';
import { use100vh } from 'react-div-100vh';

import { useModal } from 'models/modal';

import { useScroll } from 'utils/hook/event';

import Intro from 'components/organisms/Intro';
import Skill from 'components/organisms/Skill';
import Project from 'components/organisms/Project';
import Experience from 'components/organisms/Experience';
import Contact from 'components/organisms/Contact';

import styles from './styles.module.scss';

export const HomePage = () => {
	const height = use100vh();
	const { scrollY } = useScroll();
	const [hitFlag, setHitFlag] = useState('intro');
	const [{ type }] = useModal();

	useEffect(() => {
		if (height && type === '') {
			if (scrollY < height * 0.5) {
				setHitFlag('intro');
			}
			if (scrollY >= height * 0.5) {
				setHitFlag('skills');
			}
			if (scrollY >= height * 1.5) {
				setHitFlag('project');
			}
		}
	}, [scrollY]);

	return (
		<div className={styles.homeLayout}>
			<Intro hitFlag={hitFlag} />
			<Skill hitFlag={hitFlag} />
			<Project hitFlag={hitFlag} />
			<Experience />
			<Contact />
		</div>
	);
};
