export class ParametersError extends Error {
	public constructor(message: string) {
		super(message);

		this.name = "ParametersError";
		Object.setPrototypeOf(this, ParametersError.prototype);
	}
}