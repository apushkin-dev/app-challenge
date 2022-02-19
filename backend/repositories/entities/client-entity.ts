import { Model, Optional } from "sequelize";

export interface ClientAttributes {
	id: number;
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
	street: string;
	postalCode: string;
	city: string;
	country: string;
	isActive: boolean;
}

export interface ClientCreationAttributes extends Optional<ClientAttributes, "id"> {}

export class ClientEntity extends Model<ClientAttributes, ClientCreationAttributes> implements ClientAttributes {
	public readonly id: number;

	public city: string;
	public country: string;
	public email: string;
	public firstName: string;
	public isActive: boolean;
	public lastName: string;
	public phone: string;
	public postalCode: string;
	public street: string;
}