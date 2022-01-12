import React from 'react';
import classnames from 'classnames';

import SectionTitle from 'components/atoms/SectionTitle';

import styles from './styles.module.scss';

const Intro = ({ hitFlag }) => (
	<div className={styles.wrapper}>
		<div className={classnames(styles.intro, hitFlag === 'intro' && styles.fixed)}>
			<SectionTitle className={styles.sectionTitle} title="Matthew Lee">
				<p>With a great passion for front-end development, and interested in UI/UX design.</p>
				<p>Currently, still learning more techniques of front-end development.</p>
			</SectionTitle>
		</div>
	</div>
);

export default Intro;
