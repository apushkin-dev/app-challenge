export class FormatError extends Error {
	public constructor(message: string) {
		super(message);

		this.name = "FormatError";
		Object.setPrototypeOf(this, FormatError.prototype);
	}
}