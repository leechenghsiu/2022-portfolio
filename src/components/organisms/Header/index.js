import React from 'react';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';

import { useScroll } from 'utils/hook/event';

import { ReactComponent as Logo } from 'images/logo/logo.svg';
import { ReactComponent as Language } from 'images/icon/language.svg';

import styles from './styles.module.scss';

const Header = ({ className, open }) => {
	const { scrollY } = useScroll();

	return (
		<header
			className={classnames(
				styles.wrapper,
				{
					[styles.show]: open,
					[styles.shadow]: scrollY > 200,
				},
				className,
			)}
		>
			<nav className={styles.container}>
				<NavLink to="/">
					<Logo />
				</NavLink>
				<ul>
					<li>
						<NavLink to="/#skills">SKILLS</NavLink>
					</li>
					<li>
						<NavLink to="/#projects">PROJECTS</NavLink>
					</li>
					<li>
						<NavLink to="/#experiences">EXPERIENCES</NavLink>
					</li>
					<li>
						<button type="button" onClick={() => {}}>
							<Language />
						</button>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
