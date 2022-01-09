import React, { useEffect, useState } from 'react';
import classnames from 'classnames';

import { storageRef } from 'services/firebase';

import styles from './styles.module.scss';

const ProjectCard = ({ className, title = '', thumbnail = '', tag = [], onClick = () => {} }) => {
	const [imageUrl, setImageUrl] = useState('');

	async function getImageUrl() {
		const url = await storageRef(thumbnail);
		const img = new Image();
		img.src = url;
		img.onload = () => setImageUrl(url);
	}

	useEffect(() => {
		getImageUrl();
	}, []);

	return (
		<div
			role="button"
			tabIndex={0}
			onKeyPress={() => {}}
			className={classnames(styles.container, imageUrl === '' && 'loading-skeleton', className)}
			onClick={onClick}
			style={imageUrl !== '' ? { backgroundImage: `url(${imageUrl})` } : {}}
		>
			<h2>{title}</h2>
			<div className={styles.tagList}>
				{tag.map(_tag => (
					<p key={_tag}>{_tag}</p>
				))}
			</div>
		</div>
	);
};

export default ProjectCard;
