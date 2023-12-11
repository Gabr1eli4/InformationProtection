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

	// const decrypt = (key: Uint8Array[], input: string): string => {
	// 	let result = "";
	// 	for (let i = 0; i < input.length / 8; i++) {
	// 		const blockOfCode = input.slice(i * 8, (i + 1) * 8).split("");
	// 		let blockOfInput = getBitBlock(blockOfCode);

	// 		blockOfInput = permutation(blockOfInput, data.initialPermutation);

	// 		let left = blockOfInput.slice(0, 32);
	// 		let right = blockOfInput.slice(32);
	// 		for (let i = 0; i < 16; i++) {
	// 			const extension = permutation(right, data.eTable);
	// 			const gamma = gamming(extension, key[i]);

	// 			const flattened = sBoxCalc(gamma);
	// 			const block = permutation(flattened, data.pTable);
	// 			left = gamming(left, block);

	// 			if (i !== 15) {
	// 				[left, right] = [right, left];
	// 			}
	// 		}
	// 		const combine = new Uint8Array([...left, ...right]);
	// 		const chiper_text = permutation(combine, data.finalPermutation).join("");
	// 		result += binToDec(chiper_text, 8).join("");
	// 	}
	// 	return result;
	// };

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
