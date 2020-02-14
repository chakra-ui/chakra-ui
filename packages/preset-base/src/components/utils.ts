import { Theme } from "../foundations";
import { getColor } from "@chakra-ui/color";
import { SystemProps } from "@chakra-ui/system";

export type NestedSystemProps =
  | SystemProps
  | Record<string, SystemProps>
  | Record<string, Record<string, SystemProps>>;

export type ComponentStyle<P = {}> =
  | NestedSystemProps
  | ((props: StyleFunctionProps & P) => NestedSystemProps);

export interface ComponentTheme<P = {}> {
  baseStyle?: ComponentStyle<P>;
  variant?: { __default?: string } & Record<string, ComponentStyle<P> | string>;
  variantSize?: { __default?: string } & Record<
    string,
    ComponentStyle<P> | string
  >;
}

export interface StyleFunctionProps {
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
): any {
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
