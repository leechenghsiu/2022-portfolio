import React, { Suspense, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import classnames from 'classnames';
import Alert from '@mui/material/Alert';

import { useScrollDirection } from 'utils/hook/event';
import { useMedia } from 'utils/hook/useMedia';

import { useAuth } from 'models/auth';

import routePath from 'constants/path';

import Header from 'components/organisms/Header';
import BackstageHeader from 'components/organisms/BackstageHeader';

import styles from './styles.module.scss';

const App = ({ user, children }) => {
	const { pathname } = useLocation();
	const scrollDirection = useScrollDirection();
	const media = useMedia();
	const [{ isAdmin }, { setLogin, setAdmin }] = useAuth();
	const isBackstage = pathname.startsWith('/backstage');

	useEffect(() => {
		if (user) {
			setLogin();

			if (user.email === 'matthew6303@gmail.com') {
				setAdmin();
			}
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
				{isBackstage && pathname !== routePath.backstageLogin && !isAdmin && (
					<Alert className={styles.alert} variant="standard" severity="info">
						<span>You&apos;re in preview mode</span>
					</Alert>
				)}
			</div>
		</Suspense>
	);
};

export default App;
