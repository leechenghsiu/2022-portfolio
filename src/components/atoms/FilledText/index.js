import React, { useState, useEffect, useRef, useMemo } from 'react';
import styled from 'styled-components';

import styles from './styles.module.scss';

const FilledText = ({ title, filledText, targetPercentage, start }) => {
	let percentage = 0;
	const [running, setRunning] = useState(false);
	const textRef = useRef(null);
	const spanRef = useRef(null);

	const levelColorMap = useMemo(() => {
		if (targetPercentage > 0.7) {
			return '#4cd265';
		}
		if (targetPercentage > 0.4) {
			return '#db995a';
		}
		if (targetPercentage > 0) {
			return '#5299d3';
		}
		return '#f1faee75';
	}, [targetPercentage]);

	const run = () => {
		if (start) {
			if (percentage < targetPercentage) {
				percentage = parseFloat((percentage + 0.01).toFixed(2));
				textRef.current.style.setProperty('--percentage', percentage);
				spanRef.current.innerText = `${(percentage * 100).toFixed(0)}%─`;
				setTimeout(run, 20);
			} else {
				setRunning(false);
			}
		}
	};

	useEffect(() => {
		if (start && !running) {
			percentage = 0;
			textRef.current.style.setProperty('--percentage', 0);
			spanRef.current.innerText = '';

			setRunning(true);
			run();
		}
	}, [start]);

	return (
		<div className={styles.wrapper}>
			<h1>{title}</h1>
			<Text ref={textRef} color={levelColorMap}>
				{filledText}
				<span ref={spanRef} />
			</Text>
		</div>
	);
};

const Text = styled.h2`
	--percentage: 0;

	position: relative;
	color: transparent;
	width: 100%;
	font-size: 16px;
	font-family: 'Noto Sans TC', sans-serif;
	line-height: 20px;
	letter-spacing: 1.5px;
	background-clip: text;
	-webkit-background-clip: text;
	padding-bottom: 1px;
	background-image: linear-gradient(
		#f1faee75 calc(100% - calc(var(--percentage) * 100%)),
		${props => props.color} calc(100% - calc(var(--percentage) * 100%))
	);

	& > span {
		position: absolute;
		bottom: calc(var(--percentage) * 100%);
		left: 0;
		transform: translate(calc(-100% - 2px), calc(50% + 5px));
		color: ${props => props.color};
		font-size: 12px;
		line-height: 12px;
	}
`;

export default FilledText;
