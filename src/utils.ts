export const decToBin = (arr: string, size: number): Array<string> => {
	return arr.split("").map(item => item.charCodeAt(0)?.toString(2).padStart(size, "0"));
}