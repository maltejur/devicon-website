export function firstLetterUpperCase(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function pascalCase(kebabCase: string): string {
  return kebabCase.split("-").map(firstLetterUpperCase).join("");
}
