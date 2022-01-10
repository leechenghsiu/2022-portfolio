import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import { useAuth } from 'models/auth';

import { NavButton } from 'components/atoms/Button';

import routePath from 'constants/path';

import { authMethods } from 'services/firebaseAuth';

import { ReactComponent as SidebarActive } from 'images/icon/sidebar-icon-active.svg';
import { ReactComponent as SidebarUnactive } from 'images/icon/sidebar-icon-unactive.svg';

import styles from './styles.module.scss';

const LinkItem = ({ className, to = '', selected = false, onClick = () => {}, children }) => {
	const { push } = useHistory();

	return (
		<NavButton
			className={className}
			color="primary"
			variant={selected ? 'normal' : 'text'}
			onClick={() => {
				if (to) push(to);
				onClick();
			}}
			Icon={() => (selected ? <SidebarActive /> : <SidebarUnactive />)}
		>
			{children}
		</NavButton>
	);
};

const BackstageHeader = () => {
	const { push } = useHistory();
	const { pathname } = useLocation();
	const [, { setLogout }] = useAuth();

	const handleLogout = () => {
		setLogout();
		authMethods.signOut();
	};

	return (
		<div className={styles.wrapper}>
			<div
				className={styles.title}
				role="button"
				tabIndex={0}
				onKeyPress={() => {}}
				onClick={() => push(routePath.backstage)}
			>
				<h1>Backstage.</h1>
			</div>
			{pathname !== routePath.backstageLogin && (
				<>
					<LinkItem to={routePath.backstage} selected={pathname === routePath.backstage}>
						Dashboard
					</LinkItem>
					<LinkItem
						to={routePath.backstageSkill}
						selected={pathname.includes(routePath.backstageSkill)}
					>
						Skill
					</LinkItem>
					<LinkItem
						to={routePath.backstageProject}
						selected={pathname.includes(routePath.backstageProject)}
					>
						Project
					</LinkItem>
					<LinkItem
						to={routePath.backstageExperience}
						selected={pathname.includes(routePath.backstageExperience)}
					>
						Experience
					</LinkItem>
					<LinkItem className={styles.logoutButton} onClick={handleLogout}>
						Logout
					</LinkItem>
				</>
			)}
		</div>
	);
};

export default BackstageHeader;
