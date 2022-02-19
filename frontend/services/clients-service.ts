import { Client } from "../types";

interface Pagination {
	limit: number;
	offset: number;
}

type SortOrder = [string, string];
type Filters = [string, string | number | boolean];

function handleErrors(response: Response) {
	if (!response.ok) {
		throw Error(response.statusText);
	}
	return response;
}

function runFetchOperation(url: string, init?: RequestInit) {
	return fetch(url, init)
		.then(handleErrors);
}

async function runOperation<T>(op: () => Promise<T>) {

	try {
		const result: T = await op();
		return result;
	} catch (err) {
		alert(err);
	}
}

export class ClientsService {
	public async fetchData({
		pagination,
		sort,
		filters,
	}: {
		pagination: Pagination;
		sort?: SortOrder;
		filters?: Filters;
	}) {
		return runOperation(async () => {
			const urlSearchParams = new URLSearchParams();
			urlSearchParams.append("limit", String(pagination.limit));
			urlSearchParams.append("offset", String(pagination.offset));

			if (sort) {
				const [column, direction] = sort;
				const value = `${direction === "desc" ? "-" : "+"}${column}`;

				urlSearchParams.append("sort", value);
			}

			if (filters) {
				const [column, value] = filters;
				urlSearchParams.append(column, String(value));
			}

			const response = await runFetchOperation("/api/clients?" + urlSearchParams);
			return response.json();
		});
	}

	public async createClient(client: Client) {
		return runOperation(async () => {
			const response = await runFetchOperation(`/api/clients`, {
				method: "POST",
				body: JSON.stringify(client),
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			});

			return response.json();
		});
	}

	public async updateClient(client: Client) {
		return runOperation(async () => {
			const response = await runFetchOperation(`/api/clients/${client.id}`, {
				method: "PUT",
				body: JSON.stringify(client),
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			});

			return response.json();
		});
	}

	public async deleteClient(clientId: number) {
		return runOperation(async () => {
			const response = await runFetchOperation(`/api/clients/${clientId}`, {
				method: "DELETE",
			});

			return response.json();
		});
	}

	public async updateClientActiveState(clientId: number, isActive: boolean) {
		return runOperation(async () => {
			const response = await runFetchOperation(`/api/clients/${clientId}`, {
				method: "PATCH",
				body: JSON.stringify({ isActive }),
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			});

			return response.json();
		});
	}
}
