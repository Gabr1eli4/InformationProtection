import * as data from "./data";
export const permutation = (str: Uint8Array, arr: number[]): Uint8Array => {
	return new Uint8Array(arr.map((item) => str[item - 1]));
};

export const getBitBlock = (input: string[]): Uint8Array => {
	return new Uint8Array(
		input
			.map((item) => item.codePointAt(0)?.toString(2).padStart(8, "0"))
			.join("")
			.split("")
			.map((item) => +item)
	);
};

export const shift = (block: Uint8Array, nth_shift: number) => {
	return new Uint8Array([
		...block.slice(nth_shift),
		...block.slice(0, nth_shift),
	]);
};

export const generateKeys = (key: string) => {
	let blockOfKey = getBitBlock(key.split(""));

	blockOfKey = permutation(blockOfKey, data.dunno);
	let left = blockOfKey.slice(0, 28);
	let right = blockOfKey.slice(28);
	const result: Array<Uint8Array> = [];

	for (let i = 0; i < 16; i++) {
		left = shift(left, data.LSTable[i]);
		right = shift(right, data.LSTable[i]);
		const mergedKey = new Uint8Array([...left, ...right]);
		const round_key = permutation(mergedKey, data.keyComp);

		result.push(round_key);
	}
	return result;
};

export const gamming = (block: Uint8Array, key: Uint8Array) => {
	return block.map((item, index) => item ^ key[index]);
};

export const binToDec = (arr: string, size: number) => {
	const result = [];
	for (let i = 0; i < arr.length / size; i++) {
		const block = arr.slice(i * size, i * size + size);
		const char = parseInt(block, 2);
		result.push(String.fromCharCode(char));
	}
	return result;
};

export const decToBin = (arr: string) => {
	const result = [];
	for (let i = 0; i < arr.length; i++) {
		result.push(arr[i].charCodeAt(0).toString(2).padStart(8, "0"));
	}
	return result;
};

export const sBoxCalc = (block: Uint8Array): Uint8Array => {
	const sBox = new Array(8);
	for (let i = 0; i < 8; i++) {
		const row = parseInt([block[i * 6], block[i * 6 + 5]].join(""), 2);
		const col = parseInt(block.slice(i * 6 + 1, i * 6 + 5).join(""), 2);
		const value = data.sBlockTable[i][row][col].toString(2).padStart(4, "0");

		sBox[i] = value.split("").map((item) => +item);
	}

	return Uint8Array.from(sBox.reduce((a, b) => [...a, ...b], []));
};
