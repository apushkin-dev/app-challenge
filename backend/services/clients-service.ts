import { repositories } from "../repositories"
import { logger } from "../logger";
import {
	ClientAttributes,
	ClientCreationAttributes
} from "../repositories/entities/client-entity";
import { QueryParameters } from "../repositories/types";

export class ClientsService {
	public async create(clientAttributes: ClientCreationAttributes) {
		const client = await repositories.clients.create(clientAttributes);

		logger.write(`Client ${client.id} was created.`);
		return client
	}

	public async getList(params?: QueryParameters<ClientAttributes>) {
		return await repositories.clients.getList(params);
	}

	public async get(clientId: number) {
		return await repositories.clients.get(clientId);
	}

	public async update(clientId: number, clientAttributes: Partial<ClientAttributes>) {
		const client = await repositories.clients.update(clientId, clientAttributes);
		logger.write(`Client ${clientId} was updated.`);
		return client;
	}

	public async delete(clientId: number) {
		await repositories.clients.delete(clientId);
		logger.write(`Client ${clientId} was deleted.`);
	}
}