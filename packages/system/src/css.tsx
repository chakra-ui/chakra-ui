import _css from "@styled-system/css";
import { transformProps } from "./system/custom";
import { replacePseudo } from "./system/pseudo";

export const css = (styles: object): any =>
  _css(transformProps(replacePseudo(styles)));

export default css;
