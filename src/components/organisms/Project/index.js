import React, { useEffect } from 'react';
import { useTransition, useSpringRef, animated } from 'react-spring';

import { useModal } from 'models/modal';

import SectionTitle from 'components/atoms/SectionTitle';
import ProjectCard from 'components/molecules/ProjectCard';
import Modal from 'components/molecules/Modal';

import GhowaThumbnail from 'images/project/ghowa-thumbnail.jpg';
import NoFoodNoCourseThumbnail from 'images/project/no-food-no-course-thumbnail.jpg';
import O2OThumbnail from 'images/project/o2o-thumbnail.jpg';
import BeanbonThumbnail from 'images/project/beanbon-thumbnail.jpg';
import VespaThumbnail from 'images/project/vespa-thumbnail.jpg';
import HIBThumbnail from 'images/project/hib-thumbnail.jpg';
import MachiThumbnail from 'images/project/machi-thumbnail.jpg';
import TitasThumbnail from 'images/project/titas-thumbnail.jpg';
import AfaAchievementThumbnail from 'images/project/afa-achievement-thumbnail.jpg';

import styles from './styles.module.scss';

const studentProjectsData = [
	{ title: 'Ghowa', thumbnail: GhowaThumbnail, _id: 1 },
	{ title: '無食無課', thumbnail: NoFoodNoCourseThumbnail, _id: 2 },
];

const workProjectsData = [
	{ title: 'O2O 教育平台', thumbnail: O2OThumbnail, _id: 1 },
	{ title: 'BeanBon', thumbnail: BeanbonThumbnail, _id: 2 },
	{ title: 'Vespa官方商城 | Vespa台灣', thumbnail: VespaThumbnail, _id: 3 },
	{ title: '大誠保險經紀人', thumbnail: HIBThumbnail, _id: 4 },
	{ title: 'machi machi Reporting Page', thumbnail: MachiThumbnail, _id: 5 },
	{ title: 'TITAS 台北紡織展', thumbnail: TitasThumbnail, _id: 6 },
];

const sideProjectsData = [
	{ title: '農糧作物生產區域發展', thumbnail: AfaAchievementThumbnail, _id: 1 },
];

const Section = ({ start, data, sectionTitle, subTitle }) => {
	const [, { openModal }] = useModal();
	const transRef = useSpringRef();
	const transitions = useTransition(data, {
		ref: transRef,
		trail: 250,
		from: { opacity: 0, scale: 0.8 },
		enter: { opacity: 1, scale: 1 },
	});

	useEffect(() => {
		if (start) transRef.start();
	}, [start]);

	return (
		<div className={styles.project}>
			<SectionTitle className={styles.sectionTitle} title={sectionTitle}>
				<p>{subTitle}</p>
			</SectionTitle>
			<div className={styles.content} style={{ minHeight: 136 * Math.ceil(data.length / 2) }}>
				{transitions((style, { title, thumbnail }) => (
					<animated.div className={styles.animated} style={style}>
						<ProjectCard
							key={title}
							title={title}
							thumbnail={thumbnail}
							onClick={() => openModal({ type: 'project' })}
						/>
					</animated.div>
				))}
			</div>
		</div>
	);
};

const Project = ({ hitFlag }) => {
	const [{ type }, { closeModal }] = useModal();

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<Section
					start={hitFlag === 'project'}
					data={studentProjectsData}
					sectionTitle="Student Projects"
					subTitle="UX/UI designer who loves her job and helps design industry development in Kazakhstan"
				/>
				<Section
					start={hitFlag === 'project'}
					data={workProjectsData}
					sectionTitle="Work Projects"
					subTitle="UX/UI designer who loves her job and helps design industry development in Kazakhstan"
				/>
				<Section
					start={hitFlag === 'project'}
					data={sideProjectsData}
					sectionTitle="Side Projects"
					subTitle="UX/UI designer who loves her job and helps design industry development in Kazakhstan"
				/>
			</div>
			<Modal active={type === 'project'}>
				<button type="button" onClick={() => closeModal()}>
					close
				</button>
			</Modal>
		</div>
	);
};

export default Project;
