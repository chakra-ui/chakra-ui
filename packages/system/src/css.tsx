import _css from "@styled-system/css";
import transformProps from "./system/transform-custom-props";
import { replacePseudo } from "./system/jsx";

export const css = (styles: object): any =>
  _css(transformProps(replacePseudo(styles)));

export default css;
