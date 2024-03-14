import { MouseEventHandler, useState } from "react";
import { Form, FormProps } from "../../components/Form";
import { Processing } from "../../utils";

function SecondSteganographicMethod() {
	const [form, setForm] = useState<FormProps>({
		key: "",
		input: "",
		textArea: "",
	});

	const zeroEncSymbol = String.fromCharCode(160);
	const oneEncSymbol = String.fromCharCode(32);
	const Process = new Processing("\n", zeroEncSymbol, oneEncSymbol, "^");

	const encHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
		event.preventDefault();

		const input = form.input;
		const key = form.key;
		if (input && key) {
			const result = Process.messageProcessing(key, input);
			setForm(( prev ) => ( { ...prev, textArea: result }));
		}
	}

	const decHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
		event.preventDefault();

		if (form.input) {
			const result = Process.messageProcessingDecrypt2(form.input);
			setForm((prev) => ({ ...prev, textArea: result }));
		}
	}

	return (
		<Form form={form} setForm={setForm} encrypt={encHandler} decrypt={decHandler} />
	)
}

export { SecondSteganographicMethod };