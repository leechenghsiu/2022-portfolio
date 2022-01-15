import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getDownloadURL } from 'firebase/storage';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Chip from '@mui/material/Chip';
import _ from 'lodash';
import Compressor from 'compressorjs';

import { useProject, defaultTargetProjectData } from 'models/project';

import { uploadRef } from 'services/firebase';

import routePath from 'constants/path';

import Button from 'components/atoms/Button';
import QuillEditor from 'components/atoms/QuillEditor';
import BackstageSectionTitle from 'components/atoms/BackstageSectionTitle';

import styles from './styles.module.scss';

const BackstageProjectInner = ({ edit = false }) => {
	const { id } = useParams();
	const { push } = useHistory();
	const [
		{ targetProject },
		{ fetchTargetProject, updateProject, createProject, setTargetProject },
	] = useProject();
	const [form, setForm] = useState(targetProject);
	const [content, setContent] = useState('');
	const [contentZh, setContentZh] = useState('');
	const [tagInput, setTagInput] = useState('');
	const [thumbnailProgress, setThumbnailProgress] = useState(0);
	const [videoProgress, setVideoProgress] = useState(0);

	useEffect(() => {
		if (edit) {
			fetchTargetProject(id);
		} else {
			setTargetProject(defaultTargetProjectData);
		}
	}, []);

	useEffect(() => {
		if (targetProject) setForm(targetProject);
		if (targetProject.content) setContent(targetProject.content);
		if (targetProject.contentZh) setContentZh(targetProject.contentZh);
	}, [targetProject]);

	const onChange = e => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};
	const onChangeEditor = e => {
		setContent(e);
	};
	const onChangeZhEditor = e => {
		setContentZh(e);
	};
	const onCreateTag = e => {
		e.preventDefault();
		setForm({ ...form, tag: [...form.tag, e.target.value] });
		setTagInput('');
	};
	const onRemoveTag = _tag => {
		const idx = form.tag.indexOf(_tag);
		setForm({ ...form, tag: [...form.tag.slice(0, idx), ...form.tag.slice(idx + 1)] });
	};
	const onUploadFile = (e, type) => {
		if (type === 'thumbnail') {
			setThumbnailProgress(0);
		} else {
			setVideoProgress(0);
		}
		const file = e.target.files[0];
		if (file) {
			if (type === 'thumbnail') {
				// eslint-disable-next-line
				new Compressor(file, {
					quality: 0.6,
					success(result) {
						const task = uploadRef(`/project/${file.name}`, result);
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
			} else {
				const task = uploadRef(`/video/${file.name}`, file);
				task.on(
					'state_changed',
					snapshot => {
						const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
						setVideoProgress(prog);
					},
					err => console.error(err),
					() => {
						getDownloadURL(task.snapshot.ref).then(url => {
							setForm({ ...form, video: url });
						});
					},
				);
			}
		}
	};
	const onSubmit = () => {
		const _form = { ...form, content, contentZh };
		if (edit) {
			updateProject(_form.id, _.omit(_form, ['id']), () => push(routePath.backstageProject));
		} else {
			createProject(_.omit(_form, ['id']), () => push(routePath.backstageProject));
		}
	};

	return (
		<div className={styles.wrapper}>
			<BackstageSectionTitle title="Project Edit" />
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
						<MenuItem value="student">Student</MenuItem>
						<MenuItem value="work">Work</MenuItem>
						<MenuItem value="side">Side</MenuItem>
					</Select>
					<FormHelperText>Please select one of a project type</FormHelperText>
				</FormControl>
				<FormControl variant="standard" sx={{ mb: 3 }}>
					<TextField
						label="Title"
						name="title"
						variant="standard"
						value={form.title}
						onChange={onChange}
					/>
					<FormHelperText>Please enter English project name</FormHelperText>
				</FormControl>
				<FormControl variant="standard" sx={{ mb: 3 }}>
					<TextField
						label="Title (Zh)"
						name="titleZh"
						variant="standard"
						value={form.titleZh}
						onChange={onChange}
					/>
					<FormHelperText>Please enter Chinese project name</FormHelperText>
				</FormControl>
				<FormControl variant="standard" sx={{ mb: 3 }}>
					<InputLabel shrink>Tag</InputLabel>
					<div className={styles.chipList}>
						{form.tag.map(data => (
							<Chip key={data} label={data} onDelete={() => onRemoveTag(data)} />
						))}
						<TextField
							placeholder="Add New Tag"
							variant="standard"
							value={tagInput}
							onChange={e => setTagInput(e.target.value)}
							onKeyPress={e => {
								if (e.key === 'Enter') {
									onCreateTag(e);
								}
							}}
						/>
					</div>
					<FormHelperText>Please create tags for project</FormHelperText>
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
				<FormControl variant="standard" sx={{ mb: 3, pt: 3 }}>
					<InputLabel shrink>Content</InputLabel>
					<QuillEditor type="project" value={content} onChange={c => onChangeEditor(c)} />
					<FormHelperText>Please enter English project content</FormHelperText>
				</FormControl>
				<FormControl variant="standard" sx={{ mb: 3, pt: 3 }}>
					<InputLabel shrink>Content (Zh)</InputLabel>
					<QuillEditor type="project" value={contentZh} onChange={c => onChangeZhEditor(c)} />
					<FormHelperText>Please enter Chinese project content</FormHelperText>
				</FormControl>
				<FormControl variant="standard" sx={{ mb: 3, pt: 2 }}>
					<InputLabel shrink>Thumbnail</InputLabel>
					{targetProject.thumbnail && (
						<a
							className={styles.link}
							href={targetProject.thumbnail}
							target="_blank"
							rel="noreferrer"
							alt="thumbnail"
						>
							Original Thumbnail
						</a>
					)}
					<Button className={styles.uploadButton} size="large">
						<label className={styles.file} htmlFor="thumbnail">
							Upload Thumbnail
							<input type="file" id="thumbnail" onChange={e => onUploadFile(e, 'thumbnail')} />
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
				<FormControl variant="standard" sx={{ mb: 3, pt: 2 }}>
					<InputLabel shrink>Video</InputLabel>
					{targetProject.video && (
						<a
							className={styles.link}
							href={targetProject.video}
							target="_blank"
							rel="noreferrer"
							alt="original-video"
						>
							Original Video
						</a>
					)}
					<Button className={styles.uploadButton} size="large">
						<label className={styles.file} htmlFor="video">
							Upload Video
							<input type="file" id="video" onChange={e => onUploadFile(e, 'video')} />
						</label>
					</Button>
					{videoProgress > 0 && (
						<FormHelperText>
							{videoProgress === 100 ? (
								<a
									className={styles.link}
									href={form.video}
									target="_blank"
									rel="noreferrer"
									alt="uploaded-video"
								>
									{`Uploaded...${videoProgress}%, click to preview!`}
								</a>
							) : (
								`Uploading...${videoProgress}%`
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
					onClick={() => push(routePath.backstageProject)}
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

export default BackstageProjectInner;
