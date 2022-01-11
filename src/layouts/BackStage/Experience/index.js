import React from 'react';

import BackstageExperience from 'components/organisms/BackstageExperience';
import BackstageExperienceInner from 'components/organisms/BackstageExperienceInner';

import styles from './styles.module.scss';

export const ExperiencePage = () => (
	<div className={styles.wrapper}>
		<BackstageExperience />
	</div>
);

export const ExperienceCreatePage = () => (
	<div className={styles.wrapper}>
		<BackstageExperienceInner />
	</div>
);

export const ExperienceEditPage = () => (
	<div className={styles.wrapper}>
		<BackstageExperienceInner edit />
	</div>
);
