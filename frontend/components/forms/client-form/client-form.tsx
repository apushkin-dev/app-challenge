import React from "react";
import { observer } from "mobx-react";
import { FormControl, FormControlLabel, Switch, TextField } from "@material-ui/core";
import { ClientFormStore } from "./client-form-store";

interface Props {
	formStore: ClientFormStore;
}

export const ClientForm = observer(({ formStore }: Props) => {
	return (
		<FormControl fullWidth>
			<TextField autoFocus margin="dense" fullWidth {...formStore.getField("firstName").bind()} />
			<TextField margin="dense" fullWidth {...formStore.getField("lastName").bind()} />
			<TextField margin="dense" fullWidth {...formStore.getField("email").bind()} />
			<TextField margin="dense" fullWidth {...formStore.getField("phone").bind()} />
			<TextField margin="dense" fullWidth {...formStore.getField("street").bind()} />
			<TextField margin="dense" fullWidth {...formStore.getField("postalCode").bind()} />
			<TextField margin="dense" fullWidth {...formStore.getField("city").bind()} />
			<TextField margin="dense" fullWidth {...formStore.getField("country").bind()} />
			<FormControlLabel
				control={<Switch checked={true} color="primary" {...formStore.getField("isActive").bind()} />}
				label="Active"
			/>
		</FormControl>
	);
});
