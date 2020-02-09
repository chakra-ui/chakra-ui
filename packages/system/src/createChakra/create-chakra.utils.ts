import { Dict, isFunction, isString } from "@chakra-ui/utils";
import { isPropValid, validHTMLProps } from "../system";
import propNames from "../system/prop-names";
import { isValidHTMLProp } from "../system/is-prop-valid";
import { useTheme } from "../color-mode";
import getComponentStyles from "./get-component-style";

export function getDisplayName(primitive: any) {
  return isString(primitive)
    ? primitive
    : primitive.displayName || primitive.name || "ChakraComponent";
}

export const isSubcomponent = (themeKey: string) =>
  themeKey.split(".").length > 1;

export const runIfFn = (objectOrFn: any, props: object) =>
  isFunction(objectOrFn) ? objectOrFn(props) : objectOrFn;

// props getkeeper for create chakra components
export function filterStylePropNames(props: Dict) {
  const nextProps: Dict = {};
  for (const prop in props) {
    if (!propNames.includes(prop)) {
      nextProps[prop] = props[prop];
    }
  }
  return nextProps;
}

// props getkeeper for chakra elements
export function filterProps(props: Dict) {
  const result: Dict = {};
  for (const prop in props) {
    if (!isPropValid(prop)) continue;
    const propKey = isValidHTMLProp(prop) ? validHTMLProps[prop] : prop;
    result[propKey] = props[prop];
  }
  return result;
}

// props getkeeper for create chakra components
export function evalShouldForwardProp(
  fn: (val: string) => boolean,
  props: Dict,
) {
  const result: Dict = {};
  for (const prop in props) {
    if (fn(prop)) result[prop] = props[prop];
  }
  return result;
}
