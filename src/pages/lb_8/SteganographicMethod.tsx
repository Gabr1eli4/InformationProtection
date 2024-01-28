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
		for (let i = 0; i < message.length; i++) {
			if (separator.includes(message[i])) {
				let numOfSpaces = 0;
				i++;

				while(message[i] == " ") {
					if (message[i] === undefined) break;
					numOfSpaces++;
					i++;
				} 

				console.log("numOfSpaces", numOfSpaces);
				// Проверить наличие пробела
				// Удалить лишние пробелы
				// Добавить пробел если кодируется 0
				// Оставить один пробел если кодируется 1
			}
		}
	}

	const encryptHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
		event.preventDefault();
		const key = form.key;
		const input = form.input;
		if (input && key) {
			const binInput: Array<string> = decToBin(input, 8);
			messageProcessing(key, binInput.length * binInput[0].length, ".?!");
		}
	}

	const decryptHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
		event.preventDefault();
		
	}

	return <Form form={form} setForm={setForm} encrypt={encryptHandler} decrypt={decryptHandler}></Form>
}


export { SteganographicMethod }