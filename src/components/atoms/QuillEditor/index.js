import React, { useRef, useCallback } from 'react';
import { getDownloadURL } from 'firebase/storage';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { uploadRef } from 'services/firebase';

import styles from './styles.module.scss';

const QuillEditor = ({ value, onChange, type }) => {
	const quill = useRef(null);
	const imageHandler = useCallback(() => {
		const editor = quill.current.getEditor();
		const input = document.createElement('input');
		input.setAttribute('type', 'file');
		input.setAttribute('accept', 'image/*');
		input.click();
		input.onchange = async () => {
			const file = input.files[0];
			const task = uploadRef(`/${type}/${file.name}`, file);
			task.on(
				'state_changed',
				() => {},
				err => console.error(err),
				() => {
					getDownloadURL(task.snapshot.ref).then(url => {
						const range = editor.getSelection();
						editor.insertEmbed(range.index, 'image', url);
					});
				},
			);
		};
	}, [quill]);

	const modules = {
		toolbar: { container: ['bold', 'italic', 'link', 'image'], handlers: { image: imageHandler } },
	};
	const formats = [
		'header',
		'bold',
		'italic',
		'underline',
		'strike',
		'blockquote',
		'list',
		'bullet',
		'indent',
		'link',
		'image',
	];

	return (
		<ReactQuill
			ref={quill}
			className={styles.quill}
			theme="snow"
			modules={modules}
			formats={formats}
			value={value}
			onChange={onChange}
		/>
	);
};

export default QuillEditor;
