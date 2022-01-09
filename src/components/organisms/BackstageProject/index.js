import React, { useState, useEffect } from 'react';
import { EditOutlined, DeleteOutline } from '@mui/icons-material';

import { useProject } from 'models/project';

import BackstageSectionTitle from 'components/atoms/BackstageSectionTitle';
import DataGrid from 'components/molecules/DataGrid';
import ActionBar from 'components/molecules/ActionBar';

import styles from './styles.module.scss';

const typeMap = { student: 'Student Project', work: 'Work Project', side: 'Side Project' };

const BackstageProject = () => {
	const [search, setSearch] = useState('');
	const [{ projectList }, { fetchProjects }] = useProject();
	const columns = [
		{ field: 'title', headerName: 'Title', flex: 1 },
		{ field: 'type', headerName: 'Type', flex: 1, valueFormatter: ({ value }) => typeMap[value] },
		{
			field: 'tag',
			headerName: 'Tag',
			flex: 1,
			valueFormatter: ({ value }) => value.map(_tag => ` ${_tag}`),
		},
		{
			field: 'id',
			headerName: '',
			sortable: false,
			renderCell: ({ value }) => (
				<>
					<EditOutlined
						style={{ cursor: 'pointer', marginRight: 8 }}
						color="action"
						onClick={() => console.log(value)}
					/>
					<DeleteOutline
						style={{ cursor: 'pointer' }}
						color="action"
						onClick={() => console.log(value)}
					/>
				</>
			),
		},
	];

	useEffect(() => {
		fetchProjects();
	}, []);

	return (
		<div className={styles.wrapper}>
			<BackstageSectionTitle title="Projects" />
			<ActionBar value={search} onChange={setSearch} />
			<DataGrid rows={projectList} columns={columns} />
		</div>
	);
};

export default BackstageProject;
