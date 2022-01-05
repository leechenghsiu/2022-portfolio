import { createAction, handleActions } from 'redux-actions';
import classnames from 'classnames';
import { map } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import _ from 'lodash';

import { useRedux } from 'utils/hook/redux';

export const openModal = createAction('OPEN_MODAL', ({ type, data = {} }) => ({
	type,
	data,
}));

export const closeModal = createAction('CLOSE_MODAL');

const setModalBackgroundScrollY = createAction('SET_MODAL_BACKGROUND_SCROLLY', () => {
	if (!document.body.className.includes('no-scroll')) {
		document.body.style.top = `-${window.pageYOffset}px`;
		document.body.className = classnames(document.body.className, 'no-scroll');
	}
});

const restoreModalBackgroundScrollY = createAction('RESTORE_MODAL_BACKGROUND_SCROLLY', () => {
	const classNameArray = document.body.className.split(' ');
	const newClassName = classNameArray.filter(item => item !== 'no-scroll').join(' ');
	document.body.className = newClassName;

	const matchesTop = document.body.style.top.match(/\d+/g);
	document.body.style.top = 'unset';
	if (matchesTop !== null && matchesTop.length > 0) {
		window.scrollTo(0, parseInt(matchesTop[0], 10));
	} else {
		window.scrollTo(0, 0);
	}
});

export const openModalEpic = action$ =>
	action$.pipe(
		ofType('OPEN_MODAL'),
		map(() => setModalBackgroundScrollY()),
	);

export const closeModalEpic = action$ =>
	action$.pipe(
		ofType('CLOSE_MODAL'),
		map(() => restoreModalBackgroundScrollY()),
	);

const reducer = {
	modal: handleActions(
		{
			OPEN_MODAL: (state, action) => ({
				...state,
				normal: {
					type: action.payload.type,
					data: action.payload.data,
				},
			}),

			CLOSE_MODAL: (state, action) => ({
				...state,
				normal: {
					type: '',
					data: {},
				},
			}),
		},
		{
			normal: { type: '', data: {} },
		},
	),
};

const selectModal = state => state.modal.normal;

export const useModal = () =>
	useRedux(selectModal, {
		openModal,
		closeModal,
		setModalBackgroundScrollY,
		restoreModalBackgroundScrollY,
	});

export default { reducer };
