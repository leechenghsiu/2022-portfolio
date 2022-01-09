import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { use100vh } from 'react-div-100vh';
import ReactPlayer from 'react-player';

import { useModal } from 'models/modal';
import { useProject, defaultTargetProjectData } from 'models/project';

import { storageRef } from 'services/firebase';

import Modal from 'components/molecules/Modal';

import { ReactComponent as Close } from 'images/icon/close.svg';

import styles from './styles.module.scss';

const ProjectInnerModal = () => {
	const height = use100vh();
	const [loading, setLoading] = useState(true);
	const [videoUrl, setVideoUrl] = useState('');
	const [{ type }, { closeModal }] = useModal();
	const [{ targetProject }, { setTargetProject }] = useProject();

	async function getVideoUrl() {
		const url = await storageRef(targetProject.video);
		setVideoUrl(url);
	}

	useEffect(() => {
		if (targetProject.video) {
			getVideoUrl();
		}
	}, [targetProject.video]);

	const handleClose = () => {
		closeModal();
		setTargetProject(defaultTargetProjectData);
		setVideoUrl('');
		setLoading(true);
	};

	return (
		<Modal active={type === 'project'}>
			<div className={styles.modalWrapper} style={{ minHeight: 0.9 * height, top: 0.1 * height }}>
				<div className={styles.modalContainer}>
					<Close onClick={handleClose} />
					{videoUrl && (
						<div className={classnames(styles.player, loading && 'loading-skeleton')}>
							<ReactPlayer
								width="1280px"
								height="720px"
								url={videoUrl}
								loop
								playing
								onReady={() => setLoading(false)}
							/>
						</div>
					)}
					<div className={styles.content}>
						<h1>{targetProject.title}</h1>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default ProjectInnerModal;
