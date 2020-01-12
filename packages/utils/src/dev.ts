const spacesAndTabs = /[ \t]{2,}/g;
const lineStartWithSpaces = /^[ \t]*/gm;

export const dedent = (value: string): string =>
  value
    .replace(spacesAndTabs, " ")
    .replace(lineStartWithSpaces, "")
    .trim();

export { default as invariant } from "tiny-invariant";
