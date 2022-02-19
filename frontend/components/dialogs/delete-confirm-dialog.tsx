import React from "react";
import { DialogContentText } from "@material-ui/core";
import { DialogPresenter } from "./dialog-presenter";

export class DeleteConfirmDialog {
	private readonly presenter = new DialogPresenter("Deletion confirmation");
	private message: string;

	public constructor(fullName: string, private onSubmit: () => Promise<void>) {
		this.message = `Are you sure you want to delete ${fullName}?`;
	}

	public show() {
		this.presenter.show(<DialogContentText>{this.message}</DialogContentText>, this.handleSubmit);
	}

	private handleSubmit = async () => {
		this.onSubmit();
		this.presenter.close();
	}
}