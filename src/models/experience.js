import { createAction, handleActions } from 'redux-actions';
import { query, getDocs } from 'firebase/firestore/lite';

import { experienceCollectionRef } from 'services/firebase';

import { useRedux } from 'utils/hook/redux';

const fetchExperiences = createAction('FETCH_EXPERIENCES', () => async () => {
	const querySnapshot = await getDocs(query(experienceCollectionRef()));
	const result = [];
	querySnapshot.forEach(doc => result.push({ ...doc.data(), id: doc.id }));
	return result;
});

const reducer = {
	experience: handleActions(
		{
			FETCH_EXPERIENCES_FULFILLED: (state, action) => ({
				...state,

				experienceList: action.payload,
			}),
		},
		{
			experienceList: [],
		},
	),
};

const selectExperience = state => state.experience;

export const useExperience = () =>
	useRedux(selectExperience, {
		fetchExperiences,
	});

export default { reducer };
