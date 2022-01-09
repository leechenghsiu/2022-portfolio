import { createAction, handleActions } from 'redux-actions';
import { query, getDocs } from 'firebase/firestore/lite';

import { projectRef } from 'services/firebase';

import { useRedux } from 'utils/hook/redux';

const fetchProjects = createAction('FETCH_PROJECTS', () => async () => {
	const querySnapshot = await getDocs(query(projectRef));
	const result = [];
	querySnapshot.forEach(doc => result.push({ ...doc.data(), id: doc.id }));
	return result;
});

const setTargetProject = createAction('SET_TARGET_PROJECT', data => data);

export const defaultTargetProjectData = {
	id: '',
	tag: [],
	thumbnail: '',
	title: '',
	type: '',
	video: '',
	weight: 0,
};

const reducer = {
	project: handleActions(
		{
			FETCH_PROJECTS_FULFILLED: (state, action) => ({
				...state,

				projectList: action.payload,
			}),

			SET_TARGET_PROJECT: (state, action) => ({
				...state,

				targetProject: action.payload,
			}),
		},
		{
			projectList: [],
			targetProject: defaultTargetProjectData,
		},
	),
};

const selectProject = state => state.project;

export const useProject = () =>
	useRedux(selectProject, {
		fetchProjects,
		setTargetProject,
	});

export default { reducer };
