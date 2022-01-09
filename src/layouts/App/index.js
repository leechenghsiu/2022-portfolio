import React, { Suspense, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useScrollDirection } from 'utils/hook/event';

import { useAuth } from 'models/auth';

import Header from 'components/organisms/Header';
import BackstageHeader from 'components/organisms/BackstageHeader';

import styles from './styles.module.scss';

const App = ({ user, children }) => {
	const { pathname } = useLocation();
	const scrollDirection = useScrollDirection();
	const [, { setLogin, setLogout }] = useAuth();

	useEffect(() => {
		if (user) {
			setLogin();
		}
	}, [user]);

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<div className={styles.wrapper}>
				{pathname.startsWith('/backstage') ? (
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
