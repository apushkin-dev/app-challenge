import { ClientAttributes } from "../entities/client-entity";
import { FindAndCountOptions, Op, OrderItem } from "sequelize";
import { QueryParameters } from "../types";

export function convertQueryParameters<T>(queryParameters?: QueryParameters<T>) {
	const { pagination, sort, filters } = queryParameters ?? {};
	const paginationOptions = pagination ?? {};
	const sortOptions: { order: OrderItem[] } =
		sort != null && sort.length > 0
			? {
					order: sort.map((sortItem) => [sortItem.column, sortItem.direction]),
			  }
			: null;
	const filterOptions =
		filters != null && filters.length > 0
			? {
					where: {
						[Op.and]: filters.map(({ column, value }) => ({ [column]: value })),
					},
			  }
			: {};

	const options: FindAndCountOptions<ClientAttributes> = {
		...paginationOptions,
		...sortOptions,
		...filterOptions,
	};

	return options;
}
