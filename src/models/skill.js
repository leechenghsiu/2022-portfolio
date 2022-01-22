import { createAction, handleActions } from 'redux-actions';
import { query, getDocs, getDoc, updateDoc, addDoc, deleteDoc } from 'firebase/firestore/lite';

import { skillDocRef, skillCollectionRef } from 'services/firebase';

import { useRedux } from 'utils/hook/redux';

const fetchSkills = createAction('FETCH_SKILLS', () => async () => {
	const querySnapshot = await getDocs(query(skillCollectionRef()));
	const result = [];
	querySnapshot.forEach(doc => result.push({ ...doc.data(), id: doc.id }));
	return result;
});

const fetchTargetSkill = createAction('FETCH_TARGET_SKILL', id => async () => {
	const querySnapshot = await getDoc(query(skillDocRef(id)));
	return { ...querySnapshot.data(), id: querySnapshot.id };
});

const setTargetSkill = createAction('SET_TARGET_SKILL', data => data);

const updateSkill = createAction('UPDATE_SKILL', (id, data, cb) => async () => {
	await updateDoc(skillDocRef(id), data);
	if (cb) cb();
});

const createSkill = createAction('CREATE_SKILL', (data, cb) => async () => {
	await addDoc(skillCollectionRef(), data);
	if (cb) cb();
});

const deleteSkill = createAction('DELETE_SKILL', id => async dispatch => {
	await deleteDoc(skillDocRef(id));
	dispatch(fetchSkills());
});

export const defaultTargetSkillData = {
	id: '',
	title: '',
	titleZh: '',
	description: '',
	descriptionZh: '',
	percentage: 0,
	weight: 0,
	status: '',
};

const reducer = {
	skill: handleActions(
		{
			FETCH_SKILLS_FULFILLED: (state, action) => ({
				...state,

				skillList: action.payload,
			}),

			FETCH_TARGET_SKILL_FULFILLED: (state, action) => ({
				...state,

				targetSkill: action.payload,
			}),

			SET_TARGET_SKILL: (state, action) => ({
				...state,

				targetSkill: action.payload,
			}),

			UPDATE_SKILL_FULFILLED: state => ({
				...state,

				targetSkill: defaultTargetSkillData,
			}),

			CREATE_SKILL_FULFILLED: state => ({
				...state,

				targetSkill: defaultTargetSkillData,
			}),
		},
		{
			skillList: [],
			targetSkill: defaultTargetSkillData,
		},
	),
};

const selectSkill = state => state.skill;

export const useSkill = () =>
	useRedux(selectSkill, {
		fetchSkills,
		fetchTargetSkill,
		setTargetSkill,
		updateSkill,
		createSkill,
		deleteSkill,
	});

export default { reducer };
