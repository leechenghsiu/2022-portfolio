import React, { useEffect, forwardRef } from 'react';
import classnames from 'classnames';
import { useTransition, useSpringRef, animated } from 'react-spring';
import { useTranslation } from 'react-i18next';

import { useMedia } from 'utils/hook/useMedia';

import { useModal } from 'models/modal';
import { useProject } from 'models/project';

import SectionTitle from 'components/atoms/SectionTitle';
import ProjectCard from 'components/molecules/ProjectCard';
import ProjectInnerModal from 'components/molecules/ProjectInnerModal';

import styles from './styles.module.scss';

const Section = ({ start, data, sectionTitle, subTitle, last = false }) => {
	const media = useMedia();
	const [, { openModal }] = useModal();
	const [, { setTargetProject }] = useProject();

	const transRef = useSpringRef();
	const transitions = useTransition(data, {
		ref: media === 'desktop' ? transRef : null,
		trail: 250,
		from: { opacity: 0, scale: 0.8 },
		enter: { opacity: 1, scale: 1 },
	});

	useEffect(() => {
		if (start) transRef.start();
	}, [start]);

	return (
		<div className={classnames(styles.project, last && styles.last)}>
			<SectionTitle className={styles.sectionTitle} title={sectionTitle}>
				<p>{subTitle}</p>
			</SectionTitle>
			<div className={styles.content} style={{ minHeight: 136 * Math.ceil(data.length / 2) }}>
				{transitions((style, project) => (
					<animated.div style={style}>
						<ProjectCard
							key={project.id}
							title={project.title}
							thumbnail={project.thumbnail}
							tag={project.tag}
							onClick={() => {
								openModal({ type: 'project' });
								setTargetProject(project);
							}}
						/>
					</animated.div>
				))}
			</div>
		</div>
	);
};

const Project = ({ hitFlag }, ref) => {
	const { t } = useTranslation();
	const [{ projectList }, { fetchProjects }] = useProject();

	useEffect(() => {
		fetchProjects();
	}, []);

	return (
		<div ref={ref} className={styles.wrapper}>
			<div className={styles.container}>
				<Section
					start={hitFlag === 'project'}
					data={projectList
						.filter(({ type: projectType }) => projectType === 'student')
						.sort((a, b) => parseInt(a.weight, 10) - parseInt(b.weight, 10))}
					sectionTitle={t('project.student-project-title')}
					subTitle={t('project.student-project-subtitle')}
				/>
				<Section
					start={hitFlag === 'project'}
					data={projectList
						.filter(({ type: projectType }) => projectType === 'work')
						.sort((a, b) => parseInt(a.weight, 10) - parseInt(b.weight, 10))}
					sectionTitle={t('project.work-project-title')}
					subTitle={t('project.work-project-subtitle')}
				/>
				<Section
					last
					start={hitFlag === 'project'}
					data={projectList
						.filter(({ type: projectType }) => projectType === 'side')
						.sort((a, b) => parseInt(a.weight, 10) - parseInt(b.weight, 10))}
					sectionTitle={t('project.side-project-title')}
					subTitle={t('project.side-project-subtitle')}
				/>
			</div>
			<ProjectInnerModal />
		</div>
	);
};

export default forwardRef(Project);
