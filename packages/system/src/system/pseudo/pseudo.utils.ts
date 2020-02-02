import { Dict, isObject, memoizeOne } from "@chakra-ui/utils";
import transformProps from "../custom/custom.utils";
import { selectors } from "./pseudo";

type SelectorProp = keyof typeof selectors;

const hasUnderscore = (str: string) => str.startsWith("_");

const stripUnderscore = (str: string) => str.slice(1, str.length);

export const replacePseudoProp = memoizeOne((prop: string) => {
  if (hasUnderscore(prop)) {
    const newProp = stripUnderscore(prop);
    return selectors[newProp as SelectorProp];
  }
  return prop;
});

export const replacePseudo = (props: any) => {
  const next: Dict = {};
  for (const prop in props) {
    const propValue = props[prop];
    const propKey = replacePseudoProp(prop);
    if (isObject(propValue)) {
      next[propKey] = replacePseudo(propValue);
    } else {
      next[propKey] = propValue;
    }
  }
  return next;
};

export const tx = (props: any) => transformProps(replacePseudo(props));
