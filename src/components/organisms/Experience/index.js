import React, { useEffect } from 'react';
import classnames from 'classnames';
import { useTransition, useSpringRef, animated } from 'react-spring';
import dayjs from 'dayjs';

import { useMedia } from 'utils/hook/useMedia';

import { useExperience } from 'models/experience';

import SectionTitle from 'components/atoms/SectionTitle';
import ExperienceItem from 'components/molecules/ExperienceItem';

import styles from './styles.module.scss';

const Section = ({ start, data, sectionTitle, last = false }) => {
	const media = useMedia();
	const transRef = useSpringRef();
	const transitions = useTransition(data, {
		ref: media === 'desktop' ? transRef : null,
		trail: 250,
		from: { opacity: 0 },
		enter: { opacity: 1 },
	});

	useEffect(() => {
		if (start) transRef.start();
	}, [start]);

	return (
		<div className={classnames(styles.experience, last && styles.last)}>
			<h3>{sectionTitle}</h3>
			<div className={styles.content} style={{ minHeight: 48 * data.length }}>
				{transitions((style, experience) => (
					<animated.div style={style}>
						<ExperienceItem
							key={experience.id}
							title={experience.title}
							department={experience.department}
							role={experience.role}
							startAt={
								experience.startAt ? dayjs(experience.startAt.toDate()).format('YYYY.MM') : ''
							}
							endAt={experience.endAt ? dayjs(experience.endAt.toDate()).format('YYYY.MM') : ''}
							description={experience.description}
							thumbnail={experience.thumbnail}
						/>
					</animated.div>
				))}
			</div>
		</div>
	);
};

const Experience = ({ hitFlag }) => {
	const [{ experienceList }, { fetchExperiences }] = useExperience();

	useEffect(() => {
		fetchExperiences();
	}, []);

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<SectionTitle className={styles.sectionTitle} title="Experiences">
					<p>
						UX/UI designer who loves her job and helps design industry development in Kazakhstan
					</p>
				</SectionTitle>
				<Section
					start={hitFlag === 'experience'}
					data={experienceList
						.filter(({ type: experienceType }) => experienceType === 'education')
						.sort((a, b) => a.weight - b.weight)}
					sectionTitle="Education"
				/>
				<Section
					start={hitFlag === 'experience'}
					data={experienceList
						.filter(({ type: experienceType }) => experienceType === 'job')
						.sort((a, b) => a.weight - b.weight)}
					sectionTitle="Work Experiences"
				/>
				<Section
					last
					start={hitFlag === 'experience'}
					data={experienceList
						.filter(({ type: experienceType }) => experienceType === 'activity')
						.sort((a, b) => a.weight - b.weight)}
					sectionTitle="Activities"
				/>
			</div>
		</div>
	);
};

export default Experience;
