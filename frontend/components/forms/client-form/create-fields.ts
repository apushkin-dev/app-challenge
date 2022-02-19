import { isEmail, isRequired } from "../validation";
import { Client } from "../../../types";

export function createFields(client?: Client) {
	return [
		{
			name: "firstName",
			value: client?.firstName ?? "",
			label: "First Name",
			placeholder: "Insert First Name",
			validators: [isRequired],
			bindings: "textBinding",
			extra: {
				required: true,
			}
		},
		{
			name: "lastName",
			value: client?.lastName ?? "",
			label: "Last Name",
			placeholder: "Insert Last Name",
			validators: [isRequired],
			bindings: "textBinding",
			extra: {
				required: true,
			}
		},
		{
			name: "email",
			value: client?.email ?? "",
			label: "Email",
			placeholder: "Insert Email Address",
			validators: [isRequired, isEmail],
			bindings: "textBinding",
			extra: {
				required: true,
			}
		},
		{
			name: "phone",
			value: client?.phone ?? "",
			label: "Phone",
			placeholder: "Insert Phone",
			bindings: "textBinding",
		},
		{
			name: "street",
			value: client?.street ?? "",
			label: "Street",
			placeholder: "Insert Street",
			bindings: "textBinding",
		},
		{
			name: "postalCode",
			value: client?.postalCode ?? "",
			label: "Postal Code",
			placeholder: "Insert Postal Code",
			bindings: "textBinding",
		},
		{
			name: "city",
			value: client?.city ?? "",
			label: "City",
			placeholder: "Insert City",
			bindings: "textBinding",
		},
		{
			name: "country",
			value: client?.country ?? "",
			label: "Country",
			placeholder: "Insert Country",
			bindings: "textBinding",
		},
		{
			name: "isActive",
			value: client?.isActive ?? true,
			label: "Active",
			bindings: "switchBinding",
		}
	];
}