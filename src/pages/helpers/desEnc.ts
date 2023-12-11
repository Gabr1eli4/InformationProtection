import * as data from "./data";
import { binToDec, sBoxCalc, getBitBlock, permutation, gamming } from "./des";

export const encrypt = (key: Uint8Array[], input: string): string => {
	let result = "";
	for (let i = 0; i < input.length / 8; i++) {
		const blockOfCode = input.slice(i * 8, (i + 1) * 8).split("");
		let blockOfInput = getBitBlock(blockOfCode);

		blockOfInput = permutation(blockOfInput, data.initialPermutation);

		let left = blockOfInput.slice(0, 32);
		let right = blockOfInput.slice(32);
		for (let i = 0; i < 16; i++) {
			const extension = permutation(right, data.eTable);
			const gamma = gamming(extension, key[i]);

			const flattened = sBoxCalc(gamma);
			const block = permutation(flattened, data.pTable);
			left = gamming(left, block);

			if (i !== 15) {
				[left, right] = [right, left];
			}
		}
		const combine = new Uint8Array([...left, ...right]);
		const chiper_text = permutation(combine, data.finalPermutation).join("");
		result += binToDec(chiper_text, 8).join("");
	}
	return result;
};

export const des = (key: Uint8Array[], input: string, k: number) => {
	let result = "";
	let blockOfInput = new Uint8Array(input.split("").map(item => +item));
	blockOfInput = permutation(blockOfInput, data.initialPermutation);

	let left = blockOfInput.slice(0, 32);
	let right = blockOfInput.slice(32);
	for (let i = 0; i < 16; i++) {
		const extension = permutation(right, data.eTable);
		const gamma = gamming(extension, key[i]);

		const flattened = sBoxCalc(gamma);
		const block = permutation(flattened, data.pTable);
		left = gamming(left, block);

		if (i !== 15) {
			[left, right] = [right, left];
		}
	}
	const combine = new Uint8Array([...left, ...right]);
	const chiper_text = permutation(combine, data.finalPermutation).join("");
	result += binToDec(chiper_text, k).join("");
	return result;
}