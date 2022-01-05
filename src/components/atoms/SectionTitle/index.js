import React from 'react';
import classnames from 'classnames';

import styles from './styles.module.scss';

const SectionTitle = ({ title = '', children, className }) => (
	<div className={classnames(styles.sectionTitle, className)}>
		<h1>{title}</h1>
		{children}
	</div>
);

export default SectionTitle;
