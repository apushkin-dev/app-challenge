import React from "react";
import { DialogPresenter } from "./dialog-presenter";
import { ClientFormStore, ClientForm } from "../forms/client-form";
import { Client } from "../../types";

export class ClientEditDialog {
	private readonly presenter = new DialogPresenter("Edit client");
	private readonly formStore: ClientFormStore;

	public constructor(private readonly client: Client, private onSubmit: (client: Client) => Promise<void>) {
		this.formStore = new ClientFormStore(client);
	}

	public show() {
		this.presenter.show(<ClientForm formStore={this.formStore} />, this.handleSubmit);
	}

	private handleSubmit = async () => {
		const { isValid } = await this.formStore.validate();

		if (isValid) {
			this.onSubmit({ ...this.formStore.values, id: this.client.id });
			this.presenter.close();
		}
	};
}
