import React, { Suspense, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import classnames from 'classnames';

import { useScrollDirection } from 'utils/hook/event';
import { useMedia } from 'utils/hook/useMedia';

import { useAuth } from 'models/auth';

import Header from 'components/organisms/Header';
import BackstageHeader from 'components/organisms/BackstageHeader';

import styles from './styles.module.scss';

const App = ({ user, children }) => {
	const { pathname } = useLocation();
	const scrollDirection = useScrollDirection();
	const media = useMedia();
	const [, { setLogin }] = useAuth();
	const isBackstage = pathname.startsWith('/backstage');

	useEffect(() => {
		if (user) {
			setLogin();
		}
	}, [user]);

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<div className={classnames(styles.wrapper, isBackstage && styles.isBackstage)}>
				{isBackstage ? (
					<BackstageHeader />
				) : (
					<Header open={scrollDirection === 'up' || media === 'phone'} />
				)}
				{children}
			</div>
		</Suspense>
	);
};

export default App;
