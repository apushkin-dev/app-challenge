// mobx-react-form lacks of typings

// @ts-ignore
import MobxReactForm from "mobx-react-form";
// @ts-ignore
import vjf from "mobx-react-form/lib/validators/VJF";
import validator from "validator";

class BaseForm extends MobxReactForm {
	public constructor(fields: any) {
		super(
			fields,
			{
				options: {
					showErrorsOnChange: true,
					showErrorsOnBlur: true,
					validateOnChange: true,
					validateOnBlur: true,
					validateOnInit: false,
				},
				plugins: {
					vjf: vjf(validator),
				},
			},
		);
	}

	bindings() {
		return {
			textBinding: ({ $try, field, props }: any) => ({
				type: $try(props.type, field.type),
				id: $try(props.id, field.id),
				name: $try(props.name, field.name),
				value: $try(props.value, field.value),
				label: $try(props.label, field.label),
				placeholder: $try(props.placeholder, field.placeholder),
				helperText: $try(props.error, field.error),
				disabled: $try(props.disabled, field.disabled),
				onChange: $try(props.onChange, field.onChange),
				onBlur: $try(props.onBlur, field.onBlur),
				onFocus: $try(props.onFocus, field.onFocus),
				autoFocus: $try(props.autoFocus, field.autoFocus),
				required: $try(props.required, field.extra?.required ?? false),
				error: $try(props.error, !field.isValid),
			}),
			switchBinding: ({ $try, field, props } : any) => ({
				checked: $try(props.checked, field.value),
				onChange: $try(props.onChange, field.onChange),
			})
		};
	}
}

export class FormStore {
	private form: MobxReactForm;

	public constructor(fields: any) {
		this.form = new BaseForm({ fields }
		);
	}

	public validate(): Promise<{ isValid: boolean }> {
		return this.form.validate({ showErrors: true });
	}

	public getField(fieldKey: string) {
		return this.form.$(fieldKey);
	}

	public get values() {
		return this.form.values();
	}
}