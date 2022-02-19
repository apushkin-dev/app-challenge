import React from "react";
import MUIDataTable, { MUIDataTableColumnDef, MUIDataTableOptions } from "mui-datatables";
import { Button, FormControlLabel, Switch } from "@material-ui/core";
import { createDataGridColumns } from "./create-data-grid-columns";
import { ClientPageContext } from "./clients-page-context";
import { Client } from "../../types";

interface Props {
	onEdit: (client: Client) => void;
	onDelete: (client: Client) => void;
	onActiveValueChange: (clientId: number, isActive: boolean) => void;
	onCreate: () => void;
}

export function ClientsDataGrid({ onEdit, onDelete, onActiveValueChange, onCreate }: Props) {
	const columns = React.useRef<MUIDataTableColumnDef[]>();
	const { state, dispatch } = React.useContext(ClientPageContext);

	React.useEffect(() => {
		columns.current = createDataGridColumns({ onEdit, onDelete, onActiveValueChange });
	}, [onEdit, onDelete, onActiveValueChange ]);

	function handlePageChange(page: number) {
		dispatch({ type: "changePage", page });
	}

	function handleColumnSortChange(column: string, direction: string) {
		dispatch({ type: "updateSort", value: [column, direction] });
	}

	function handleChangeHideActive(e: React.ChangeEvent<HTMLInputElement>, checked: boolean) {
		dispatch({ type: "hideActiveClients", value: checked });
	}

	const options: MUIDataTableOptions = {
		print: false,
		fixedHeader: true,
		download: false,
		search: false,
		filter: false,
		fixedSelectColumn: true,
		serverSide: true,
		rowsPerPage: state.query.pagination.limit,
		rowsPerPageOptions: [],
		selectableRows: "none",
		viewColumns: false,
		page: state.query.pagination.offset / state.query.pagination.limit,
		count: state.count,
		onChangePage: handlePageChange,
		onColumnSortChange: handleColumnSortChange,
		customToolbar: () => {
			return (
				<div style={{ display: "flex", justifyContent: "flex-end" }}>
					<FormControlLabel
						control={<Switch checked={state.hideActiveClients} onChange={handleChangeHideActive} color="primary" />}
						label="Hide inactive users"
					/>
				</div>
			)
		}
	};

	return (
		<div>
			<h1>Client administration</h1>

			<MUIDataTable
				title={<Button onClick={onCreate}>Create</Button>}
				data={state.data}
				columns={columns.current}
				options={options}
			/>
		</div>
	);
}

