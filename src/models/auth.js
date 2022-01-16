import { createAction, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';

// import { wrapFetch } from 'utils/api';
import { useRedux } from 'utils/hook/redux';
import { examLoginFormData } from 'utils/exam';
import { clearLoginFormData } from 'utils/clear';
import storage from 'utils/storage';
import { isExist } from 'utils/helper';

import history from 'store/history';

import path from 'constants/path';

export const setLogin = createAction('SET_LOGIN');
export const setLogout = createAction('SET_LOGOUT');
export const setAdmin = createAction('SET_ADMIN');

export const updateAccessToken = createAction('UPDATE_ACCESS_TOKEN', token => {
	storage.setItem('token', JSON.stringify(token));

	return token;
});

export const updateForm = createAction('UPDATE_FORM', ({ type, key, data }) => ({
	type,
	key,
	data,
}));

const validateForm = createAction('VALIDATE_FORM', (type, key, valid, error) => ({
	type,
	key,
	valid,
	error,
}));

const clearFormError = createAction('CLEAR_FORM_ERROR', type => (_, getState) => {
	const {
		auth: { loginForm },
	} = getState();
	let clearData;

	if (type === 'loginForm') {
		clearData = clearLoginFormData(loginForm);
	}

	return {
		type,
		data: clearData,
	};
});

export const normalLogin = createAction('NORMAL_LOGIN', () => async (dispatch, getState) => {
	dispatch(clearFormError('loginForm'));

	const {
		auth: { loginForm },
	} = getState();

	const checkData = examLoginFormData(loginForm);

	if (!checkData.value) {
		checkData.notValid.map(key =>
			dispatch(validateForm('loginForm', key, false, key === 'password' ? '未填寫帳號或密碼' : '')),
		);
		return null;
	}

	// const { status, message, data } = await wrapFetch('login', {
	// 	method: 'POST',
	// 	body: JSON.stringify({ account: loginForm.phone.value, password: loginForm.password.value }),
	// });

	// if (status !== 200 && status !== 201) {
	// 	throw new Error(message);
	// }

	// dispatch(updateAccessToken(data.data));
	dispatch(updateAccessToken('test-token'));

	history.push(path.backstage);

	return null;
});

export const loadAuthToken = createAction('LOAD_AUTH_TOKEN', data => ({ data }));

export const logout = createAction('LOGOUT', () => async dispatch => {
	storage.removeItem('token');
	dispatch(setLogout());
	history.push(path.backstageLogin);
});

export const defaultLoginFormData = {
	account: { value: '', valid: true, error: '' },
	password: { value: '', valid: true, error: '' },
	loading: false,
	error: '',
};

export const defaultTokenData = {
	access_token: '',
	expires_in: 0,
	refresh_token: '',
	token_type: '',
};

const reducer = {
	auth: handleActions(
		{
			UPDATE_FORM: (state, action) => ({
				...state,

				[action.payload.type]: {
					...state[action.payload.type],
					[action.payload.key]: {
						...state[action.payload.type][action.payload.key],
						...action.payload.data,
					},
				},
			}),

			VALIDATE_FORM: (state, action) => ({
				...state,

				[action.payload.type]: {
					...state[action.payload.type],
					[action.payload.key]: {
						...state[action.payload.type][action.payload.key],
						valid: action.payload.valid,
						error: action.payload.error,
					},
				},
			}),

			CLEAR_FORM_ERROR: (state, action) => ({
				...state,

				[action.payload.type]: action.payload.data,
			}),

			LOAD_AUTH_TOKEN: (state, action) => ({
				...state,

				token: action.payload.data,
			}),

			UPDATE_ACCESS_TOKEN: (state, action) => ({
				...state,

				token: action.payload,
			}),

			SET_ADMIN: state => ({
				...state,

				isAdmin: true,
			}),

			SET_LOGIN: state => ({
				...state,

				isLogin: true,
			}),

			SET_LOGOUT: state => ({
				...state,

				isLogin: false,
				isAdmin: false,
			}),
		},
		{
			loginForm: defaultLoginFormData,
			token: defaultTokenData,
			isLogin: false,
			isAdmin: false,
		},
	),
};

const selectAuth = createSelector(
	state => state.auth.token,
	state => state.auth.isLogin,
	state => state.auth.isAdmin,
	(token, isLogin, isAdmin) => ({ token, hasToken: isExist(token.access_token), isLogin, isAdmin }),
);

export const useAuth = () =>
	useRedux(selectAuth, {
		setAdmin,
		setLogin,
		setLogout,
		logout,
	});

const selectLoginForm = state => state.auth.loginForm;

export const useLoginForm = () =>
	useRedux(selectLoginForm, {
		updateForm,
		normalLogin,
	});

export default { reducer };
