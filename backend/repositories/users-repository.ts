import { UserEntity, UserCreationAttributes, UserAttributes } from "./entities/user-entity";

export class UsersRepository {
	public async create(data: UserCreationAttributes) {
		const entity = await UserEntity.create(data);

		return entity.toJSON() as UserAttributes;
	}

	public async update(id: number, data: Partial<UserAttributes>) {
		const userEntity = await UserEntity.findByPk(id, {
			rejectOnEmpty: true,
		});
		const fields = Object.keys(data) as Array<keyof Partial<UserAttributes>>;

		userEntity.setAttributes(data);
		await userEntity.save({ fields });

		return userEntity.toJSON() as UserAttributes;
	}

	public async get(id: number) {
		const entity = await UserEntity.findByPk(id, {
			rejectOnEmpty: true,
		});

		return entity.toJSON() as UserAttributes;
	}

	public async findByUserName(username: string) {
		const entity = await UserEntity.findOne(
			{ where: { username: username } },
		);

		return entity ? entity.toJSON() as UserAttributes : null;
	}
}
