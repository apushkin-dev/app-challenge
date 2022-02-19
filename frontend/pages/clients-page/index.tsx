import React from "react";
import { Backdrop, CircularProgress } from "@material-ui/core";

import { clientsService } from "../../services";
import { ClientCreateDialog, ClientEditDialog, DeleteConfirmDialog } from "../../components/dialogs";
import { ClientsDataGrid } from "./clients-data-grid";
import { clientsPageReducer, ClientsPageState, ClientPageContext } from "./clients-page-context";
import { Client } from "../../types";

const initialState: ClientsPageState = {
	data: [],
	count: 0,
	query: {
		pagination: {
			offset: 0,
			limit: 10,
		},
		sort: null,
		filters: null,
	},
	hideActiveClients: false,
	isFetching: false,
};

export function ClientsPage() {
	const [state, dispatch] = React.useReducer(clientsPageReducer, initialState);

	React.useEffect(() => {
		fetchData();
	}, [state.query]);

	async function fetchData() {
		try {
			dispatch({ type: "fetching" });
			const { count, content } = await clientsService.fetchData(state.query);
			dispatch({ type: "dataReceived", content, count });
		} finally {
			dispatch({ type: "fetched" });
		}
	}

	function handleDelete(client: Client) {
		const confirmDialog = new DeleteConfirmDialog(`${client.firstName} ${client.lastName}`, async () => {
			try {
				dispatch({ type: "fetching" });
				await clientsService.deleteClient(client.id);

				const { content, count } = await clientsService.fetchData(state.query);
				dispatch({ type: "dataReceived", content, count });
			} finally {
				dispatch({ type: "fetched" });
			}
		});
		confirmDialog.show();
	}

	function handleEdit(client: Client) {
		const dialog = new ClientEditDialog(client,async (data: Client) => {
			try {
				dispatch({ type: "fetching" });
				await clientsService.updateClient(data);

				const { content, count } = await clientsService.fetchData(state.query);
				dispatch({ type: "dataReceived", content, count });
			} finally {
				dispatch({ type: "fetched" });
			}
		});
		dialog.show();
	}

	function handleCreate() {
		const dialog = new ClientCreateDialog(async (data: Client) => {
			try {
				dispatch({ type: "fetching" });
				await clientsService.createClient(data);

				const { content, count } = await clientsService.fetchData(state.query);
				dispatch({ type: "dataReceived", content, count });
			} finally {
				dispatch({ type: "fetched" });
			}
		});
		dialog.show();
	}

	async function handleActiveValueChange(clientId: number, isActive: boolean) {
		try {
			dispatch({ type: "fetching" });
			await clientsService.updateClientActiveState(clientId, isActive);

			const { content, count } = await clientsService.fetchData(state.query);
			dispatch({ type: "dataReceived", content, count });
		} finally {
			dispatch({ type: "fetched" });
		}
	}

	return (
		<>
			<ClientPageContext.Provider value={{ state, dispatch }}>
				<ClientsDataGrid
					onEdit={handleEdit}
					onDelete={handleDelete}
					onActiveValueChange={handleActiveValueChange}
					onCreate={handleCreate}
				/>
			</ClientPageContext.Provider>

			{state.isFetching && (
				<Backdrop style={{ zIndex: 1000 }} open>
					<CircularProgress color="inherit" disableShrink />
				</Backdrop>
			)}
		</>
	);
}
