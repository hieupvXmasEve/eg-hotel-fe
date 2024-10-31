export function convertNameToUrl(name: string) {
  return name.toLowerCase().replace(/ /g, "-");
}
