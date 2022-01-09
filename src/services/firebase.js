import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore/lite';
import { getStorage, getDownloadURL, ref } from 'firebase/storage';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: 'portfolio-1e0e6.firebaseapp.com',
	projectId: 'portfolio-1e0e6',
	storageBucket: 'portfolio-1e0e6.appspot.com',
	messagingSenderId: '822529002259',
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
	measurementId: 'G-M62487BL6L',
};

const firebaseApp = initializeApp(firebaseConfig);

// Firestore
const db = getFirestore(firebaseApp);
export const projectRef = collection(db, 'project');

// Firebase Storage
const storage = getStorage(firebaseApp);
export const storageRef = path => getDownloadURL(ref(storage, path));

export default firebaseApp;
