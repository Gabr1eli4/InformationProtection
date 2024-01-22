import { MouseEventHandler, useState } from "react"
import { Form, FormProps } from "../../components/Form"

function SteganographicMethod() {
	const [form, setForm] = useState<FormProps>({
		key: "",
		input: "",
		textArea: "",
	})

	const messageProcessing = (message: string) => {
		console.log(message);
	}

	const encryptHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
		messageProcessing(form.input);
	}

	const decryptHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
		
	}

	return <Form form={form} setForm={setForm} encrypt={encryptHandler} decrypt={decryptHandler}></Form>
}

export { SteganographicMethod }