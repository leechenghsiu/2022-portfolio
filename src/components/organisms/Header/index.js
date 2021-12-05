import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from 'images/logo/logo.svg';
import { ReactComponent as Language } from 'images/icon/language.svg';

import styles from './styles.module.scss';

const Header = ({ className, open }) => (
	<header className={classnames(styles.wrapper, open && styles.show, className)}>
		<nav className={styles.container}>
			<Logo />
			<ul>
				<li>
					<Link to="/#skills">SKILLS</Link>
				</li>
				<li>
					<Link to="/#projects">PROJECTS</Link>
				</li>
				<li>
					<Link to="/#experiences">EXPERIENCES</Link>
				</li>
				<li>
					<Link to="/#contact">CONTACT</Link>
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

export default Header;
