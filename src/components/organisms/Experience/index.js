import React from 'react';

import SectionTitle from 'components/atoms/SectionTitle';

import styles from './styles.module.scss';

const Experience = () => {
	const a = 1;
	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<SectionTitle className={styles.sectionTitle} title="Experience">
					<p>
						UX/UI designer who loves her job and helps design industry development in Kazakhstan
					</p>
				</SectionTitle>
			</div>
		</div>
	);
};

export default Experience;
