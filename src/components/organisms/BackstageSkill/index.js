import React, { useState, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { EditOutlined, DeleteOutline } from '@mui/icons-material';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

import { useAuth } from 'models/auth';
import { useSkill } from 'models/skill';

import routePath from 'constants/path';

import BackstageSectionTitle from 'components/atoms/BackstageSectionTitle';
import DataGrid from 'components/molecules/DataGrid';
import ActionBar from 'components/molecules/ActionBar';

import styles from './styles.module.scss';

const BackstageSkill = () => {
	const { push } = useHistory();
	const [search, setSearch] = useState('');
	const [{ isAdmin }] = useAuth();
	const [{ skillList }, { fetchSkills, deleteSkill }] = useSkill();
	const filteredSkillList = useMemo(() => {
		if (search !== '') {
			return skillList.filter(({ title }) => title.toLowerCase().includes(search.toLowerCase()));
		}
		return skillList;
	}, [search, skillList]);
	const columns = [
		{ field: 'title', headerName: 'Title', flex: 1 },
		{ field: 'titleZh', headerName: 'Title (Zh)', flex: 1 },
		{ field: 'percentage', headerName: 'Percentage', flex: 1 },
		{
			field: 'id',
			headerName: 'Actions',
			sortable: false,
			renderCell: ({ value }) => (
				<>
					<Tooltip title="Edit">
						<IconButton onClick={() => push(`${routePath.backstageSkill}/${value}`)}>
							<EditOutlined color="action" />
						</IconButton>
					</Tooltip>
					<Tooltip title="Delete">
						<IconButton onClick={() => isAdmin && deleteSkill(value)}>
							<DeleteOutline color="action" />
						</IconButton>
					</Tooltip>
				</>
			),
		},
	];

	useEffect(() => {
		fetchSkills();
	}, []);

	return (
		<div className={styles.wrapper}>
			<BackstageSectionTitle title="Skills" />
			<ActionBar value={search} onChange={setSearch} createRoute={routePath.backstageSkillCreate} />
			<DataGrid rows={filteredSkillList} columns={columns} />
		</div>
	);
};

export default BackstageSkill;
