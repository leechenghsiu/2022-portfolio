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
import { SkillPage, SkillCreatePage, SkillEditPage } from 'layouts/BackStage/Skill';
import { ProjectPage, ProjectCreatePage, ProjectEditPage } from 'layouts/BackStage/Project';
import {
	ExperiencePage,
	ExperienceCreatePage,
	ExperienceEditPage,
} from 'layouts/BackStage/Experience';

const Routes = props => (
	<HashRouter>
		<App {...props}>
			<Switch>
				{/* Front End */}
				<NavRoute exact path={routePath.home} component={HomePage} {...props} />

				{/* Back Stage */}
				<NavRoute exact path={routePath.backstageLogin} component={LoginPage} {...props} />
				<AuthRoute exact path={routePath.backstage} component={DashboardPage} {...props} />
				<AuthRoute exact path={routePath.backstageSkill} component={SkillPage} {...props} />
				<AuthRoute
					exact
					path={routePath.backstageSkillCreate}
					component={SkillCreatePage}
					{...props}
				/>
				<AuthRoute
					exact
					path={`${routePath.backstageSkill}/:id`}
					component={SkillEditPage}
					{...props}
				/>
				<AuthRoute exact path={routePath.backstageProject} component={ProjectPage} {...props} />
				<AuthRoute
					exact
					path={routePath.backstageProjectCreate}
					component={ProjectCreatePage}
					{...props}
				/>
				<AuthRoute
					exact
					path={`${routePath.backstageProject}/:id`}
					component={ProjectEditPage}
					{...props}
				/>
				<AuthRoute
					exact
					path={routePath.backstageExperience}
					component={ExperiencePage}
					{...props}
				/>
				<AuthRoute
					exact
					path={routePath.backstageExperienceCreate}
					component={ExperienceCreatePage}
					{...props}
				/>
				<AuthRoute
					exact
					path={`${routePath.backstageExperience}/:id`}
					component={ExperienceEditPage}
					{...props}
				/>
			</Switch>
		</App>
	</HashRouter>
);

export default Routes;
