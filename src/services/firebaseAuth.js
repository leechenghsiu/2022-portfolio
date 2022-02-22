import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

import firebaseApp from './firebase';

export const auth = getAuth(firebaseApp);

export const authMethods = {
	signIn: ({ email, password }) =>
		new Promise((resolve, reject) => {
			signInWithEmailAndPassword(auth, email, password)
				.then(userCredential => {
					const { user } = userCredential;
					resolve(user);
				})
				.catch(error => {
					reject(error);
				});
		}),
	signOut: () =>
		new Promise((resolve, reject) => {
			signOut(auth)
				.then(() => resolve('logout success'))
				.catch(error => reject(error));
		}),
};
