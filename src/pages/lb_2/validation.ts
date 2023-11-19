function inputValidate(input: string): boolean {
  const pattern = /[a-zа-я]/g;

  if (input.length % 15 !== 0) return false;

  return pattern.test(input);
}

function keyValidate(key: string) {
  key = key.replace(/ /g, "");
  let input = key.split(",");
  let inputLength = input.length;
  if (inputLength > 15 || inputLength < 15) return false;
  return true;
}

export { inputValidate, keyValidate };
