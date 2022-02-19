import { FormatError } from "../../errors";

export function parseNumber(str: string) {
	const number = Number(str);

	if (!Number.isFinite(number)) {
		throw new FormatError(`'${str}' is not a number.`);
	}

	return number;
}