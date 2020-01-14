import { ThemeContext } from "@emotion/core";
import * as React from "react";
import { isPropValid, jsx } from "../system";
import { As, ChakraComponent } from "./types";
import { isFunction, isString, Dict } from "@chakra-ui/utils";
import { forwardRef, memo } from "../forward-ref";

export function filterProps(next: Dict, props: Dict) {
  // Replace the htmlWidth and htmlHeight with the appropriate DOM props
  // This is mostly for the `img` tag
  const replace = {
    htmlWidth: "width",
    htmlHeight: "height",
  };

  for (const prop in props) {
    if (!isPropValid(prop)) continue;
    const propKey =
      prop in replace ? replace[prop as keyof typeof replace] : prop;
    next[propKey] = props[prop];
  }
}

const styled = <T extends As>(tag: T) => (...interpolations: any[]) => {
  const Styled = forwardRef(
    ({ as, apply, ...props }: any, ref: React.Ref<Element>) => {
      const elementToBeCreated = as || tag;
      const shouldForwardProps = !isString(elementToBeCreated);
      const computedProps = shouldForwardProps ? props : {};

      const styles = {};
      const theme = React.useContext(ThemeContext);

      interpolations.forEach(interpolation => {
        const style = isFunction(interpolation)
          ? interpolation({ theme, apply, ...props })
          : interpolation;
        Object.assign(styles, style);
      });

      if (!shouldForwardProps) {
        filterProps(computedProps, props);
      }

      return jsx(as || tag, {
        ...computedProps,
        ref,
        css: styles,
      });
    },
  );

  return memo(Styled) as ChakraComponent<T>;
};

export default styled;
