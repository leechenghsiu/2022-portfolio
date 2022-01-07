import { createAction, handleActions } from 'redux-actions';
import { query, getDocs } from 'firebase/firestore/lite';

import { projectRef } from 'services/firebase';

import { useRedux } from 'utils/hook/redux';

export const fetchProjects = createAction('FETCH_PROJECTS', () => async () => {
	const querySnapshot = await getDocs(query(projectRef));
	const result = [];
	querySnapshot.forEach(doc => result.push({ ...doc.data(), id: doc.id }));
	return result;
});

const reducer = {
	project: handleActions(
		{
			FETCH_PROJECTS_FULFILLED: (state, action) => ({
				...state,

				projectList: action.payload,
			}),
		},
		{
			projectList: [],
		},
	),
};

const selectProject = state => state.project;

export const useProject = () =>
	useRedux(selectProject, {
		fetchProjects,
	});

export default { reducer };
