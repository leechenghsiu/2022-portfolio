import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { use100vh } from 'react-div-100vh';
import ReactPlayer from 'react-player';
import IconButton from '@mui/material/IconButton';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

import i18n from 'utils/i18n';
import { useMedia } from 'utils/hook/useMedia';

import { useModal } from 'models/modal';
import { useProject, defaultTargetProjectData } from 'models/project';

import { storageRef } from 'services/firebase';

import Modal from 'components/molecules/Modal';

import { ReactComponent as Close } from 'images/icon/close.svg';

import styles from './styles.module.scss';

const ProjectInnerModal = () => {
	const media = useMedia();
	const height = use100vh();
	const [loading, setLoading] = useState(true);
	const [videoUrl, setVideoUrl] = useState('');
	const [mute, setMute] = useState(true);
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
			<div
				className={styles.modalWrapper}
				style={{
					minHeight: (media === 'desktop' ? 0.9 : 0.95) * height,
					top: (media === 'desktop' ? 0.1 : 0.05) * height,
				}}
			>
				<div className={styles.modalContainer}>
					<IconButton className={styles.closeIcon} onClick={handleClose}>
						<Close />
					</IconButton>
					{targetProject.video ? (
						<div className={classnames(styles.player, loading && 'loading-skeleton')}>
							<ReactPlayer
								width={media === 'desktop' ? '1280px' : '100%'}
								height={media === 'desktop' ? '720px' : '100%'}
								url={videoUrl}
								loop
								playing
								onReady={() => setLoading(false)}
								muted={mute}
							/>
							<IconButton className={styles.muteIcon} onClick={() => setMute(!mute)}>
								{mute ? <VolumeOffIcon /> : <VolumeUpIcon />}
							</IconButton>
						</div>
					) : (
						<img
							className={styles.banner}
							src={targetProject.thumbnail}
							alt={i18n.language === 'en' ? targetProject.title : targetProject.titleZh}
						/>
					)}
					<div className={styles.content}>
						<div className={styles.tagList}>
							{targetProject.tag.map(_tag => (
								<p key={_tag}>{_tag}</p>
							))}
						</div>
						<h1>{i18n.language === 'en' ? targetProject.title : targetProject.titleZh}</h1>
						<div
							className={styles.desc}
							// eslint-disable-next-line
							dangerouslySetInnerHTML={{
								__html: i18n.language === 'en' ? targetProject.content : targetProject.contentZh,
							}}
						/>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default ProjectInnerModal;
