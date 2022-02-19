import { FormStore } from "../form-store";
import { createFields } from "./create-fields";
import { Client } from "../../../types";

export class ClientFormStore extends FormStore {
	public constructor(client?: Client) {
		super(createFields(client));
	}
}