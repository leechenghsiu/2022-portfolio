import { combineReducers } from 'redux';

import modal from './modal';
import auth from './auth';
import skill from './skill';
import project from './project';
import experience from './experience';

export default combineReducers({
	...modal.reducer,
	...auth.reducer,
	...skill.reducer,
	...project.reducer,
	...experience.reducer,
});
