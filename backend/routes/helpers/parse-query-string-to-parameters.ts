import { Query } from "express-serve-static-core";
import {
	FilterQueryParameter,
	PaginationQueryParameter, QueryParameters,
	SortDirection,
	SortQueryParameter,
} from "../../repositories/types";

const DefaultLimit = 100;
const DefaultOffset = 0;

export function parseQueryStringToQueryParameters<T>(query: Query): QueryParameters<T> {
	let paginationOptions: PaginationQueryParameter = { limit: DefaultLimit, offset: DefaultOffset };
	let sortOptions: SortQueryParameter<T>[] = [];
	let filterOptions: FilterQueryParameter<T>[] = [];

	for (const key of Object.keys(query)) {
		switch (key) {
			case "offset": {
				const offset = Number(query.offset);

				if (Number.isFinite(offset)) {
					paginationOptions.offset = offset;
				}
				break;
			}
			case "limit":
				{
					const limit = Number(query.limit);

					if (Number.isFinite(limit)) {
						paginationOptions.limit = limit;
					}
				}
				break;
			case "sort":
				const sort = query.sort;
				const sortItems = (Array.isArray(sort) ? sort : [sort]) as string[];

				sortOptions = sortItems.map((sortItem) => {
					let hasAffix = false;
					let direction: SortDirection = "asc";

					if (sortItem.startsWith("-")) {
						hasAffix = true;
						direction = "desc";
					} else if (sortItem.startsWith("+")) {
						hasAffix = true;
					}

					return {
						column: hasAffix ? sortItem.slice(1) : sortItem,
						direction,
					};
				});
				break;
			default:
				const values = (Array.isArray(query[key]) ? query[key] : [query[key]]) as string[];
				const column = key as keyof T;

				values.forEach((value) => {
					let parsedValue: string | number | boolean;

					if (["true", "false"].includes(value.toLowerCase())) {
						parsedValue = value.toLowerCase() === "true";
					} else if (Number.isFinite(Number(value))) {
						parsedValue = Number(value);
					} else {
						parsedValue = value;
					}

					filterOptions.push({
						column,
						value: parsedValue,
					});
				});
				break;
		}
	}

	return {
		...(filterOptions.length > 0 && { filters: filterOptions }),
		...(sortOptions.length > 0 && { sort: sortOptions }),
		pagination: paginationOptions,
	};
}
