import React from 'react';
import classnames from 'classnames';

import SectionTitle from 'components/atoms/SectionTitle';

import styles from './styles.module.scss';

const Intro = ({ hitFlag }) => (
	<div className={styles.wrapper}>
		<div className={classnames(styles.intro, hitFlag === 'intro' && styles.fixed)}>
			<SectionTitle className={styles.sectionTitle} title="Matthew Lee">
				<p>With great passion in front-end develop, also, UI/UX design is interested in.</p>
				<p>Currently, I&apos;m continuously learning more techniques of front-end development.</p>
			</SectionTitle>
		</div>
	</div>
);

export default Intro;
