import React from 'react';
import classnames from 'classnames';

import styles from './styles.module.scss';

const ProjectCard = ({ className, title = '', onClick = () => {} }) => {
	const a = 1;
	return (
		<div
			role="button"
			tabIndex={0}
			onKeyPress={() => {}}
			className={classnames(styles.container, className)}
			onClick={onClick}
		>
			<h3>{title}</h3>
		</div>
	);
};

export default ProjectCard;
