import React from 'react';
import classnames from 'classnames';

import styles from './styles.module.scss';

const Intro = ({ hitFlag }) => (
	<div className={styles.wrapper}>
		<div className={classnames(styles.intro, hitFlag === 'intro' && styles.fixed)}>
			<h1>Matthew Lee</h1>
			<p>With great passion in front-end develop, also, UI/UX design is interested in.</p>
			<p>Currently, I&apos;m continuously learning more techniques of front-end development.</p>
		</div>
	</div>
);

export default Intro;
