import React from 'react';
import classnames from 'classnames';

import styles from './styles.module.scss';

const ProjectCard = ({ className, title = '', thumbnail, onClick = () => {} }) => {
	const a = 1;
	return (
		<div
			role="button"
			tabIndex={0}
			onKeyPress={() => {}}
			className={classnames(styles.container, className)}
			onClick={onClick}
			style={{ backgroundImage: `url(${thumbnail})` }}
		>
			<h2>{title}</h2>
		</div>
	);
};

export default ProjectCard;
