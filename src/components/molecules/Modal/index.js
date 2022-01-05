/* eslint-disable react/jsx-props-no-spreading */
import React, { useLayoutEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useTransition, animated, config } from 'react-spring';
import classnames from 'classnames';

import styles from './styles.module.scss';

const ModalComponent = ({
	className,
	children,
	active,
	onRest = () => {},
	onDeactivate = () => {},
}) => {
	const transitions = useTransition(active, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
		config: config.stiff,
		onDestroyed: onRest,
	});

	const handleClick = e => {
		if (e.target === e.currentTarget) {
			onDeactivate();
		}
	};

	return (
		<>
			{transitions(
				(style, item) =>
					item && (
						<animated.div
							className={classnames(styles.modal, className)}
							style={style}
							onClick={handleClick}
						>
							{children}
						</animated.div>
					),
			)}
		</>
	);
};

const Modal = ({ children, ...other }) => {
	const refDiv = useRef(document.createElement('div'));

	useLayoutEffect(() => {
		let modalRoot = document.getElementById('modal-root');

		if (modalRoot === null) {
			modalRoot = document.createElement('div');
			modalRoot.setAttribute('id', 'modal-root');
			document.body.appendChild(modalRoot);
		}

		modalRoot.appendChild(refDiv.current);

		return () => {
			modalRoot.removeChild(refDiv.current);
		};
	}, []);

	return ReactDOM.createPortal(
		<ModalComponent {...other}>{children}</ModalComponent>,
		refDiv.current,
	);
};

export default Modal;
