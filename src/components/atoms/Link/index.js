/* eslint-disable indent */
import React from 'react';
import classnames from 'classnames';

import history from 'store/history';

import styles from './styles.module.scss';

const onClickHandler =
	(callback = () => {}, pushRoute = () => {}) =>
	e => {
		e.preventDefault();
		pushRoute({
			pathname: e.currentTarget.pathname,
			search: e.currentTarget.search,
			hash: e.currentTarget.hash,
		});
		callback(e);
	};

const Link = ({ className, to, onClick = () => {}, children, isExternal = false }) => {
	const { push } = history;

	return (
		<a
			className={classnames(styles.link, className)}
			href={to}
			role="button"
			tabIndex={0}
			target={isExternal ? '_blank' : '_self'}
			rel="noreferrer"
			onClick={!isExternal ? onClickHandler(onClick, push) : () => {}}
			onKeyPress={() => {}}
		>
			{children}
		</a>
	);
};

export default Link;
