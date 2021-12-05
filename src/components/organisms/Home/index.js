import React from 'react';

// import { useScroll } from 'utils/hook/event';

import styles from './styles.module.scss';

const Home = () => {
	// const { scrollY } = useScroll();
	const a = 1;

	return (
		<div className={styles.wrapper}>
			<div className={styles.intro}>
				<h1>Matthew Lee</h1>
				<p>With great passion in front-end develop, also, UI/UX design is interested in.</p>
				<p>Currently, I&apos;m continuously learning more techniques of front-end development.</p>
			</div>
		</div>
	);
};

export default Home;
