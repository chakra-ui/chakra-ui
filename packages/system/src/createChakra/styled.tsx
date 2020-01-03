import { isFunction, Dict } from "@chakra-ui/utils";
import { get } from "@styled-system/css";
import * as React from "react";
import { filterProps, getShouldForwardProps } from "../chakra/styled";
import { useChakra } from "../color-mode";
import { css } from "../css";
import { forwardRef } from "../forward-ref";
import { jsx } from "../system";
import { As, CreateChakraComponent, CreateChakraOptions } from "./types";

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

export const styled = <T extends As, H = {}>(
  tag: T,
  options?: CreateChakraOptions<H>,
) => (...interpolations: any[]) => {
  const Styled = forwardRef(
    ({ as, ...props }: any, ref: React.Ref<Element>) => {
      const { colorMode, theme } = useChakra();

      // component component style
      let styles: Dict = {};

      if (options?.baseStyles) {
        const baseStyle = css(options.baseStyles)(theme);
        Object.assign(styles, baseStyle);
      }

      const mergedProps = { theme, colorMode, ...props };

      interpolations.forEach(interpolation => {
        const style = isFunction(interpolation)
          ? interpolation(mergedProps)
          : interpolation;
        Object.assign(styles, style);
      });

      const componentStyles = getComponentStyles(mergedProps, options);

      styles = { ...componentStyles, ...styles };

      // check if we should forward props
      // check if we should forward props
      const shouldForwardProps = getShouldForwardProps(tag, as);

      const nextProps: Dict = shouldForwardProps ? { ...props } : {};

      // If hook was passed, invoke the hook with the props
      if (options?.hook) {
        const hookProps = options.hook({ ref, ...props });
        Object.assign(nextProps, hookProps);
      }

      // The gatekeeper that prevents style props from getting to the dom
      if (!shouldForwardProps) {
        filterProps(nextProps, props);
      }

      // Add data-* signature
      if (options?.dataAttr) {
        nextProps[`data-chakra-${options.dataAttr}`] = "";
      }

      return jsx(as || tag, {
        ...nextProps,
        css: styles,
      });
    },
  );

  return Styled as CreateChakraComponent<T, H>;
};

export default styled;
