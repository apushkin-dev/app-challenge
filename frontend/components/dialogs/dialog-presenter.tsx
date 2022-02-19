import React from "react";
import { unmountComponentAtNode, render } from "react-dom";
import { Dialog } from "./dialog";

export class DialogPresenter {
	private rootNode: HTMLDivElement | null = null;

	public constructor(private title: string ) {}

	public show(Content: React.ReactNode, onSubmit: () => void) {
		if (!this.rootNode) {
			this.rootNode = document.createElement("div");

			render(
				<Dialog title={this.title} onSubmit={onSubmit} onClose={this.close} children={Content} />,
				this.rootNode,
			);
		}
	}

	public close = () => {
		if (this.rootNode) {
			unmountComponentAtNode(this.rootNode);
			this.rootNode = null;
		}
	}
}
