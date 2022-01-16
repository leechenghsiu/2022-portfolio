import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc } from 'firebase/firestore/lite';
import { getStorage, getDownloadURL, uploadBytesResumable, ref } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

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
export const skillDocRef = id => (id ? doc(db, 'skill', id) : doc(db, 'skill'));
export const skillCollectionRef = () => collection(db, 'skill');
export const projectDocRef = id => (id ? doc(db, 'project', id) : doc(db, 'project'));
export const projectCollectionRef = () => collection(db, 'project');
export const experienceDocRef = id => (id ? doc(db, 'experience', id) : doc(db, 'experience'));
export const experienceCollectionRef = () => collection(db, 'experience');

// Firebase Storage
const storage = getStorage(firebaseApp);
export const storageRef = path => getDownloadURL(ref(storage, path));
export const uploadRef = (path, file) => uploadBytesResumable(ref(storage, path), file);

// Google Analytics
export const analytics = getAnalytics();

export default firebaseApp;
