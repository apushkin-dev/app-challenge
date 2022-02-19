export class EntityNotExistsError extends Error {
	public constructor(message: string) {
		super(message);

		this.name = "EntityNotExistsError";
		Object.setPrototypeOf(this, EntityNotExistsError.prototype);
	}
}
