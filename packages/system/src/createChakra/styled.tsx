import { Dict, isFunction } from "@chakra-ui/utils";
import * as React from "react";
import { filterProps, getShouldForwardProps } from "../chakra/styled";
import { useChakra } from "../color-mode/";
import { css } from "../css";
import { forwardRef } from "../forward-ref";
import { jsx } from "../system";
import getComponentStyles from "./get-component-style";
import { As, CreateChakraComponent, CreateChakraOptions } from "./types";
import propNames from "../system/prop-names";

// prevent chakra props from getting to DOM element
function clean(props: object) {
  const nextProps: Dict = {};
  for (const prop in props) {
    if (!propNames.includes(prop)) {
      nextProps[prop] = props[prop as keyof typeof props];
    }
  }
  return nextProps;
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

      if (options?.baseStyle) {
        const baseStyle = css(options.baseStyle)(theme);
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

      let nextProps: Dict = shouldForwardProps ? { ...props } : {};

      // If hook was passed, invoke the hook with the props
      if (options?.hook) {
        const hookProps = options.hook({ ref, ...props });
        Object.assign(nextProps, hookProps);
      }

      // The gatekeeper that prevents style props from getting to the dom
      if (!shouldForwardProps) {
        filterProps(nextProps, props);
      } else {
        nextProps = clean(nextProps);
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
