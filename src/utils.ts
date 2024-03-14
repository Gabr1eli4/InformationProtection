export const decToBin = (arr: string, size: number): string => {
	const result = Array<string>(arr.length);

	for (let i = 0; i < arr.length; i++) {
		const char = arr[i];
		result[i] = char.charCodeAt(0)?.toString(2).padStart(size, "0");
	}
	return result.join("");
}

export const binToDec = (arr: string, size: number): string => {
	const result = Array(arr.length / size);
	for (let i = 0; i < arr.length / size; i++) {
		const block = arr.slice(i * size, i * size + size);
		const char = parseInt(block, 2);
		result.push(String.fromCharCode(char));
	}
	return result.join("");
}

export class Processing
{
	separator: string;
	zeroEncSymbol: string;
	oneEncSymbol: string;
	endOfSeqChar: string;

	constructor(separator: string, zeroEncSymbol: string, oneEncSymbol: string, endOfSeqChar: string) {
		this.separator = separator;
		this.zeroEncSymbol = zeroEncSymbol;
		this.oneEncSymbol = oneEncSymbol;
		this.endOfSeqChar = endOfSeqChar;
	}

	messageProcessing(message:string, input: string) {
		const binInput = decToBin(input, 8);
		let result = "";
		let numOfSpaces;
		let indexToBin = 0;
		for (let i = 0; i < message.length; i++) {
			numOfSpaces = 0;

			// Конец шифрования
			if (binInput[indexToBin] === null || binInput[indexToBin] === undefined) {
				result += this.endOfSeqChar;
				result += message.slice(i);
				return result;
			}

			// Проходим по разделителям
			while (this.separator.includes(message[i])) {
				result += message[i];
				i++;
			}

			// Считаем количество пробелов
			while(message[i] === " ") {
				numOfSpaces++;
				i++;
			}

			// Шифруем 0 или 1
			if (numOfSpaces > 0) {
				i--;
				if (binInput[indexToBin] === "0") {
					result += this.zeroEncSymbol;
				} else if (binInput[indexToBin] === "1") {
					result += this.oneEncSymbol;
				}
				indexToBin++;
			} else {
				result += message[i];
			}
		}
		if (binInput[indexToBin] !== null || binInput[indexToBin] !== undefined) return "Текст-контейнер недостаточной длины для шифрования";
		return "";
	}

	messageProcessingDecrypt(input: string) {
		let result = "";
		let numOfSpaces;
		for (let i = 0; i < input.length; i++) {
			if (input[i] === this.endOfSeqChar) break;
			numOfSpaces = 0;
			while(input[i] === " ") {
				numOfSpaces++;
				i++;
			}
			if (numOfSpaces > 0) {
				result += numOfSpaces > 1 ? this.zeroEncSymbol: this.oneEncSymbol;
				i--;
			}
		}
		return binToDec(result, 8);
	}
	
	messageProcessingDecrypt2(input: string) {
		let result = "";

		for (let i = 0; i < input.length; i++) {
			if (input[i] === this.endOfSeqChar) break;

			if (input[i] === this.zeroEncSymbol) result += "0";
			if (input[i] === this.oneEncSymbol) result += "1";
		}

		return binToDec(result, 8);	
	}
}
