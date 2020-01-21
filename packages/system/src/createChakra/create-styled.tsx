import { Dict, isFunction, isString } from "@chakra-ui/utils";
import * as React from "react";
import { filterProps } from "../chakra/styled";
import { useChakra } from "../color-mode";
import { forwardRef } from "../forward-ref";
import { jsx } from "../system";
import getComponentStyles, { resolveStyle } from "./get-component-style";
import { As, CreateChakraComponent, CreateChakraOptions } from "./types";
import propNames from "../system/prop-names";

// prevent chakra props from getting to DOM element
function clean(props: Dict) {
  const nextProps: Dict = {};
  for (const prop in props) {
    if (!propNames.includes(prop)) {
      nextProps[prop] = props[prop];
    }
  }
  return nextProps;
}

export const createStyled = <T extends As, H = {}>(
  tag: T,
  options?: CreateChakraOptions<H>,
) => (...interpolations: any[]) => {
  const Styled = forwardRef(
    ({ as, ...props }: any, ref: React.Ref<Element>) => {
      // Get the color mode and theme from context
      const { colorMode, theme } = useChakra();

      // Stores the the final styles
      let finalStyles: Dict = {};

      // For each style interpolation, we'll pass the theme and colorMode
      const propsWithTheme = { theme, colorMode, ...props };

      // Users can pass a base style to the component, let's resolve it
      if (options?.baseStyle) {
        const baseStyle = resolveStyle(options.baseStyle, propsWithTheme);
        Object.assign(finalStyles, baseStyle);
      }

      // Resolve each interpolation and add result to final style
      interpolations.forEach(interpolation => {
        const style = isFunction(interpolation)
          ? interpolation(propsWithTheme)
          : interpolation;
        Object.assign(finalStyles, style);
      });

      // Get the component style from theme.components
      // There's a convention for how to define component styles in theme.components
      // @see [Link]
      const componentStyles = getComponentStyles(propsWithTheme, options);

      // Add final styles before component styles to support prop overriding
      finalStyles = { ...componentStyles, ...finalStyles };

      const element = as || tag;
      const isTag = isString(element);
      let computedProps: Dict = isTag ? {} : { ...props };

      // The gatekeeper that prevents style props from getting to the dom
      if (isTag) filterProps(computedProps, props);

      // If hook was passed, invoke the hook with the props
      if (options?.hook) {
        const hookProps = options.hook({ ref, ...props });
        Object.assign(computedProps, hookProps);
      }

      // anyone style props that made it through here will get cleaned up
      computedProps = clean(computedProps);

      // Attach props to this component
      if (options?.attrs) {
        const attrsProps =
          typeof options.attrs === "function"
            ? options.attrs(computedProps)
            : options.attrs;
        Object.assign(computedProps, attrsProps);
      }

      return jsx(element, {
        ...computedProps,
        css: finalStyles,
      });
    },
  );

  return Styled as CreateChakraComponent<T, H>;
};

export default createStyled;
