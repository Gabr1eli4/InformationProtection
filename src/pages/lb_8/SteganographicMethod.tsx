import { MouseEventHandler, useState } from "react"
import { Form, FormProps } from "../../components/Form"
import { binToDec, decToBin } from "../../utils"

function SteganographicMethod() {
	const [form, setForm] = useState<FormProps>({
		key: "",
		input: "",
		textArea: "",
	})

	// message: string - Текст-Контейнер
	// length: number - Количество бит шифруемого текста
	const messageProcessing = (message: string, input: string) => {
		const separator = ".?!";
		let result = "";
		let numOfSpaces;
		let indexToBin = 0;
		console.log(input);
		for (let i = 0; i < message.length; i++) {
			numOfSpaces = 0;

			if (input[indexToBin] === null || input[indexToBin] === undefined) {
				result += "^"
				result += message.slice(i);
				return result;
			}

			while (separator.includes(message[i])) {
				result += message[i];
				i++;
			}

			while(message[i] === " ") {
				numOfSpaces++;
				i++;
			}

			if (numOfSpaces > 0) {
				i--;
				if (input[indexToBin] === "0") {
					result += "  ";
				} else if (input[indexToBin] === "1") {
					result += " ";
				}
				indexToBin++;
			} else {
				result += message[i];
			}
		}
		if (input[indexToBin] !== null || input[indexToBin] !== undefined) return "Текст-контейнер недостаточной длины для шифрования";
	}

	const decrypt = (input: string) => {
		let result = "";
		let numOfSpaces;
		for (let i = 0; i < input.length; i++) {
			if (input[i] === "^") break;
			numOfSpaces = 0;
			while(input[i] === " ") {
				numOfSpaces++;
				i++;
			}
			if (numOfSpaces > 0) {
				result += numOfSpaces > 1 ? "0": "1";
				i--;
			}
		}
		return binToDec(result, 8);
	}

	const encryptHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
		event.preventDefault();
		const key = form.key;
		const input = form.input;
		if (input && key) {
			const binInput: string = decToBin(input, 8);
			const result =messageProcessing(key, binInput);
			setForm((prev) => ({ ...prev, textArea: result }))
		}
	}

	const decryptHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
		event.preventDefault();
		
		const result = decrypt(form.input);
		console.log(result);
		setForm((prev) => ({ ...prev, textArea: result }));
	}

	return <Form form={form} setForm={setForm} encrypt={encryptHandler} decrypt={decryptHandler}></Form>
}


export { SteganographicMethod }