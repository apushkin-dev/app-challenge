import { DataTypes, Sequelize } from "sequelize";
import { ClientEntity } from "./entities/client-entity";
import { UserEntity, UserRole } from "./entities/user-entity";
import { testData } from "./test-client-data";

const sequelize = new Sequelize("sqlite::memory:", {
	logging: false,
});

UserEntity.init(
	{
		id: {
			primaryKey: true,
			type: DataTypes.INTEGER,
			autoIncrement: true,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		passwordHash: {
			type: DataTypes.STRING,
		},
		role: {
			type: DataTypes.INTEGER,
		},
	},
	{ sequelize, tableName: "users", timestamps: false },
);

ClientEntity.init(
	{
		id: {
			primaryKey: true,
			type: DataTypes.INTEGER,
			autoIncrement: true,
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		phone: {
			type: DataTypes.STRING,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		street: {
			type: DataTypes.STRING,
		},
		postalCode: {
			type: DataTypes.STRING,
		},
		city: {
			type: DataTypes.STRING,
		},
		country: {
			type: DataTypes.STRING,
		},
		isActive: {
			type: DataTypes.BOOLEAN,
		},
	},
	{ sequelize, tableName: "clients", timestamps: false },
);

async function initTestData() {
	await ClientEntity.bulkCreate(testData);

	await UserEntity.create({
		passwordHash: "c9Gxsbwdq/uX8hbYl7eWjkSwZFeSDwDy3Gwe074lrUw=",
		username: "admin",
		role: UserRole.Admin,
	});
}

export async function initDbSchema() {
	await UserEntity.sync();
	await ClientEntity.sync();

	await initTestData();
}
