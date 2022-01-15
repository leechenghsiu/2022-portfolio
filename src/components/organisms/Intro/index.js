import React from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import i18n from 'utils/i18n';

import SectionTitle from 'components/atoms/SectionTitle';

import styles from './styles.module.scss';

const Intro = ({ hitFlag }) => {
	const { t } = useTranslation();

	return (
		<div className={styles.wrapper}>
			<div className={classnames(styles.intro, hitFlag === 'intro' && styles.fixed)}>
				<SectionTitle className={styles.sectionTitle} title={t('intro.title')}>
					<p>
						{t('intro.subtitle-1')}
						{i18n.language === 'en' && <br />}
						{t('intro.subtitle-2')}
					</p>
				</SectionTitle>
			</div>
		</div>
	);
};

export default Intro;
