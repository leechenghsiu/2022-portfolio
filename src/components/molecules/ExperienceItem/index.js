import React, { useState, useEffect } from 'react';
import classnames from 'classnames';

import { useMedia } from 'utils/hook/useMedia';

import { storageRef } from 'services/firebase';

import styles from './styles.module.scss';

const ExperienceItem = ({
	className,
	title = '',
	thumbnail = '',
	department = '',
	role = '',
	startAt = '',
	endAt = '',
	description = '',
}) => {
	const media = useMedia();
	const [imageUrl, setImageUrl] = useState('');

	async function getImageUrl() {
		const url = await storageRef(thumbnail);
		const img = new Image();
		img.src = url;
		img.onload = () => setImageUrl(url);
	}

	useEffect(() => {
		if (thumbnail) {
			getImageUrl();
		}
	}, []);

	return (
		<div
			className={classnames(
				styles.container,
				thumbnail && imageUrl === '' && 'loading-skeleton',
				className,
			)}
		>
			{thumbnail && <img src={imageUrl} alt={title} />}
			<div className={styles.content}>
				<div className={styles.row}>
					<div>
						<p>{`${startAt} - ${endAt}`}</p>
					</div>
					<div>
						<p>{title}</p>
						{department && media !== 'phone' && <p>{department}</p>}
						<p>{role}</p>
					</div>
				</div>
				{description && <p className={styles.desc}>{description}</p>}
			</div>
		</div>
	);
};

export default ExperienceItem;
