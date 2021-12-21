import React from 'react';
import classnames from 'classnames';
import { use100vh } from 'react-div-100vh';

import FilledText from 'components/atoms/FilledText';

import styles from './styles.module.scss';

const Skill = ({ hitFlag }) => {
	const height = use100vh();
	const active = hitFlag === 'skills';

	return (
		<div className={styles.wrapper}>
			<div
				className={classnames(styles.container, active && styles.fixed)}
				style={{ height: 0.7 * height }}
			>
				<div className={styles.content}>
					<FilledText
						targetProgress={1}
						start={active}
						title="React JS"
						filledText="Familiar with developing web front-end from 0 to 1 by using React, including Data Management Library such as Redux, Redux Saga, etc."
					/>
					<FilledText
						targetProgress={0.9}
						start={active}
						title="HTML/CSS"
						filledText="From simple interactive animation to complicated metadata tags for SEO."
					/>
					<FilledText
						targetProgress={0.8}
						start={active}
						title="JavaScript"
						filledText="Interested in following the latest version of ECMAScript, and understanding the differences between JavaScript and the other programming languages."
					/>
					<FilledText
						targetProgress={0.7}
						start={active}
						title="React Native"
						filledText="Be able to create simple cross-platform applications, and understand publish policies of both platforms."
					/>
					<FilledText
						targetProgress={0.5}
						start={active}
						title="TypeScript"
						filledText="Due to its strongly-typed feature, making me form a habit of carefulness when manipulating data."
					/>
					<FilledText
						targetProgress={0.5}
						start={active}
						title="UI & UX"
						filledText="Matters aesthetic a lot when developing websites, and cares about layout, flow, structure, experience in both code and user interface."
					/>
					<FilledText
						targetProgress={0.4}
						start={active}
						title="Project Management"
						filledText="Having experience working directly with clients, by the same time, managing project milestones under clients' expectations."
					/>
					<FilledText
						targetProgress={0.3}
						start={active}
						title="Media Editing"
						filledText="Basic photo, video editing skills, also, interested in photography."
					/>
				</div>
			</div>
		</div>
	);
};

export default Skill;
