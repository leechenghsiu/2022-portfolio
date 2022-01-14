import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import _ from 'lodash';

import { useSkill, defaultTargetSkillData } from 'models/skill';

import routePath from 'constants/path';

import Button from 'components/atoms/Button';
import BackstageSectionTitle from 'components/atoms/BackstageSectionTitle';

import styles from './styles.module.scss';

const BackstageSkillInner = ({ edit = false }) => {
	const { id } = useParams();
	const { push } = useHistory();
	const [{ targetSkill }, { fetchTargetSkill, updateSkill, createSkill, setTargetSkill }] =
		useSkill();
	const [form, setForm] = useState(targetSkill);

	useEffect(() => {
		if (edit) {
			fetchTargetSkill(id);
		} else {
			setTargetSkill(defaultTargetSkillData);
		}
	}, []);

	useEffect(() => {
		if (targetSkill) {
			setForm(targetSkill);
		}
	}, [targetSkill]);

	const onChange = e => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};
	const onSubmit = () => {
		if (edit) {
			updateSkill(form.id, _.omit(form, ['id']), () => push(routePath.backstageSkill));
		} else {
			createSkill(_.omit(form, ['id']), () => push(routePath.backstageSkill));
		}
	};

	return (
		<div className={styles.wrapper}>
			<BackstageSectionTitle title="Skills Edit" />
			<div className={styles.content}>
				<FormControl variant="standard" sx={{ mb: 3 }}>
					<TextField
						label="Title"
						name="title"
						variant="standard"
						value={form.title}
						onChange={onChange}
					/>
					<FormHelperText>Please enter skill title</FormHelperText>
				</FormControl>
				<FormControl variant="standard" sx={{ mb: 3 }}>
					<TextField
						label="Description"
						name="description"
						variant="standard"
						value={form.description}
						onChange={onChange}
					/>
					<FormHelperText>Please enter skill description</FormHelperText>
				</FormControl>
				<FormControl variant="standard" sx={{ mb: 3 }}>
					<TextField
						label="Percentage"
						name="percentage"
						variant="standard"
						value={form.percentage}
						onChange={onChange}
					/>
					<FormHelperText>Please enter skill percentage</FormHelperText>
				</FormControl>
				<FormControl variant="standard" sx={{ mb: 3 }}>
					<TextField
						label="Weight"
						name="weight"
						variant="standard"
						value={form.weight}
						onChange={onChange}
					/>
					<FormHelperText>
						Please enter sorting weight, prioritized by smaller number
					</FormHelperText>
				</FormControl>
			</div>
			<div className={styles.footer}>
				<Button
					className={styles.uploadButton}
					variant="text"
					size="large"
					onClick={() => push(routePath.backstageSkill)}
				>
					Cancel
				</Button>
				<Button className={styles.uploadButton} variant="normal" size="large" onClick={onSubmit}>
					Submit
				</Button>
			</div>
		</div>
	);
};

export default BackstageSkillInner;
