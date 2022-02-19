export interface QueryParameters<T> {
	pagination?: PaginationQueryParameter;
	sort?: SortQueryParameter<T>[];
	filters?: FilterQueryParameter<T>[];
}

export type SortQueryParameter<T> = {
	column: string;
	direction: SortDirection;
};

export type PaginationQueryParameter = {
	offset: number;
	limit: number;
};

export type FilterQueryParameter<T> = {
	column: keyof T;
	value: string | number | boolean;
};

export type SortDirection = "asc" | "desc";