export function validate(input: string): boolean {
  const pattern = /^[01]+$/g;

  if (input.length % 5 !== 0) return false;

  return pattern.test(input);
}
