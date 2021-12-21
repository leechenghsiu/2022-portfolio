import React, { useEffect, useRef, useMemo } from 'react';
import styled from 'styled-components';

import styles from './styles.module.scss';

const FilledText = ({ title, filledText, targetProgress, start }) => {
	let progress = 0;
	const textRef = useRef(null);
	const spanRef = useRef(null);

	const levelColorMap = useMemo(() => {
		if (targetProgress >= 0.8) {
			return '#4cd265';
		}
		if (targetProgress >= 0) {
			return '#4cd265';
		}
		return '#f1faee75';
	}, [targetProgress]);

	const run = () => {
		if (start) {
			if (progress < targetProgress) {
				progress = parseFloat((progress + 0.01).toFixed(2));
				textRef.current.style.setProperty('--progress', progress);
				spanRef.current.innerText = `${(progress * 100).toFixed(0)}%─`;
				setTimeout(run, 20);
			}
		}
	};

	useEffect(() => {
		if (start) {
			run();
		} else {
			progress = 0;
			textRef.current.style.setProperty('--progress', 0);
			spanRef.current.innerText = '';
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
	--progress: 0;

	position: relative;
	color: transparent;
	width: 100%;
	font-size: 16px;
	font-family: 'Noto Sans TC', sans-serif;
	line-height: 1.2;
	letter-spacing: 1.5px;
	background-clip: text;
	-webkit-background-clip: text;
	padding-bottom: 1px;
	background-image: linear-gradient(
		#f1faee75 calc(100% - calc(var(--progress) * 100%)),
		${props => props.color} calc(100% - calc(var(--progress) * 100%))
	);

	& > span {
		position: absolute;
		bottom: calc(var(--progress) * 100%);
		left: 0;
		transform: translate(calc(-100% - 2px), calc(50% + 4px));
		color: #4cd265;
		font-size: 12px;
		line-height: 12px;
	}
`;

export default FilledText;
