import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import configureStore from 'store';

import routePath from 'constants/path';

const AuthRoute = ({ user, component: Component, ...props }) => {
	const { auth } = configureStore({}).getState();
	const { isLogin } = auth;

	return (
		<Route
			component={_props =>
				isLogin ? <Component {..._props} /> : <Redirect push to={routePath.backstageLogin} />
			}
			{...props}
		/>
	);
};

export default AuthRoute;
