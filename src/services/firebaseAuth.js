import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

import firebaseApp from './firebase';

export const auth = getAuth(firebaseApp);

export const authMethods = {
	signIn: async ({ email, password }) => {
		try {
			await signInWithEmailAndPassword(auth, email, password)
				.then(userCredential => {
					const { user } = userCredential;
					console.log('login success', user);
				})
				.catch(error => {
					console.error(error);
				});
		} catch (error) {
			console.error(error);
		}
	},
	signOut: async cb => {
		try {
			await signOut(auth)
				.then(() => {
					console.log('logout success');
					if (typeof cb === 'function') cb();
				})
				.catch(error => {
					console.error(error);
				});
		} catch (error) {
			console.error(error);
		}
	},
};
