import React from 'react';
import { useLocation } from 'react-router-dom';

import styles from './styles.module.scss';

export const DashboardPage = () => {
	const { pathname } = useLocation();

	return <div className={styles.wrapper}>{pathname}</div>;
};
