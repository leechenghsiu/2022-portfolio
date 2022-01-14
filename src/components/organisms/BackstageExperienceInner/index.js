import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getDownloadURL } from 'firebase/storage';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import AdapterDayjs from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import _ from 'lodash';
import dayjs from 'dayjs';
import Compressor from 'compressorjs';

import { useExperience, defaultTargetExperienceData } from 'models/experience';

import { uploadRef } from 'services/firebase';

import routePath from 'constants/path';

import Button from 'components/atoms/Button';
import BackstageSectionTitle from 'components/atoms/BackstageSectionTitle';

import styles from './styles.module.scss';

const BackstageExperienceInner = ({ edit = false }) => {
	const { id } = useParams();
	const { push } = useHistory();
	const [
		{ targetExperience },
		{ fetchTargetExperience, updateExperience, createExperience, setTargetExperience },
	] = useExperience();
	const [form, setForm] = useState(targetExperience);
	const [thumbnailProgress, setThumbnailProgress] = useState(0);

	useEffect(() => {
		if (edit) {
			fetchTargetExperience(id);
		} else {
			setTargetExperience(defaultTargetExperienceData);
		}
	}, []);

	useEffect(() => {
		if (targetExperience) {
			setForm({
				...targetExperience,
				startAt: targetExperience.startAt
					? dayjs(targetExperience.startAt.toDate()).format('YYYY/MM/DD')
					: dayjs().format('YYYY/MM/DD'),
				endAt: targetExperience.endAt
					? dayjs(targetExperience.endAt.toDate()).format('YYYY/MM/DD')
					: dayjs().format('YYYY/MM/DD'),
			});
		}
	}, [targetExperience]);

	const onChange = e => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};
	const onChangeDate = (e, name) => {
		setForm({ ...form, [name]: dayjs(e).format('YYYY/MM/DD') });
	};
	const onUploadFile = e => {
		setThumbnailProgress(0);
		const file = e.target.files[0];
		if (file) {
			// eslint-disable-next-line
			new Compressor(file, {
				quality: 0.6,
				success(result) {
					const task = uploadRef(`/experience/${file.name}`, result);
					task.on(
						'state_changed',
						snapshot => {
							const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
							setThumbnailProgress(prog);
						},
						err => console.error(err),
						() => {
							getDownloadURL(task.snapshot.ref).then(url => {
								setForm({ ...form, thumbnail: url });
							});
						},
					);
				},
				error(err) {
					console.log(err.message);
				},
			});
		}
	};
	const onSubmit = () => {
		if (edit) {
			updateExperience(form.id, _.omit(form, ['id']), () => push(routePath.backstageExperience));
		} else {
			createExperience(_.omit(form, ['id']), () => push(routePath.backstageExperience));
		}
	};

	return (
		<div className={styles.wrapper}>
			<BackstageSectionTitle title="Experience Edit" />
			<div className={styles.content}>
				<FormControl variant="standard" sx={{ mb: 3 }}>
					<InputLabel id="type">Type</InputLabel>
					<Select
						labelId="type"
						name="type"
						id="type-select"
						value={form.type}
						onChange={onChange}
						label="Type"
					>
						<MenuItem value="education">Education</MenuItem>
						<MenuItem value="job">Job</MenuItem>
						<MenuItem value="activity">Activity</MenuItem>
					</Select>
					<FormHelperText>Please select one of an experience type</FormHelperText>
				</FormControl>
				<FormControl variant="standard" sx={{ mb: 3 }}>
					<TextField
						label="Title"
						name="title"
						variant="standard"
						value={form.title}
						onChange={onChange}
					/>
					<FormHelperText>Please enter experience title</FormHelperText>
				</FormControl>
				<FormControl variant="standard" sx={{ mb: 3 }}>
					<TextField
						label="Department"
						name="department"
						variant="standard"
						value={form.department}
						onChange={onChange}
					/>
					<FormHelperText>Please enter experience department</FormHelperText>
				</FormControl>
				<FormControl variant="standard" sx={{ mb: 3 }}>
					<TextField
						label="Role"
						name="role"
						variant="standard"
						value={form.role}
						onChange={onChange}
					/>
					<FormHelperText>Please enter experience role</FormHelperText>
				</FormControl>
				<FormControl variant="standard" sx={{ mb: 3 }}>
					<TextField
						label="Description"
						name="description"
						variant="standard"
						value={form.description}
						onChange={onChange}
					/>
					<FormHelperText>Please enter experience description</FormHelperText>
				</FormControl>
				<FormControl variant="standard" sx={{ mb: 3 }}>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DesktopDatePicker
							label="Start Time"
							inputFormat="YYYY/MM/DD"
							disableMaskedInput
							value={form.startAt}
							onChange={e => onChangeDate(e, 'startAt')}
							renderInput={params => <TextField variant="standard" {...params} />}
						/>
					</LocalizationProvider>
					<FormHelperText>Please enter experience start date</FormHelperText>
				</FormControl>
				<FormControl variant="standard" sx={{ mb: 3 }}>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DesktopDatePicker
							label="End Time"
							inputFormat="YYYY/MM/DD"
							disableMaskedInput
							value={form.endAt}
							onChange={e => onChangeDate(e, 'endAt')}
							renderInput={params => <TextField variant="standard" {...params} />}
						/>
					</LocalizationProvider>
					<FormHelperText>Please enter experience end date</FormHelperText>
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
				<FormControl variant="standard" sx={{ mb: 3, pt: 2 }}>
					<InputLabel shrink>Thumbnail</InputLabel>
					{targetExperience.thumbnail && (
						<a
							className={styles.link}
							href={targetExperience.thumbnail}
							target="_blank"
							rel="noreferrer"
							alt="original-thumbnail"
						>
							Original Thumbnail
						</a>
					)}
					<Button className={styles.uploadButton} size="large">
						<label className={styles.file} htmlFor="thumbnail">
							Upload Thumbnail
							<input type="file" id="thumbnail" onChange={onUploadFile} />
						</label>
					</Button>
					{thumbnailProgress > 0 && (
						<FormHelperText>
							{thumbnailProgress === 100 ? (
								<a
									className={styles.link}
									href={form.thumbnail}
									target="_blank"
									rel="noreferrer"
									alt="uploaded-thumbnail"
								>
									{`Uploaded...${thumbnailProgress}%, click to preview!`}
								</a>
							) : (
								`Uploading...${thumbnailProgress}%`
							)}
						</FormHelperText>
					)}
				</FormControl>
			</div>
			<div className={styles.footer}>
				<Button
					className={styles.uploadButton}
					variant="text"
					size="large"
					onClick={() => push(routePath.backstageExperience)}
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

export default BackstageExperienceInner;
