import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { DataGrid } from '@mui/x-data-grid';

const useStyles = makeStyles({
	root: {
		'&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
			outline: 'none',
		},
		'&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
			outline: 'none',
		},
		'&.MuiDataGrid-root .MuiDataGrid-columnHeaderDraggableContainer:focus': {
			outline: 'none',
		},
		'&.MuiDataGrid-root .MuiDataGrid-columnHeader--sortable:focus': {
			outline: 'none',
		},
		'&.MuiDataGrid-root .MuiDataGrid-columnHeaderTitleContainer:focus': {
			outline: 'none',
		},
	},
});

const CustomDataGrid = ({ rows, columns }) => {
	const classes = useStyles();
	const [pageSize, setPageSize] = useState(10);

	return (
		<DataGrid
			className={classes.root}
			rows={rows}
			columns={columns}
			pageSize={pageSize}
			rowsPerPageOptions={[10, 25, 50]}
			onPageSizeChange={p => setPageSize(p)}
			disableSelectionOnClick
			disableColumnMenu
		/>
	);
};

export default CustomDataGrid;
