import React from 'react';
import classnames from 'classnames';

import styles from './styles.module.scss';

const Mouse = ({ className }) => <div className={classnames(styles.mouse, className)} />;

export default Mouse;
