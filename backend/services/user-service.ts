import crypto from "crypto";
import { repositories } from "../repositories"
import { logger } from "../logger";
import { UserCreationAttributes, UserRole } from "../repositories/entities/user-entity";
import { EntityNotExistsError } from "../errors";

function hashPassword(password: string) {
	const sha256 = crypto.createHash("sha256");
	return sha256.update(password).digest("base64");
}

export class UserService {
	public async create(username: string, password: string, role: UserRole = UserRole.Viewer) {
		const existingUser = await repositories.users.findByUserName(username);

		if (existingUser) {
			throw new Error(`User ${username} already exists.`);
		}

		const userAttributes: UserCreationAttributes = {
			passwordHash: hashPassword(password),
			username,
			role,
		}

		const { passwordHash, ...user } = await repositories.users.create(userAttributes);

		logger.write(`User ${user.id} was created.`);

		return user;
	}

	public async authenticate(username: string, password: string) {
		const existingUser = await repositories.users.findByUserName(username);

		if (existingUser === null) {
			throw new EntityNotExistsError("User not found.");
		}

		const { passwordHash, ...user } = existingUser;

		if (passwordHash !== hashPassword(password)) {
			throw new Error("User authentication failed.");
		}

		return user;
	}

	public async assignRoleToUser(userId: number, role: UserRole) {
		const { passwordHash, ...user } = await repositories.users.update(userId, { role });
		logger.write(`User ${userId} role was updated to ${role}.`);
		return user;
	}
}