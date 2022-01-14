import React from 'react';

import BackstageSkill from 'components/organisms/BackstageSkill';
import BackstageSkillInner from 'components/organisms/BackstageSkillInner';

import styles from './styles.module.scss';

export const SkillPage = () => (
	<div className={styles.wrapper}>
		<BackstageSkill />
	</div>
);

export const SkillCreatePage = () => (
	<div className={styles.wrapper}>
		<BackstageSkillInner />
	</div>
);

export const SkillEditPage = () => (
	<div className={styles.wrapper}>
		<BackstageSkillInner edit />
	</div>
);
