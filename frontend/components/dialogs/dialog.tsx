import React from "react";
import { Button, Dialog as DialogUiCore, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";

export interface DialogProps {
	onClose: () => void;
	onSubmit: () => void;
	children?: React.ReactNode;
	title: string;
}

export function Dialog({ onClose, onSubmit, children, title }: DialogProps) {
	return (
		<DialogUiCore
			open
			keepMounted={false}
			onClose={onClose}
			fullWidth
			maxWidth="sm"
		>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				{children}
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} color="secondary">
					Cancel
				</Button>
				<Button onClick={onSubmit} color="primary">
					Continue
				</Button>
			</DialogActions>
		</DialogUiCore>
	);
}
