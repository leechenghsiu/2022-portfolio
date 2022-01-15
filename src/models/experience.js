import { createAction, handleActions } from 'redux-actions';
import {
	query,
	getDocs,
	getDoc,
	updateDoc,
	addDoc,
	deleteDoc,
	Timestamp,
} from 'firebase/firestore/lite';
import dayjs from 'dayjs';

import { experienceDocRef, experienceCollectionRef } from 'services/firebase';

import { useRedux } from 'utils/hook/redux';

const fetchExperiences = createAction('FETCH_EXPERIENCES', () => async () => {
	const querySnapshot = await getDocs(query(experienceCollectionRef()));
	const result = [];
	querySnapshot.forEach(doc => result.push({ ...doc.data(), id: doc.id }));
	return result;
});

const fetchTargetExperience = createAction('FETCH_TARGET_EXPERIENCE', id => async () => {
	const querySnapshot = await getDoc(query(experienceDocRef(id)));
	return { ...querySnapshot.data(), id: querySnapshot.id };
});

const setTargetExperience = createAction('SET_TARGET_EXPERIENCE', data => data);

const updateExperience = createAction('UPDATE_EXPERIENCE', (id, data, cb) => async () => {
	const _data = {
		...data,
		startAt: Timestamp.fromDate(dayjs(data.startAt, 'YYYY/MM/DD').toDate()),
		endAt: Timestamp.fromDate(dayjs(data.endAt, 'YYYY/MM/DD').toDate()),
	};
	await updateDoc(experienceDocRef(id), _data);
	if (cb) cb();
});

const createExperience = createAction('CREATE_EXPERIENCE', (data, cb) => async () => {
	const _data = {
		...data,
		startAt: Timestamp.fromDate(dayjs(data.startAt, 'YYYY/MM/DD').toDate()),
		endAt: Timestamp.fromDate(dayjs(data.endAt, 'YYYY/MM/DD').toDate()),
	};
	await addDoc(experienceCollectionRef(), _data);
	if (cb) cb();
});

const deleteExperience = createAction('DELETE_EXPERIENCE', id => async dispatch => {
	await deleteDoc(experienceDocRef(id));
	dispatch(fetchExperiences());
});

export const defaultTargetExperienceData = {
	id: '',
	thumbnail: '',
	title: '',
	titleZh: '',
	department: '',
	departmentZh: '',
	role: '',
	roleZh: '',
	description: '',
	descriptionZh: '',
	type: '',
	startAt: '',
	endAt: '',
	weight: 0,
};

const reducer = {
	experience: handleActions(
		{
			FETCH_EXPERIENCES_FULFILLED: (state, action) => ({
				...state,

				experienceList: action.payload,
			}),

			FETCH_TARGET_EXPERIENCE_FULFILLED: (state, action) => ({
				...state,

				targetExperience: action.payload,
			}),

			SET_TARGET_EXPERIENCE: (state, action) => ({
				...state,

				targetExperience: action.payload,
			}),

			UPDATE_EXPERIENCE_FULFILLED: state => ({
				...state,

				targetExperience: defaultTargetExperienceData,
			}),

			CREATE_EXPERIENCE_FULFILLED: state => ({
				...state,

				targetExperience: defaultTargetExperienceData,
			}),
		},
		{
			experienceList: [],
			targetExperience: defaultTargetExperienceData,
		},
	),
};

const selectExperience = state => state.experience;

export const useExperience = () =>
	useRedux(selectExperience, {
		fetchExperiences,
		fetchTargetExperience,
		setTargetExperience,
		updateExperience,
		createExperience,
		deleteExperience,
	});

export default { reducer };
