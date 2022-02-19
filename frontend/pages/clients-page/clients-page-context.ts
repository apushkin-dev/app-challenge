import * as React from "react";
import { Client } from "../../types";

export interface ClientsPageState {
	data: Client[];
	count: number;
	query: {
		pagination: {
			offset: number;
			limit: number;
		};
		sort: [string, string] | null;
		filters: [string, string | number | boolean] | null;
	};
	hideActiveClients: boolean;
	isFetching: boolean;
}

type Action =
	| { type: "fetching" }
	| { type: "fetched" }
	| { type: "dataReceived"; content: Client[]; count: number }
	| { type: "hideActiveClients"; value: boolean }
	| { type: "changePage"; page: number }
	| { type: "updateSort"; value: [string, string] };

export const ClientPageContext = React.createContext<{ state: ClientsPageState, dispatch: React.Dispatch<Action> }>(null);

export function clientsPageReducer(state: ClientsPageState, action: Action): ClientsPageState {
	switch (action.type) {
		case "fetched":
			return {
				...state,
				isFetching: false,
			}
		case "fetching":
			return {
				...state,
				isFetching: true,
			}
		case "dataReceived":
			return {
				...state,
				data: action.content,
				count: action.count,
			}
		case "hideActiveClients": {
			return {
				...state,
				hideActiveClients: action.value,
				query: {
					...state.query,
					filters: action.value ? ["isActive", true] : null,
				},
			}
		}
		case "updateSort": {
			return {
				...state,
				query: {
					...state.query,
					sort: action.value,
				}
			}
		}
		case "changePage": {
			return {
				...state,
				query: {
					...state.query,
					pagination: {
						...state.query.pagination,
						offset: action.page * state.query.pagination.limit,
					},
				}
			}
		}
		default:
			throw new Error(`Action type is not supported`);
	}
}
