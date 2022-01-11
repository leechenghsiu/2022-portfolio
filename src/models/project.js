import { createAction, handleActions } from 'redux-actions';
import { query, getDocs, getDoc, updateDoc, addDoc, deleteDoc } from 'firebase/firestore/lite';

import { projectDocRef, projectCollectionRef } from 'services/firebase';

import { useRedux } from 'utils/hook/redux';

const fetchProjects = createAction('FETCH_PROJECTS', () => async () => {
	const querySnapshot = await getDocs(query(projectCollectionRef()));
	const result = [];
	querySnapshot.forEach(doc => result.push({ ...doc.data(), id: doc.id }));
	return result;
});

const fetchTargetProject = createAction('FETCH_TARGET_PROJECT', id => async () => {
	const querySnapshot = await getDoc(query(projectDocRef(id)));
	return { ...querySnapshot.data(), id: querySnapshot.id };
});

const setTargetProject = createAction('SET_TARGET_PROJECT', data => data);

const updateProject = createAction('UPDATE_PROJECT', (id, data, cb) => async () => {
	await updateDoc(projectDocRef(id), data);
	if (cb) cb();
});

const createProject = createAction('CREATE_PROJECT', (data, cb) => async () => {
	await addDoc(projectCollectionRef(), data);
	if (cb) cb();
});

const deleteProject = createAction('DELETE_PROJECT', id => async dispatch => {
	await deleteDoc(projectDocRef(id));
	dispatch(fetchProjects());
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

			CREATE_PROJECT_FULFILLED: state => ({
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
		createProject,
		deleteProject,
	});

export default { reducer };
