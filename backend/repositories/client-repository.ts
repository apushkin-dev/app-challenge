import {
	ClientEntity,
	ClientCreationAttributes,
	ClientAttributes
} from "./entities/client-entity";
import { convertQueryParameters } from "./helpers/query-parameters";
import { Error, DatabaseError, EmptyResultError } from "sequelize";
import { QueryParameters } from "./types";
import { EntityNotExistsError, EntityPropertyNotExistsError } from "../errors";

function rethrowError(err: Error) {
	if (err instanceof DatabaseError) {
		const columnNotExistsResult = /SQLITE_ERROR: no such column: ClientEntity\.(?<column>.*)/.exec(err.message);

		if (columnNotExistsResult !== null) {
			const { column } = columnNotExistsResult.groups;

			throw new EntityPropertyNotExistsError(`Property ${column} not exists.`);
		}
	}

	if (err instanceof EmptyResultError) {
		throw new EntityNotExistsError("Client entity not exists.")
	}

	throw err;
}

export class ClientsRepository {
	public async create(data: ClientCreationAttributes) {
		try {
			const entity = await ClientEntity.create(data);

			return entity.toJSON() as ClientAttributes;
		} catch (err) {
			rethrowError(err);
		}
	}

	public async update(id: number, data: Partial<ClientAttributes>) {
		try {
			const clientEntity = await ClientEntity.findByPk(id, {
				rejectOnEmpty: true,
			});
			const fields = Object.keys(data) as Array<keyof Partial<ClientAttributes>>;

			clientEntity.setAttributes(data);
			await clientEntity.save({ fields });

			return clientEntity.toJSON()  as ClientAttributes;
		} catch (err) {
			rethrowError(err);
		}
	}

	public async delete(id: number) {
		try {
			const clientEntity = await ClientEntity.findByPk(id, {
				rejectOnEmpty: true,
			});

			await clientEntity.destroy();
		} catch (err) {
			rethrowError(err);
		}
	}

	public async getList(queryParameters?: QueryParameters<ClientAttributes>) {
		try {
			const options = convertQueryParameters(queryParameters);
			const { count, rows } = await ClientEntity.findAndCountAll(options);

			return {
				count,
				content: rows.map(entity => entity.toJSON() as ClientAttributes),
			}
		} catch (err) {
			rethrowError(err);
		}
	}

	public async get(id: number) {
		try {
			const entity = await ClientEntity.findByPk(id, {
				rejectOnEmpty: true,
			});

			return entity.toJSON() as ClientAttributes;
		} catch (err) {
			rethrowError(err);
		}
	}
}
