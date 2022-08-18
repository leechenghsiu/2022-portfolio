import { createAction, handleActions } from 'redux-actions';
import { query, getDocs } from 'firebase/firestore/lite';

import { introCollectionRef } from 'services/firebase';

import { useRedux } from 'utils/hook/redux';

const fetchIntros = createAction('FETCH_INTROS', () => async () => {
	const querySnapshot = await getDocs(query(introCollectionRef()));
	const result = [];
	querySnapshot.forEach(doc => result.push({ ...doc.data(), id: doc.id }));
	return result;
});

const reducer = {
	intro: handleActions(
		{
			FETCH_INTROS_FULFILLED: (state, action) => ({
				...state,

				introList: action.payload,
			}),
		},
		{
			introList: [],
		},
	),
};

const selectIntro = state => state.intro;

export const useIntro = () =>
	useRedux(selectIntro, {
		fetchIntros,
	});

export default { reducer };
