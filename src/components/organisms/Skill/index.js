import React, { useEffect, useState, forwardRef } from 'react';
import classnames from 'classnames';
import { use100vh } from 'react-div-100vh';

import { useSkill } from 'models/skill';

import i18n from 'utils/i18n';
import { useMedia } from 'utils/hook/useMedia';

import FilledText from 'components/atoms/FilledText';

import styles from './styles.module.scss';

const Skill = ({ hitFlag }, ref) => {
	const height = use100vh();
	const media = useMedia();
	const [active, setActive] = useState(false);
	const [{ skillList }, { fetchSkills }] = useSkill();
	const filteredSkillList = skillList.filter(({ status }) => status === 'visible');

	useEffect(() => {
		fetchSkills();
	}, []);

	useEffect(() => {
		if (!active && hitFlag === 'skills') setActive(true);
	}, [hitFlag]);

	return (
		<div ref={ref} className={styles.wrapper}>
			<div
				className={classnames(styles.container, hitFlag === 'skills' && styles.fixed)}
				style={{ height: media === 'desktop' ? 0.7 * height : 'auto' }}
			>
				<div className={styles.content}>
					{filteredSkillList
						.sort((a, b) => parseInt(a.weight, 10) - parseInt(b.weight, 10))
						.map(({ title, titleZh, description, descriptionZh, percentage }) => (
							<FilledText
								key={i18n.language === 'en' ? title : titleZh}
								targetPercentage={parseFloat(percentage, 10)}
								start={active}
								title={i18n.language === 'en' ? title : titleZh}
								filledText={i18n.language === 'en' ? description : descriptionZh}
							/>
						))}
				</div>
			</div>
		</div>
	);
};

export default forwardRef(Skill);
