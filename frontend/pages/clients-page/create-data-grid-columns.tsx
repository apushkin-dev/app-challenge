import React from "react";
import { MUIDataTableColumnDef, MUIDataTableMeta } from "mui-datatables";
import { Button, ButtonGroup, Switch } from "@material-ui/core";
import { Client } from "../../types";

interface DataGridColumnsOptions {
	onEdit: (client: Client) => void;
	onDelete: (client: Client) => void;
	onActiveValueChange: (clientId: number, isActive: boolean) => void;
}

function transformRowDataToClient(rowData: any[]): Client {
	return {
		id: rowData[0],
		firstName: rowData[1],
		lastName: rowData[2],
		email: rowData[3],
		phone: rowData[4],
		street: rowData[5],
		postalCode: rowData[6],
		city: rowData[7],
		country: rowData[8],
		isActive: rowData[9],
	};
}

export function createDataGridColumns({
	onEdit,
	onDelete,
	onActiveValueChange,
}: DataGridColumnsOptions): MUIDataTableColumnDef[] {
	function handleActiveValueChange(clientId: number) {
		return (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
			onActiveValueChange(clientId, checked);
		};
	}

	function handleDelete(value: any, tableMeta: MUIDataTableMeta) {
		return () => {
			onDelete(transformRowDataToClient(tableMeta.rowData));
		};
	}

	function handleEdit(value: any, tableMeta: MUIDataTableMeta) {
		return () => {
			onEdit(transformRowDataToClient(tableMeta.rowData));
		};
	}

	return [
		{
			name: "id",
			label: "Id",
			options: {
				sort: false,
			},
		},
		{
			name: "firstName",
			label: "First Name",
			options: {
				sort: true,
			},
		},
		{
			name: "lastName",
			label: "Last Name",
			options: {
				sort: true,
			},
		},
		{
			name: "email",
			label: "Email",
			options: {
				sort: false,
			},
		},
		{
			name: "phone",
			label: "Phone",
			options: {
				sort: false,
			},
		},
		{
			name: "street",
			label: "Street",
			options: {
				sort: false,
			},
		},
		{
			name: "postalCode",
			label: "Postal Code",
			options: {
				sort: false,
			},
		},
		{
			name: "city",
			label: "City",
			options: {
				sort: false,
			},
		},
		{
			name: "country",
			label: "Country",
			options: {
				sort: false,
			},
		},
		{
			name: "isActive",
			label: "Active",
			options: {
				sort: false,
				customBodyRender: (value: any, tableMeta: MUIDataTableMeta) => {
					return (
						<Switch
							checked={value}
							onChange={handleActiveValueChange(tableMeta.rowData[0])}
							color="primary"
						/>
					);
				},
			},
		},
		{
			name: "id",
			label: "Actions",
			options: {
				sort: false,
				customBodyRender: (value: any, tableMeta: MUIDataTableMeta) => {
					return (
						<ButtonGroup color="primary" aria-label="outlined primary button group">
							<Button onClick={handleEdit(value, tableMeta)}>Edit</Button>
							<Button onClick={handleDelete(value, tableMeta)}>Delete</Button>
						</ButtonGroup>
					);
				},
			},
		},
	];
}
