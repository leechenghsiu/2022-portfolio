import React from 'react';
import { useHistory } from 'react-router-dom';
import { EmailAuthProvider } from 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import { auth } from 'services/firebaseAuth';

import styles from './styles.module.scss';

export const LoginPage = () => {
	const { push } = useHistory();
	const uiConfig = {
		signInFlow: 'redirect',
		signInOptions: [EmailAuthProvider.PROVIDER_ID],
		signInSuccessUrl: window.location.href.replace('/login', ''),
		callbacks: {
			signInSuccessWithAuthResult: (_, redirectUrl) => {
				push(redirectUrl);
				return true;
			},
		},
	};

	return (
		<div className={styles.wrapper}>
			<StyledFirebaseAuth className={styles.authModal} uiConfig={uiConfig} firebaseAuth={auth} />
		</div>
	);
};
