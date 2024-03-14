import { MouseEventHandler, useState } from "react"
import { Form, FormProps } from "../../components/Form"
import { Processing } from "../../utils"

function SteganographicMethod() {
	const [form, setForm] = useState<FormProps>({
		key: "",
		input: "",
		textArea: "",
	});

	const Process = new Processing(".?!", "  ", "", "^");

	const encryptHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
		event.preventDefault();
		const key = form.key;
		const input = form.input;
		if (input && key) {
			const result = Process.messageProcessing(key, input);
			setForm((prev) => ({ ...prev, textArea: result }))
		}
	}

	const decryptHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
		event.preventDefault();
		
		const result = Process.messageProcessingDecrypt(form.input);
		console.log(result);
		setForm((prev) => ({ ...prev, textArea: result }));
	}

	return <Form form={form} setForm={setForm} encrypt={encryptHandler} decrypt={decryptHandler}></Form>
}


export { SteganographicMethod }