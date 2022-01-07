import { combineReducers } from 'redux';

import modal from './modal';
import auth from './auth';
import project from './project';

export default combineReducers({
	...modal.reducer,
	...auth.reducer,
	...project.reducer,
});
