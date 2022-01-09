import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import { NavButton } from 'components/atoms/Button';

import path from 'constants/path';

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
	const { pathname } = useLocation();

	return (
		<div className={styles.wrapper}>
			<h1>Backstage.</h1>
			{pathname !== path.backstageLogin && (
				<>
					<LinkItem to={path.backstage} selected={pathname === path.backstage}>
						Dashboard
					</LinkItem>
					<LinkItem to={path.backstageWorks} selected={pathname === path.backstageWorks}>
						Works
					</LinkItem>
					<LinkItem to={path.backstageAbout} selected={pathname === path.backstageAbout}>
						About
					</LinkItem>
					<LinkItem to={path.backstageResume} selected={pathname === path.backstageResume}>
						Resume
					</LinkItem>
					<LinkItem className={styles.logoutButton} onClick={authMethods.signOut}>
						Logout
					</LinkItem>
				</>
			)}
		</div>
	);
};

export default BackstageHeader;
