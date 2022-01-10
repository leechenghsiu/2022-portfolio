import React from 'react';

import BackstageProject from 'components/organisms/BackstageProject';
import BackstageProjectInner from 'components/organisms/BackstageProjectInner';

import styles from './styles.module.scss';

export const ProjectPage = () => (
	<div className={styles.wrapper}>
		<BackstageProject />
	</div>
);

export const ProjectCreatePage = () => (
	<div className={styles.wrapper}>
		<BackstageProjectInner />
	</div>
);

export const ProjectEditPage = () => (
	<div className={styles.wrapper}>
		<BackstageProjectInner edit />
	</div>
);
