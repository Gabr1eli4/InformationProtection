import { MouseEventHandler, useState } from "react"
import { Form, FormProps } from "../../components/Form"
import { decToBin } from "../../utils"

function SteganographicMethod() {
	const [form, setForm] = useState<FormProps>({
		key: "",
		input: "",
		textArea: "",
	})

	// message: string - Текст-Контейнер
	// length: number - Количество бит шифруемого текста
	const messageProcessing = (message: string, length: number, separator: string | Array<string>) => {
		// const sentenceEndsRegex = /[.!?]\s/g;
		// const matches = message.matchAll(sentenceEndsRegex);

		// const endIndices: number[] = [];
		// for (const match of matches) {
		// 	endIndices.push(match.index! + match[0].length);
		// }
		
		for (let i = 0; i < message.length; i++) {
			if (separator.includes(message[i])) {
				
			}
		}
	}

	const encryptHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
		event.preventDefault();
		const key = form.key;
		const input = form.input;
		if (input && key) {
			const binInput: Array<string> = decToBin(input, 8);
			messageProcessing(key, binInput.length * binInput[0].length);
		}
	}

	const decryptHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
		event.preventDefault();
		
	}

	return <Form form={form} setForm={setForm} encrypt={encryptHandler} decrypt={decryptHandler}></Form>
}

export { SteganographicMethod }