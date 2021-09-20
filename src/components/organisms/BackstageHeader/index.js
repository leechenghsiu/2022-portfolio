import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import Button from 'components/atoms/Button';

import path from 'constants/path';

import styles from './styles.module.scss';

const LinkItem = ({ to, selected = false, onClick = () => {}, children }) => {
	const { push } = useHistory();

	return (
		<Button
			color="primary"
			variant={selected ? 'normal' : 'text'}
			onClick={() => {
				push(to);
				onClick();
			}}
		>
			{children}
		</Button>
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
				</>
			)}
		</div>
	);
};

export default BackstageHeader;
