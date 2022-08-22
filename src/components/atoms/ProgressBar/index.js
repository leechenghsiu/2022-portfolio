import React, { useState, useEffect, useRef } from 'react';
import classnames from 'classnames';

import styles from './styles.module.scss';

const ProgressBar = ({ status, goNext }) => {
	const transitionRef = useRef(null);
	const [duration, setDuration] = useState(0);
	const [firstLoad, setFirstLoad] = useState(true);

	useEffect(() => {
		setFirstLoad(false);

		return () => {
			setFirstLoad(true);
		};
	}, []);

	useEffect(() => {
		if (transitionRef.current && status === 0) {
			transitionRef.current.addEventListener('transitionend', () => {
				setDuration(0);
				goNext();
			});
		}
	}, [transitionRef, status]);

	useEffect(() => {
		if (status !== null) {
			setDuration(5);
		}
	}, [status]);

	const style = () => {
		if (firstLoad) {
			if (status === 0) {
				setTimeout(
					() => ({
						transitionDuration: `${duration}s`,
						transform: 'translate(100%, -50%)',
					}),
					10,
				);

				return { transitionDuration: `${duration}s`, transform: 'translate(0, -50%)' };
			}
		}

		return status === 0
			? { transitionDuration: `${duration}s`, transform: 'translate(100%, -50%)' }
			: {};
	};

	return (
		<div className={styles.wrapper}>
			<div
				ref={transitionRef}
				className={classnames(styles.default, {
					[styles.unplayed]: status < 0,
					[styles.played]: status > 0,
					[styles.playing]: status === 0,
				})}
				style={style()}
			/>
		</div>
	);
};

export default ProgressBar;
