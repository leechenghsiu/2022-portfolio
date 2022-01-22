import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import _ from 'lodash';

import { useAuth } from 'models/auth';
import { useSkill, defaultTargetSkillData } from 'models/skill';

import routePath from 'constants/path';

import Button from 'components/atoms/Button';
import BackstageSectionTitle from 'components/atoms/BackstageSectionTitle';

import styles from './styles.module.scss';

const BackstageSkillInner = ({ edit = false }) => {
	const { id } = useParams();
	const { push } = useHistory();
	const [{ isAdmin }] = useAuth();
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
			<BackstageSectionTitle title="Skill Edit" />
			<div className={styles.content}>
				<FormControl variant="standard" sx={{ mb: 3 }}>
					<InputLabel id="status">Status</InputLabel>
					<Select
						labelId="status"
						name="status"
						id="status-select"
						value={form.status}
						onChange={onChange}
						label="Status"
					>
						<MenuItem value="visible">Visible</MenuItem>
						<MenuItem value="hidden">Hidden</MenuItem>
					</Select>
					<FormHelperText>Please select skill status</FormHelperText>
				</FormControl>
				<FormControl variant="standard" sx={{ mb: 3 }}>
					<TextField
						label="Title"
						name="title"
						variant="standard"
						value={form.title}
						onChange={onChange}
					/>
					<FormHelperText>Please enter English skill title</FormHelperText>
				</FormControl>
				<FormControl variant="standard" sx={{ mb: 3 }}>
					<TextField
						label="Title (Zh)"
						name="titleZh"
						variant="standard"
						value={form.titleZh}
						onChange={onChange}
					/>
					<FormHelperText>Please enter Chinese skill title</FormHelperText>
				</FormControl>
				<FormControl variant="standard" sx={{ mb: 3 }}>
					<TextField
						label="Description"
						name="description"
						variant="standard"
						value={form.description}
						onChange={onChange}
					/>
					<FormHelperText>Please enter English skill description</FormHelperText>
				</FormControl>
				<FormControl variant="standard" sx={{ mb: 3 }}>
					<TextField
						label="Description (Zh)"
						name="descriptionZh"
						variant="standard"
						value={form.descriptionZh}
						onChange={onChange}
					/>
					<FormHelperText>Please enter Chinese skill description</FormHelperText>
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
				<Button
					className={styles.uploadButton}
					disabled={!isAdmin}
					variant="normal"
					size="large"
					onClick={onSubmit}
				>
					Submit
				</Button>
			</div>
		</div>
	);
};

export default BackstageSkillInner;
