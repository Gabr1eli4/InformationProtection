import { MouseEventHandler, useState } from "react";
import { Form, FormProps } from "../../components/Form";
import { generateKeys } from "../helpers/des";
import { encrypt } from "../helpers/desEnc";

function ECBMethodForm() {
	const [form, setForm] = useState<FormProps>({
		key: "",
		input: "",
		textArea: "",
	});
	let key: Uint8Array[] = [];

	const encryptHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
		event.preventDefault();
		key = generateKeys(form.key);
		const paddedInput = form.input.padEnd(
			Math.ceil(form.input.length / 8) * 8,
			" "
		);

		const result = encrypt(key, paddedInput);
		setForm((prev) => ({ ...prev, textArea: result }));
	};

	const decryptHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
		event.preventDefault();
		key = generateKeys(form.key).reverse();
		const result = encrypt(key, form.textArea);
		setForm((prev) => ({ ...prev, textArea: result }));
	};

	return (
		<Form
			encrypt={encryptHandler}
			decrypt={decryptHandler}
			form={form}
			setForm={setForm}
			keyValidate={(key) => key.length % 8 === 0}
			inputValidate={() => true}
		/>
	);
}

export { ECBMethodForm };
