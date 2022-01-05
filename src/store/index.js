import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk-fsa';
import { createEpicMiddleware } from 'redux-observable';

import reducers from 'models/reducers';
import rootEpic from 'models/epics';

const epicMiddleware = createEpicMiddleware();

const middlewares = [thunkMiddleware, promiseMiddleware, epicMiddleware];
let composeEnhancers = compose;

if (process.env.NODE_ENV !== 'production') {
	const { createLogger } = require('redux-logger'); // eslint-disable-line global-require
	middlewares.push(createLogger());
	composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

export default function configureStore(preState) {
	const store = createStore(reducers, preState, composeEnhancers(applyMiddleware(...middlewares)));

	epicMiddleware.run(rootEpic);

	if (module.hot) {
		module.hot.accept('../models/reducers', () => {
			const nextReducers = require('../models/reducers').default; // eslint-disable-line global-require
			store.replaceReducer(nextReducers);
		});
	}

	return store;
}
