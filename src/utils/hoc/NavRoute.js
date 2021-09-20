import React from 'react';
import { Route } from 'react-router-dom';

import Header from 'components/organisms/Header';
import BackstageHeader from 'components/organisms/BackstageHeader';

const NavRoute = ({ user, component: Component, ...props }) => {
	const { pathname } = props.location;

	return (
		<Route
			component={_props => (
				<>
					{pathname.startsWith('/backstage') ? <BackstageHeader /> : <Header />}
					<Component {..._props} user={user} />
				</>
			)}
			{...props}
		/>
	);
};

export default NavRoute;
