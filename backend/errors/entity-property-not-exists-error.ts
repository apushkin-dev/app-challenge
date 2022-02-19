export class EntityPropertyNotExistsError extends Error {
	public constructor(message: string) {
		super(message);

		this.name = "EntityPropertyNotExistsError";
		Object.setPrototypeOf(this, EntityPropertyNotExistsError.prototype);
	}
}