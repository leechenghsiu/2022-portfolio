import React from 'react';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';

import { useScroll } from 'utils/hook/event';
import i18n from 'utils/i18n';

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
						<button
							type="button"
							onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'zh' : 'en')}
						>
							<Language />
						</button>
					</li>
				</ul>
				<button
					className={styles.mobileButton}
					type="button"
					onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'zh' : 'en')}
				>
					<Language />
				</button>
			</nav>
		</header>
	);
};

export default Header;
