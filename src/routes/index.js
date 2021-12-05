import React from 'react';
import { HashRouter, Switch } from 'react-router-dom';

import App from 'layouts/App';

import routePath from 'constants/path';

import AuthRoute from 'utils/hoc/AuthRoute';
import NavRoute from 'utils/hoc/NavRoute';

// Front Stage
import { HomePage } from 'layouts/FrontStage/Home';
// Back Stage
import { DashboardPage } from 'layouts/BackStage/Dashboard';
import { LoginPage } from 'layouts/BackStage/Login';

const Routes = props => (
	<HashRouter>
		<App>
			<Switch>
				{/* Front End */}
				<NavRoute exact path={routePath.home} component={HomePage} {...props} />

				{/* Back Stage */}
				<NavRoute exact path={routePath.backstageLogin} component={LoginPage} {...props} />
				<AuthRoute path={routePath.backstage} component={DashboardPage} {...props} />
			</Switch>
		</App>
	</HashRouter>
);

export default Routes;
