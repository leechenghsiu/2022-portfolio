import React from 'react';
import classnames from 'classnames';

import { isExist } from 'utils/helper';

import styles from './styles.module.scss';

export const NavButton = ({ className, ...props }) => (
	<Button className={classnames(styles.navButton, className)} {...props} />
);

const Button = ({
	children,
	className,
	variant = 'normal', // normal, outlined, invert, text
	onClick = () => {},
	size = '',
	Icon,
	color = 'primary',
	disabled = false,
}) => (
	<button
		className={classnames(
			styles.button,
			className,
			{
				[styles.disabled]: disabled,
			},
			isExist(variant) && styles[variant],
			isExist(size) && styles[size],
			isExist(color) && styles[color],
		)}
		type="button"
		onClick={() => {
			if (!disabled) {
				onClick();
			}
		}}
	>
		<div>
			{Icon && (
				<div className={classnames(styles.icon, { [styles.margin]: isExist(children) })}>
					<Icon />
				</div>
			)}
			{children}
		</div>
	</button>
);

export default Button;
