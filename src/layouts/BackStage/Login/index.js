import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
// import { EmailAuthProvider } from 'firebase/auth';
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import { authMethods } from 'services/firebaseAuth';

import routePath from 'constants/path';

import BackstageSectionTitle from 'components/atoms/BackstageSectionTitle';
import Button from 'components/atoms/Button';

import styles from './styles.module.scss';

export const LoginPage = () => {
	const { push } = useHistory();
	const [form, setForm] = useState({ email: '', password: '' });
	const onChange = e => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};
	const onLogin = () => {
		authMethods.signIn(form, () => push(routePath.backstageSkill));
	};

	// const uiConfig = {
	// 	signInFlow: 'redirect',
	// 	signInOptions: [EmailAuthProvider.PROVIDER_ID],
	// 	signInSuccessUrl: window.location.href.replace('/login', ''),
	// 	callbacks: {
	// 		signInSuccessWithAuthResult: (_, redirectUrl) => {
	// 			push(redirectUrl);
	// 			return true;
	// 		},
	// 	},
	// };

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<BackstageSectionTitle title="Login" />
				<div className={styles.loginForm}>
					<FormControl variant="standard" sx={{ mb: 3 }}>
						<TextField
							label="Email"
							name="email"
							variant="standard"
							value={form.email}
							onChange={onChange}
						/>
						<FormHelperText>Please enter your email</FormHelperText>
					</FormControl>
					<FormControl variant="standard" sx={{ mb: 3 }}>
						<TextField
							label="Password"
							name="password"
							variant="standard"
							value={form.password}
							onChange={onChange}
							type="password"
						/>
						<FormHelperText>Please enter your password</FormHelperText>
					</FormControl>
					<Button className={styles.uploadButton} variant="normal" size="large" onClick={onLogin}>
						Login
					</Button>
				</div>
				{/* <StyledFirebaseAuth className={styles.authModal} uiConfig={uiConfig} firebaseAuth={auth} /> */}
			</div>
		</div>
	);
};
