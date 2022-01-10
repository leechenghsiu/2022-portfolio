import React, { useState, useEffect } from 'react';
import { use100vh } from 'react-div-100vh';

import { useModal } from 'models/modal';

import { useScroll } from 'utils/hook/event';
import { useMedia } from 'utils/hook/useMedia';

import Intro from 'components/organisms/Intro';
import Skill from 'components/organisms/Skill';
import Project from 'components/organisms/Project';
import Experience from 'components/organisms/Experience';
import Contact from 'components/organisms/Contact';

import styles from './styles.module.scss';

export const HomePage = () => {
	const height = use100vh();
	const { scrollY } = useScroll();
	const media = useMedia();
	const [hitFlag, setHitFlag] = useState('intro');
	const [{ type }] = useModal();

	useEffect(() => {
		if (height && type === '') {
			if (media === 'desktop') {
				if (scrollY < height * 0.5) setHitFlag('intro');
				if (scrollY >= height * 0.5) setHitFlag('skills');
				if (scrollY >= height * 1.3) setHitFlag('project');
				if (scrollY >= height * 2.6) setHitFlag('experience');
			} else if (media === 'tablet') {
				if (scrollY < height * 0.4) setHitFlag('intro');
				if (scrollY >= height * 0.4) setHitFlag('skills');
			} else {
				if (scrollY < height * 0.4) setHitFlag('intro');
				if (scrollY >= height * 0.4) setHitFlag('skills');
			}
		}
	}, [scrollY, media]);

	return (
		<div className={styles.homeLayout}>
			<Intro hitFlag={hitFlag} />
			<Skill hitFlag={hitFlag} />
			<Project hitFlag={hitFlag} />
			<Experience hitFlag={hitFlag} />
			<Contact />
		</div>
	);
};
