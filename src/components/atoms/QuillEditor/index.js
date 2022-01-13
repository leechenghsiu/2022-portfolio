import React, { useRef, useCallback } from 'react';
import { getDownloadURL } from 'firebase/storage';
import Compressor from 'compressorjs';
import ReactQuill, { Quill } from 'react-quill';
import ImageResize from 'quill-image-resize-module-react';
import 'react-quill/dist/quill.snow.css';

import { uploadRef } from 'services/firebase';

import styles from './styles.module.scss';

Quill.register('modules/imageResize', ImageResize);

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
			// eslint-disable-next-line
			new Compressor(file, {
				quality: 0.6,
				success(result) {
					const task = uploadRef(`/${type}/${file.name}`, result);
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
				},
				error(err) {
					console.log(err.message);
				},
			});
		};
	}, [quill]);

	const modules = {
		imageResize: {
			parchment: Quill.import('parchment'),
			modules: ['Resize', 'DisplaySize'],
		},
		toolbar: {
			container: [
				[{ header: '1' }, { header: '2' }, { font: [] }],
				[{ size: [] }],
				['bold', 'italic', 'underline', 'strike', 'blockquote'],
				[{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
				['link', 'image', 'imagewithstyle', 'video'],
				['clean'],
			],
			handlers: { image: imageHandler },
		},
		clipboard: {
			matchVisual: false,
		},
	};
	const formats = [
		'header',
		'font',
		'size',
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
		'alt',
		'height',
		'width',
		'style',
		'size',
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
