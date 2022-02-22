import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Slide from '@mui/material/Slide';
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
	const [alertIn, setAlertIn] = useState(false);
	const [loading, setLoading] = useState(false);
	const onChange = e => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};
	const onLogin = async () => {
		setLoading(true);
		await authMethods
			.signIn(form)
			.then(user => {
				console.log('login success', user);
				push(routePath.backstageSkill);
			})
			.catch(err => console.error(err));
		setLoading(false);
	};

	useEffect(() => {
		setTimeout(() => {
			setAlertIn(true);
		}, 1000);
	}, []);

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
			<Slide direction="down" in={alertIn} mountOnEnter unmountOnExit>
				<Alert className={styles.alert} variant="standard" severity="info">
					Try login with the below account
					<br />
					Email:&nbsp;
					<span>demo@gmail.com</span>
					<br />
					Password:&nbsp;
					<span>demo2022</span>
				</Alert>
			</Slide>
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
							onKeyPress={e => {
								if (e.key === 'Enter' && form.email && form.password) {
									onLogin();
								}
							}}
						/>
						<FormHelperText>Please enter your password</FormHelperText>
					</FormControl>
					<Button className={styles.uploadButton} variant="normal" size="large" onClick={onLogin}>
						{loading ? <CircularProgress color="inherit" size={24} /> : 'Login'}
					</Button>
				</div>
				{/* <StyledFirebaseAuth className={styles.authModal} uiConfig={uiConfig} firebaseAuth={auth} /> */}
			</div>
		</div>
	);
};
