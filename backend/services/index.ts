import { ClientsService } from "./clients-service";
import { UserService } from "./user-service";

export class Services {
	public readonly clients = new ClientsService();
	public readonly users = new UserService();
}

const services = new Services();

export { services };