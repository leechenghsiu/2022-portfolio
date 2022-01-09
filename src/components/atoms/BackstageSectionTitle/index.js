import React from 'react';
import classnames from 'classnames';

import styles from './styles.module.scss';

const BackstageSectionTitle = ({ title = '', className }) => (
	<div className={classnames(styles.sectionTitle, className)}>
		<h1>{title}</h1>
	</div>
);

export default BackstageSectionTitle;
