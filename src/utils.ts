export const decToBin = (arr: string, size: number): string => {
	return arr.split("").map(item => item.charCodeAt(0)?.toString(2).padStart(size, "0")).join("");
}

export const binToDec = (arr: string, size: number): string => {
	const result = [];
	for (let i = 0; i < arr.length / size; i++) {
		const block = arr.slice(i * size, i * size + size);
		const char = parseInt(block, 2);
		result.push(String.fromCharCode(char));
	}
	return result.join("");
}