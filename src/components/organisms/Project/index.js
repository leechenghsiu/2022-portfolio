import React from 'react';

import { useModal } from 'models/modal';

import SectionTitle from 'components/atoms/SectionTitle';
import ProjectCard from 'components/molecules/ProjectCard';
import Modal from 'components/molecules/Modal';

import styles from './styles.module.scss';

const studentProjectsData = [
	{ title: 'Ghowa', _id: 1 },
	{ title: '無食無課', _id: 2 },
];

const workProjectsData = [
	{ title: 'O2O 教育平台', _id: 1 },
	{ title: 'BeanBon', _id: 2 },
	{ title: 'Vespa官方商城 | Vespa台灣', _id: 3 },
	{ title: '無限廚房', _id: 4 },
	{ title: 'VR Lounge', _id: 5 },
	{ title: '大誠保險經紀人', _id: 6 },
	{ title: 'machi machi Reporting Page', _id: 7 },
];

const sideProjectsData = [
	{ title: 'Fitness', _id: 1 },
	{ title: '農糧作物生產區域發展', _id: 2 },
];

const Project = ({ hitFlag }) => {
	const active = hitFlag === 'project';
	const [{ type }, { openModal, closeModal }] = useModal();

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<div className={styles.project}>
					<SectionTitle className={styles.sectionTitle} title="Student Projects">
						<p>
							UX/UI designer who loves her job and helps design industry development in Kazakhstan
						</p>
						<p>by all means SCROLL EFFECT!!!</p>
					</SectionTitle>
					<div className={styles.content}>
						{studentProjectsData.map(({ title }) => (
							<ProjectCard
								key={title}
								title={title}
								onClick={() => openModal({ type: 'project' })}
							/>
						))}
					</div>
				</div>
				<div className={styles.project}>
					<SectionTitle className={styles.sectionTitle} title="Work Projects">
						<p>
							UX/UI designer who loves her job and helps design industry development in Kazakhstan
						</p>
						<p>by all means SCROLL EFFECT!!!</p>
					</SectionTitle>
					<div className={styles.content}>
						{workProjectsData.map(({ title }) => (
							<ProjectCard
								key={title}
								title={title}
								onClick={() => openModal({ type: 'project' })}
							/>
						))}
					</div>
				</div>
				<div className={styles.project}>
					<SectionTitle className={styles.sectionTitle} title="Side Projects">
						<p>
							UX/UI designer who loves her job and helps design industry development in Kazakhstan
						</p>
						<p>by all means SCROLL EFFECT!!!</p>
					</SectionTitle>
					<div className={styles.content}>
						{sideProjectsData.map(({ title }) => (
							<ProjectCard
								key={title}
								title={title}
								onClick={() => openModal({ type: 'project' })}
							/>
						))}
					</div>
				</div>
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
