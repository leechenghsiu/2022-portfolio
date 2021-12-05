import React, { Suspense } from 'react';

import { useScrollDirection } from 'utils/hook/event';

import Header from 'components/organisms/Header';
import BackstageHeader from 'components/organisms/BackstageHeader';

import styles from './styles.module.scss';

const App = ({ children }) => {
	const scrollDirection = useScrollDirection();

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<div className={styles.wrapper}>
				{window.location.pathname.startsWith('/backstage') ? (
					<BackstageHeader />
				) : (
					<Header open={scrollDirection === 'up'} />
				)}
				{children}
			</div>
		</Suspense>
	);
};

export default App;
