import React from 'react';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import { useHistory } from 'react-router-dom';

import Button from 'components/atoms/Button';

import styles from './styles.module.scss';

const useStyles = makeStyles({
	input: {
		height: 48,
		width: 280,

		'& > div': {
			borderRadius: 10,
		},

		'& input': {
			padding: '12.5px 14px',
		},

		'& legend': {
			display: 'none',
		},

		'& fieldset': {
			top: 0,
		},
	},
});

const ActionBar = ({ value, onChange, createRoute }) => {
	const classes = useStyles();
	const { push } = useHistory();

	return (
		<div className={styles.wrapper}>
			<TextField
				className={classes.input}
				hiddenLabel
				placeholder="Search"
				InputProps={{
					value,
					onChange: e => onChange(e.target.value),
					type: 'search',
				}}
			/>
			<Button className={styles.button} size="large" onClick={() => push(createRoute)}>
				Add New
			</Button>
		</div>
	);
};

export default ActionBar;
