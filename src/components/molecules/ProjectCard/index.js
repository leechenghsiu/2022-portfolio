import React, { useEffect, useState } from 'react';
import classnames from 'classnames';

import { projectImageRef } from 'services/firebase';

import styles from './styles.module.scss';

const ProjectCard = ({ className, title = '', thumbnail, onClick = () => {} }) => {
	const [imageUrl, setImageUrl] = useState('');

	async function getImageUrl() {
		const url = await projectImageRef(thumbnail);
		setImageUrl(url);
	}

	useEffect(() => {
		getImageUrl();
	}, []);

	return (
		<div
			role="button"
			tabIndex={0}
			onKeyPress={() => {}}
			className={classnames(styles.container, className)}
			onClick={onClick}
			style={{ backgroundImage: `url(${imageUrl})` }}
		>
			<h2>{title}</h2>
		</div>
	);
};

export default ProjectCard;
