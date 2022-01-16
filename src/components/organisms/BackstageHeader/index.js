import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
// import DashboardIcon from '@mui/icons-material/Dashboard';
import BuildIcon from '@mui/icons-material/Build';
import AssignmentIcon from '@mui/icons-material/Assignment';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import LogoutIcon from '@mui/icons-material/Logout';

import { useAuth } from 'models/auth';

import { NavButton } from 'components/atoms/Button';

import routePath from 'constants/path';

import { authMethods } from 'services/firebaseAuth';

import styles from './styles.module.scss';

const LinkItem = ({
	className,
	to = '',
	selected = false,
	onClick = () => {},
	children,
	Icon = null,
}) => {
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
			Icon={Icon}
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
					{/* <LinkItem
						to={routePath.backstage}
						selected={pathname === routePath.backstage}
						Icon={DashboardIcon}
					>
						Dashboard
					</LinkItem> */}
					<LinkItem
						to={routePath.backstageSkill}
						selected={pathname.includes(routePath.backstageSkill)}
						Icon={BuildIcon}
					>
						Skill
					</LinkItem>
					<LinkItem
						to={routePath.backstageProject}
						selected={pathname.includes(routePath.backstageProject)}
						Icon={AssignmentIcon}
					>
						Project
					</LinkItem>
					<LinkItem
						to={routePath.backstageExperience}
						selected={pathname.includes(routePath.backstageExperience)}
						Icon={WorkspacePremiumIcon}
					>
						Experience
					</LinkItem>
					<LinkItem className={styles.logoutButton} onClick={handleLogout} Icon={LogoutIcon}>
						Logout
					</LinkItem>
				</>
			)}
		</div>
	);
};

export default BackstageHeader;
