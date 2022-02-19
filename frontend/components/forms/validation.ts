export function isRequired({ field, validator }: any) {
	return [!validator.isEmpty(field.value), `${field.label} is required.`];
}

export const isEmail = ({ field, validator }: any) => {
	return [
		validator.isEmail(field.value),
		`The ${field.label} should be an email address.`,
	];
}