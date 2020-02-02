import { Dict, isFunction, isString } from "@chakra-ui/utils";
import * as React from "react";
import { filterProps } from "../chakra/styled";
import { useChakra } from "../color-mode";
import { forwardRef } from "../forward-ref";
import { jsx } from "../system";
import { getComponentStyles, runIfFn } from "./get-component-style";
import { As, CreateChakraComponent, CreateChakraOptions } from "./types";
import propNames from "../system/prop-names";
import css from "../css";

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

export function createStyled<T extends As, P = {}>(
  component: T,
  options?: CreateChakraOptions<P>,
) {
  return function(...interpolations: any[]) {
    //
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
          const baseStyleObject = runIfFn(options.baseStyle, propsWithTheme);
          const baseStyle = css(baseStyleObject);
          Object.assign(finalStyles, baseStyle);
        }

        // Resolve each interpolation and add result to final style
        interpolations.forEach(interpolation => {
          const style = runIfFn(interpolation, propsWithTheme);
          Object.assign(finalStyles, style);
        });

        // Get the component style from theme.components
        const componentStyles = getComponentStyles(propsWithTheme, options);

        // Add final styles before component styles to support prop overriding
        finalStyles = { ...componentStyles, ...finalStyles };

        const element = as || component;
        const isTag = isString(element);
        let computedProps: Dict = isTag ? {} : { ...props };

        // The gatekeeper that prevents style props from getting to the dom
        if (isTag) filterProps(computedProps, props);

        // anyone style props that made it through here will get cleaned up
        computedProps = clean(computedProps);

        // Attach props to this component
        if (options?.attrs) {
          const attrsProps = runIfFn(options.attrs, computedProps);
          Object.assign(computedProps, attrsProps);
        }

        return jsx(element, {
          ref,
          ...computedProps,
          css: finalStyles,
        });
      },
    );

    //@ts-ignore
    Styled.displayName = `Chakra(${getDisplayName(component)})`;

    return Styled as CreateChakraComponent<T, P>;
  };
}

function getDisplayName(primitive: any) {
  return isString(primitive)
    ? primitive
    : primitive.displayName || primitive.name || "ChakraComponent";
}

export default createStyled;
