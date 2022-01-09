import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import routePath from 'constants/path';

const AuthRoute = ({ user, component: Component, ...props }) => (
	<Route
		component={_props =>
			user ? <Component {..._props} /> : <Redirect push to={routePath.backstageLogin} />
		}
		{...props}
	/>
);

export default AuthRoute;
