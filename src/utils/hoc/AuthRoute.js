import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import configureStore from 'store';

import Header from 'components/organisms/Header';
import BackstageHeader from 'components/organisms/BackstageHeader';

import routePath from 'constants/path';

const AuthRoute = ({ user, component: Component, ...props }) => {
	const { pathname } = props.location;
	const { auth } = configureStore({}).getState();
	const { isLogin } = auth;

	return (
		<Route
			component={_props =>
				isLogin ? (
					<>
						{pathname.startsWith('/backstage') ? <BackstageHeader /> : <Header />}
						<Component {..._props} />
					</>
				) : (
					<Redirect push to={routePath.backstageLogin} />
				)
			}
			{...props}
		/>
	);
};

export default AuthRoute;
