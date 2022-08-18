import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import { useIntro } from 'models/intro';

import i18n from 'utils/i18n';

import SectionTitle from 'components/atoms/SectionTitle';
import ProgressBar from 'components/atoms/ProgressBar';

import SafariBg from 'images/background/bg-safari.png';
import SliderShowBgSm from 'images/background/bg-slider-show-sm.png';
import SliderShowBgLg from 'images/background/bg-slider-show-lg.png';

import styles from './styles.module.scss';

const Intro = ({ hitFlag }) => {
	const { t } = useTranslation();
	const [{ introList }, { fetchIntros }] = useIntro();
	const [selectedItem, setSelectedItem] = useState(0);
	const weightedIntroList =
		introList.length > 0 &&
		introList.sort((a, b) => parseInt(a.weight, 10) - parseInt(b.weight, 10));

	useEffect(() => {
		fetchIntros();
	}, []);

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
				{weightedIntroList.length > 0 && (
					<div className={styles.slider} style={{ backgroundImage: `url(${SafariBg})` }}>
						<div className={styles.sliderContainer}>
							<div className={styles.sideBar}>
								{weightedIntroList.map(({ imageUrl, id }, idx) => (
									<div
										key={id}
										className={classnames(
											styles.sideBarItem,
											selectedItem === idx && styles.selectedSideBarItem,
										)}
										style={{ backgroundImage: `url(${SliderShowBgSm})` }}
										role="presentation"
										onClick={() => selectedItem !== idx && setSelectedItem(idx)}
									>
										<div>
											<img src={imageUrl} alt="" />
										</div>
									</div>
								))}
							</div>
							<div className={styles.content}>
								<div
									className={styles.contentContainer}
									style={{ backgroundImage: `url(${SliderShowBgLg})` }}
								>
									<div className={styles.currentSlide}>
										<div className={styles.progressBarWrapper}>
											{weightedIntroList.map(({ imageUrl }, _idx) => (
												<ProgressBar
													key={imageUrl}
													status={selectedItem - _idx}
													goNext={() => {
														setSelectedItem(_idx === introList.length - 1 ? 0 : _idx + 1);
													}}
												/>
											))}
										</div>
										<img src={weightedIntroList[selectedItem].imageUrl} alt="" />
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Intro;
