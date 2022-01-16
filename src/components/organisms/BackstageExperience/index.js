import React, { useState, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { EditOutlined, DeleteOutline } from '@mui/icons-material';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

import { useAuth } from 'models/auth';
import { useExperience } from 'models/experience';

import routePath from 'constants/path';

import BackstageSectionTitle from 'components/atoms/BackstageSectionTitle';
import DataGrid from 'components/molecules/DataGrid';
import ActionBar from 'components/molecules/ActionBar';

import styles from './styles.module.scss';

const typeMap = { education: 'Education', job: 'Job', activity: 'Activity' };

const BackstageExperience = () => {
	const { push } = useHistory();
	const [search, setSearch] = useState('');
	const [{ isAdmin }] = useAuth();
	const [{ experienceList }, { fetchExperiences, deleteExperience }] = useExperience();
	const filteredExperienceList = useMemo(() => {
		if (search !== '') {
			return experienceList.filter(({ title }) =>
				title.toLowerCase().includes(search.toLowerCase()),
			);
		}
		return experienceList;
	}, [search, experienceList]);
	const columns = [
		{ field: 'title', headerName: 'Title', flex: 1 },
		{ field: 'titleZh', headerName: 'Title (Zh)', flex: 1 },
		{ field: 'department', headerName: 'Department', flex: 1 },
		{ field: 'departmentZh', headerName: 'Department (Zh)', flex: 1 },
		{ field: 'role', headerName: 'Role', flex: 1 },
		{ field: 'roleZh', headerName: 'Role (Zh)', flex: 1 },
		{ field: 'type', headerName: 'Type', flex: 1, valueFormatter: ({ value }) => typeMap[value] },
		{
			field: 'id',
			headerName: 'Actions',
			sortable: false,
			renderCell: ({ value }) => (
				<>
					<Tooltip title="Edit">
						<IconButton onClick={() => push(`${routePath.backstageExperience}/${value}`)}>
							<EditOutlined color="action" />
						</IconButton>
					</Tooltip>
					<Tooltip title="Delete">
						<IconButton onClick={() => isAdmin && deleteExperience(value)}>
							<DeleteOutline color="action" />
						</IconButton>
					</Tooltip>
				</>
			),
		},
	];

	useEffect(() => {
		fetchExperiences();
	}, []);

	return (
		<div className={styles.wrapper}>
			<BackstageSectionTitle title="Experiences" />
			<ActionBar
				value={search}
				onChange={setSearch}
				createRoute={routePath.backstageExperienceCreate}
			/>
			<DataGrid rows={filteredExperienceList} columns={columns} />
		</div>
	);
};

export default BackstageExperience;
