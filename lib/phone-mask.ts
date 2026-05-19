const DDD_PREFIX = '86';
const MAX_DIGITS = 11;

function ensurePrefix(digits: string): string {
  if (digits.startsWith(DDD_PREFIX)) return digits;
  return DDD_PREFIX + digits;
}

export function maskPhone(input: string): string {
  const onlyDigits = input.replace(/\D/g, '');
  const prefixed = ensurePrefix(onlyDigits).slice(0, MAX_DIGITS);
  const ddd = prefixed.slice(0, 2);
  const rest = prefixed.slice(2);

  if (rest.length === 0) return `(${ddd}) `;
  if (rest.length <= 5) return `(${ddd}) ${rest}`;
  return `(${ddd}) ${rest.slice(0, 5)}-${rest.slice(5)}`;
}

export function unmaskPhone(input: string): string {
  return input.replace(/\D/g, '');
}

export function isValidPhone(input: string): boolean {
  return unmaskPhone(input).length === MAX_DIGITS;
}
