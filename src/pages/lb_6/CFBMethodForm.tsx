import { MouseEventHandler, useState } from "react";
import { Form, FormProps } from "../../components/Form";
import { encrypt } from "../helpers/desEnc";
import { generateKeys } from "../helpers/des";

function CFBMethodForm() {
	const [form, setForm] = useState<FormProps>({
		key: "",
		input: "",
		textArea: "",
	});

	const pseudoRandomSequence =
		"0101000000101100101011000100010000000000010000000101000000101100";
	const encryptHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
		event.preventDefault();
		const key = generateKeys(form.key);
		const result = encrypt(key, pseudoRandomSequence);
	};

	const decryptHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
		event.preventDefault();
		const { key, input } = form;
	};

	return (
		<Form
			decrypt={decryptHandler}
			encrypt={encryptHandler}
			form={form}
			setForm={setForm}
		/>
	);
}

export { CFBMethodForm };
