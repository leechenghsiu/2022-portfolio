import { createAction, handleActions } from 'redux-actions';
import { query, getDocs, getDoc, updateDoc } from 'firebase/firestore/lite';

import { projectRef } from 'services/firebase';

import { useRedux } from 'utils/hook/redux';

const fetchProjects = createAction('FETCH_PROJECTS', () => async () => {
	const querySnapshot = await getDocs(query(projectRef()));
	const result = [];
	querySnapshot.forEach(doc => result.push({ ...doc.data(), id: doc.id }));
	return result;
});

const fetchTargetProject = createAction('FETCH_TARGET_PROJECT', id => async () => {
	const querySnapshot = await getDoc(query(projectRef(id)));
	return { ...querySnapshot.data(), id: querySnapshot.id };
});

const setTargetProject = createAction('SET_TARGET_PROJECT', data => data);

const updateProject = createAction('UPDATE_PROJECT', (id, data, cb) => async () => {
	await updateDoc(projectRef(id), data);
	if (cb) cb();
});

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

			FETCH_TARGET_PROJECT_FULFILLED: (state, action) => ({
				...state,

				targetProject: action.payload,
			}),

			SET_TARGET_PROJECT: (state, action) => ({
				...state,

				targetProject: action.payload,
			}),

			UPDATE_PROJECT_FULFILLED: state => ({
				...state,

				targetProject: defaultTargetProjectData,
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
		fetchTargetProject,
		setTargetProject,
		updateProject,
	});

export default { reducer };
