import { Dict, isFunction } from "@chakra-ui/utils";
import { get } from "@styled-system/css";
import css from "../css";
import { CreateChakraOptions } from "./types";

const themableProps = ["variant", "variantSize", "variantColor"] as const;

function getComponentStyles<H>(props: any, options?: CreateChakraOptions<H>) {
  const componentStyle: Dict = {};

  const themeKey = options?.themeKey;
  if (!themeKey) return {};

  const commonStyleObject = get(props.theme, `components.${themeKey}.common`);

  if (commonStyleObject) {
    const commonStyle = css(commonStyleObject)(props.theme);
    Object.assign(componentStyle, commonStyle);
  }

  for (const prop of themableProps) {
    if (themableProps.includes(prop)) {
      const styleObjectOrFunc = get(
        props.theme,
        `components.${themeKey}.${prop}.${props[prop]}`,
      );

      if (!styleObjectOrFunc) continue;

      const systemObject = isFunction(styleObjectOrFunc)
        ? styleObjectOrFunc(props)
        : styleObjectOrFunc;

      const style = css(systemObject)(props.theme);

      // Add style to component style
      Object.assign(componentStyle, style);
    }
  }

  return componentStyle;
}

export default getComponentStyles;
