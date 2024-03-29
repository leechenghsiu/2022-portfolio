import React, { useEffect, forwardRef } from 'react';
import classnames from 'classnames';
import { useTransition, useSpringRef, animated } from 'react-spring';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import i18n from 'utils/i18n';
import { useMedia } from 'utils/hook/useMedia';

import { useExperience } from 'models/experience';

import SectionTitle from 'components/atoms/SectionTitle';
import ExperienceItem from 'components/molecules/ExperienceItem';

import styles from './styles.module.scss';

const Section = ({ start, data, sectionTitle, last = false }) => {
	const { t } = useTranslation();
	const media = useMedia();
	const transRef = useSpringRef();
	const transitions = useTransition(data, {
		ref: media === 'desktop' ? transRef : null,
		trail: 250,
		from: { opacity: 0 },
		enter: { opacity: 1 },
	});
	const ing = exp => {
		if (exp.endAt.seconds !== exp.startAt.seconds) {
			return dayjs(exp.endAt.toDate()).format('YYYY.MM');
		}
		return t('experience.ing');
	};

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
							title={i18n.language === 'en' ? experience.title : experience.titleZh}
							department={i18n.language === 'en' ? experience.department : experience.departmentZh}
							role={i18n.language === 'en' ? experience.role : experience.roleZh}
							startAt={
								experience.startAt ? dayjs(experience.startAt.toDate()).format('YYYY.MM') : ''
							}
							endAt={ing(experience)}
							description={
								i18n.language === 'en' ? experience.description : experience.descriptionZh
							}
							thumbnail={experience.thumbnail}
						/>
					</animated.div>
				))}
			</div>
		</div>
	);
};

const Experience = ({ hitFlag }, ref) => {
	const { t } = useTranslation();
	const [{ experienceList }, { fetchExperiences }] = useExperience();
	const filteredExperienceList = experienceList.filter(({ status }) => status === 'visible');

	useEffect(() => {
		fetchExperiences();
	}, []);

	return (
		<div ref={ref} className={styles.wrapper}>
			<div className={styles.container}>
				<SectionTitle className={styles.sectionTitle} title={t('experience.experience-title')}>
					<p>{t('experience.experience-subtitle')}</p>
				</SectionTitle>
				<Section
					start={hitFlag === 'experience'}
					data={filteredExperienceList
						.filter(({ type: experienceType }) => experienceType === 'education')
						.sort((a, b) => parseInt(a.weight, 10) - parseInt(b.weight, 10))}
					sectionTitle={t('experience.education-title')}
				/>
				<Section
					start={hitFlag === 'experience'}
					data={filteredExperienceList
						.filter(({ type: experienceType }) => experienceType === 'job')
						.sort((a, b) => parseInt(a.weight, 10) - parseInt(b.weight, 10))}
					sectionTitle={t('experience.work-experience-title')}
				/>
				<Section
					last
					start={hitFlag === 'experience'}
					data={filteredExperienceList
						.filter(({ type: experienceType }) => experienceType === 'activity')
						.sort((a, b) => parseInt(a.weight, 10) - parseInt(b.weight, 10))}
					sectionTitle={t('experience.activity-title')}
				/>
			</div>
		</div>
	);
};

export default forwardRef(Experience);
