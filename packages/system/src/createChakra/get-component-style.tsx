import { Dict, isFunction } from "@chakra-ui/utils";
import { get } from "@styled-system/css";
import css from "../css";
import { CreateChakraOptions } from "./types";

const isSubcomponent = (themeKey: string) => themeKey.split(".").length > 1;

export const resolveStyle = (objectOrFn: any, props: object) =>
  isFunction(objectOrFn) ? objectOrFn(props) : objectOrFn;

function getBaseStyle(props: any, themeKey: string) {
  const [parent, component] = themeKey.split(".");
  const baseStyleOrFn = get(props.theme, `components.${parent}.baseStyle`);

  if (!baseStyleOrFn) return undefined;

  let baseStyle = resolveStyle(baseStyleOrFn, props);

  if (isSubcomponent(themeKey)) {
    baseStyle = baseStyle[component];
  }
  return baseStyle;
}

function getVariantPropStyle(props: any, prop: any, themeKey: string) {
  const [parent, component] = themeKey.split(".");
  const ObjectOrFn = get(
    props.theme,
    `components.${parent}.${prop}.${props[prop]}`,
  );

  if (!ObjectOrFn) return undefined;

  let baseStyle = resolveStyle(ObjectOrFn, props);
  if (isSubcomponent(themeKey)) {
    baseStyle = baseStyle[component];
  }
  return baseStyle;
}

function getVariantsStyle(props: any, themeKey: string) {
  const componentStyle = {};
  const themableProps = ["variant", "variantSize", "variantColor"] as const;
  for (const prop of themableProps) {
    const styleObject = getVariantPropStyle(props, prop, themeKey);
    if (!styleObject) continue;
    Object.assign(componentStyle, styleObject);
  }
  return componentStyle;
}

function getComponentStyles<Hook>(
  props: any,
  options?: CreateChakraOptions<Hook>,
) {
  const componentStyle: Dict = {};

  const themeKey = options?.themeKey;
  if (!themeKey) return {};

  const baseStyleObject = getBaseStyle(props, themeKey);

  if (baseStyleObject) {
    const baseStyle = css(baseStyleObject)(props.theme);
    Object.assign(componentStyle, baseStyle);
  }

  const variantStyleObject = getVariantsStyle(props, themeKey);

  if (variantStyleObject) {
    const style = css(variantStyleObject)(props.theme);
    Object.assign(componentStyle, style);
  }

  return componentStyle;
}

export default getComponentStyles;
