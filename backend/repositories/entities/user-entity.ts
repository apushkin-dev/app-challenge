import { Model, Optional } from "sequelize";

export enum UserRole {
	Admin = 1,
	Viewer= 2,
}

export interface UserAttributes {
	id: number;
	username: string;
	passwordHash: string;
	role: UserRole;
}

export interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

export class UserEntity extends Model<UserAttributes, UserCreationAttributes> implements UserCreationAttributes {
	public readonly id: number;

	public username: string;
	public passwordHash: string;
	public role: UserRole;
}