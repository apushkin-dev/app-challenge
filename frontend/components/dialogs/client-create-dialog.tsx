import React from "react";
import { DialogPresenter } from "./dialog-presenter";
import { ClientFormStore, ClientForm } from "../forms/client-form";
import { Client } from "../../types";

export class ClientCreateDialog {
	private readonly presenter = new DialogPresenter("Create client");
	private readonly formStore: ClientFormStore;

	public constructor(private onSubmit: (data: Client) => Promise<void>) {
		this.formStore = new ClientFormStore();
	}

	public show() {
		this.presenter.show(<ClientForm formStore={this.formStore} />, this.handleSubmit);
	}

	private handleSubmit = async () => {
		const { isValid } = await this.formStore.validate();

		if (isValid) {
			this.onSubmit(this.formStore.values);
			this.presenter.close();
		}
	};
}
