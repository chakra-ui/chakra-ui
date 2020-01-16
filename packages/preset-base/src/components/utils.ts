import { Theme } from "../foundations";
import { getColor } from "@chakra-ui/color";

export interface VariantStyleFunction {
  variantColor: string;
  colorMode: "light" | "dark";
  theme: Theme;
}

type ModeValue = string | ((theme: object) => string);

export function getModeValue(
  props: any,
  lightValue: ModeValue,
  darkValue: ModeValue,
) {
  if (props.colorMode === "light") return lightValue;
  if (props.colorMode === "dark") return darkValue;
  return undefined;
}

export function getModeColor(
  props: any,
  lightValue: ModeValue,
  darkValue: ModeValue,
) {
  if (props.colorMode === "light") {
    return typeof lightValue === "function"
      ? lightValue
      : getColor(props.theme, lightValue, props.variantColor);
  }
  if (props.colorMode === "dark") {
    return typeof darkValue === "function"
      ? darkValue
      : getColor(props.theme, darkValue, props.variantColor);
  }
  return undefined;
}
