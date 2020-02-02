import * as React from "react";
import { isString, isFunction, Dict } from "@chakra-ui/utils";
import propNames from "../system/prop-names";
import { validHTMLProps, isPropValid } from "../system";

export function getDisplayName(primitive: any) {
  return isString(primitive)
    ? primitive
    : primitive.displayName || primitive.name || "ChakraComponent";
}

export const isSubcomponent = (themeKey: string) =>
  themeKey.split(".").length > 1;

export const runIfFn = (objectOrFn: any, props: object) =>
  isFunction(objectOrFn) ? objectOrFn(props) : objectOrFn;

// props getkeeper for create chakra elements
export function clean(props: Dict) {
  const nextProps: Dict = {};
  for (const prop in props) {
    if (!propNames.includes(prop)) {
      nextProps[prop] = props[prop];
    }
  }
  return nextProps;
}

// props getkeeper for chakra elements
export function filterProps(next: Dict, props: Dict) {
  for (const prop in props) {
    if (!isPropValid(prop)) continue;
    const propKey =
      prop in validHTMLProps
        ? validHTMLProps[prop as keyof typeof validHTMLProps]
        : prop;
    next[propKey] = props[prop];
  }
}
