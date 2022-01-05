import { combineEpics } from 'redux-observable';

import { closeModalEpic, openModalEpic } from './modal';

export default combineEpics(closeModalEpic, openModalEpic);
