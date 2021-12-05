import React from 'react';

import Intro from 'components/organisms/Intro';
import Skill from 'components/organisms/Skill';

import styles from './styles.module.scss';

export const HomePage = () => (
	<div className={styles.homeLayout}>
		<Intro />
		<Skill />
	</div>
);
