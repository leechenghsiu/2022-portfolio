import React from 'react';
import { Facebook, GitHub, LinkedIn } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

import styles from './styles.module.scss';

const Contact = () => (
	<div className={styles.wrapper}>
		<div className={styles.container}>
			<div className={styles.contactWrapper}>
				<p>Follow me on</p>
				<a
					target="_blank"
					rel="noreferrer"
					href="https://www.facebook.com/profile.php?id=100001049197253"
				>
					<Facebook />
					<span>Facebook</span>
				</a>
				<a target="_blank" rel="noreferrer" href="https://github.com/leechenghsiu">
					<GitHub />
					<span>GitHub</span>
				</a>
				<a
					target="_blank"
					rel="noreferrer"
					href="https://www.linkedin.com/in/%E6%89%BF%E4%BF%AE-%E6%9D%8E-472230163/"
				>
					<LinkedIn />
					<span>LinkedIn</span>
				</a>
			</div>
			<div className={styles.copyright}>
				<NavLink target="_blank" to="/backstage">
					Matthew Lee,&nbsp;&nbsp;2022
				</NavLink>
			</div>
		</div>
	</div>
);

export default Contact;
