import { initDbSchema } from "./sequelize";
import { ClientsRepository } from "./client-repository";
import { UsersRepository } from "./users-repository";

export class Repositories {
	public readonly clients = new ClientsRepository();
	public readonly users = new UsersRepository();

	public async init() {
		await initDbSchema();
	}
}

const repositories = new Repositories();

export { repositories };