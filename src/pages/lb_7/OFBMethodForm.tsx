import { MouseEventHandler, useState } from "react";
import { Form, FormProps } from "../../components/Form"
import { binToDec, decToBin, gamming, generateKeys, getBitBlock, shift } from "../helpers/des";
import { des } from "../helpers/desEnc";

function OFBMethodForm() {
  const [form, setForm] = useState<FormProps>({
    key: "",
    input: "",
    textArea: "",
  });

	let pseudoRandomSequence =
		"0101000000101100101011000100010000000000010000000101000000101100";
	const encryptHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
		event.preventDefault();
		const k = 8;
		const key = generateKeys(form.key);
		const input = form.input.padEnd(Math.ceil(form.input.length / k) * k, " ");
		let result = "";
		for (let i = 0; i < input.length / k; i++) {
			const temp = des(key, pseudoRandomSequence, k);
			const enc = new Uint8Array(decToBin(temp).join("").split("").map(item => +item));
			const blockOfInput = input.slice(i * k, (i + 1) * k).split("");
			const blockOfCode = getBitBlock(blockOfInput);

			pseudoRandomSequence = shift(new Uint8Array(pseudoRandomSequence.split("").map(item => +item)), k).toString();

			const bruh = gamming(blockOfCode, enc);

			result += binToDec(bruh.join(""), k).join("");
		}
		setForm(prev => ({ ...prev, textArea: result}));
		console.log(result);
	};

	const decryptHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
		event.preventDefault();
		const k = 8;
		const key = generateKeys(form.key);
		// const input = form.input.padEnd(Math.ceil(form.input.length / k) * k, " ");
		const input = form.textArea;
		let result = "";
		console.log(pseudoRandomSequence);
		for (let i = 0; i < input.length / k; i++) {
			const enc = new Uint8Array(decToBin(des(key, pseudoRandomSequence, k)).join("").split("").map(item => +item));
			const blockOfInput = input.slice(i * k, (i + 1) * k).split("");
			const blockOfCode = getBitBlock(blockOfInput);

			pseudoRandomSequence = shift(new Uint8Array(pseudoRandomSequence.split("").map(item => +item)), k).toString();

			const bruh = gamming(blockOfCode, enc);

			result += binToDec(bruh.join(""), k).join("");
		}
		setForm(prev => ({ ...prev, textArea: result}));
	};

  return <Form encrypt={encryptHandler} decrypt={decryptHandler} form={form} setForm={setForm} keyValidate={(key) => key.length % 8 === 0}/>
}

export { OFBMethodForm };