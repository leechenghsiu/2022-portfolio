import React, { useState, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { EditOutlined, DeleteOutline } from '@mui/icons-material';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

import { useAuth } from 'models/auth';
import { useProject } from 'models/project';

import routePath from 'constants/path';

import BackstageSectionTitle from 'components/atoms/BackstageSectionTitle';
import DataGrid from 'components/molecules/DataGrid';
import ActionBar from 'components/molecules/ActionBar';

import styles from './styles.module.scss';

const typeMap = { student: 'Student Project', work: 'Work Project', side: 'Side Project' };

const BackstageProject = () => {
	const { push } = useHistory();
	const [search, setSearch] = useState('');
	const [{ isAdmin }] = useAuth();
	const [{ projectList }, { fetchProjects, deleteProject }] = useProject();
	const filteredProjectList = useMemo(() => {
		if (search !== '') {
			return projectList.filter(({ title }) => title.toLowerCase().includes(search.toLowerCase()));
		}
		return projectList;
	}, [search, projectList]);
	const columns = [
		{
			field: 'status',
			headerName: 'Status',
			flex: 1,
			valueFormatter: ({ value }) => (value === 'hidden' ? 'Hidden' : 'Visible'),
		},
		{ field: 'title', headerName: 'Title', flex: 1 },
		{ field: 'titleZh', headerName: 'Title (Zh)', flex: 1 },
		{ field: 'type', headerName: 'Type', flex: 1, valueFormatter: ({ value }) => typeMap[value] },
		{
			field: 'tag',
			headerName: 'Tag',
			flex: 1,
			valueFormatter: ({ value }) => value.map(_tag => ` ${_tag}`),
		},
		{
			field: 'id',
			headerName: 'Actions',
			sortable: false,
			renderCell: ({ value }) => (
				<>
					<Tooltip title="Edit">
						<IconButton onClick={() => push(`${routePath.backstageProject}/${value}`)}>
							<EditOutlined color="action" />
						</IconButton>
					</Tooltip>
					<Tooltip title="Delete">
						<IconButton onClick={() => isAdmin && deleteProject(value)}>
							<DeleteOutline color="action" />
						</IconButton>
					</Tooltip>
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
			<ActionBar
				value={search}
				onChange={setSearch}
				createRoute={routePath.backstageProjectCreate}
			/>
			<DataGrid rows={filteredProjectList} columns={columns} />
		</div>
	);
};

export default BackstageProject;
