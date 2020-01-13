import { Theme } from "../foundations";
import { getColor } from "@chakra-ui/color";

export interface VariantStyleFunction {
  variantColor: string;
  colorMode: "light" | "dark";
  theme: Theme;
}

export function getModeValue(
  props: any,
  lightValue: string,
  darkValue: string,
) {
  if (props.colorMode === "light") {
    return getColor(props.theme, lightValue, props.variantColor);
  }
  if (props.colorMode === "dark") {
    return getColor(props.theme, darkValue, props.variantColor);
  }
  return undefined;
}
