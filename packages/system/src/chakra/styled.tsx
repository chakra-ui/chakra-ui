import { ThemeContext } from "@emotion/core";
import * as React from "react";
import { forwardRef, memo } from "../forward-ref";
import { isPropValid, jsx } from "../system";
import { As, ChakraComponent } from "./types";

const styled = <T extends As>(tag: T) => (...styleInterpolations: any[]) => {
  const Styled = forwardRef(
    ({ as, apply, ...props }: any, ref: React.Ref<Element>) => {
      const shouldForwardProps =
        typeof tag !== "string" || (as && typeof as !== "string");

      let nextProps = shouldForwardProps ? props : {};

      let styles = {};
      const theme = React.useContext(ThemeContext);

      styleInterpolations.forEach(interpolation => {
        const style =
          typeof interpolation === "function"
            ? interpolation({ theme, apply, ...props })
            : interpolation;
        Object.assign(styles, style);
      });

      // Replace the htmlWidth and htmlHeight with the appropriate DOM props
      // This is mostly for the `img` tag
      const replace = {
        htmlWidth: "width",
        htmlHeight: "height",
      };

      if (!shouldForwardProps) {
        for (let prop in props) {
          if (!isPropValid(prop)) continue;
          const propKey =
            prop in replace ? replace[prop as keyof typeof replace] : prop;
          nextProps[propKey] = props[prop];
        }
      }

      return jsx(as || tag, {
        ...nextProps,
        ref,
        css: styles,
      });
    },
  );

  return memo(Styled) as ChakraComponent<T>;
};

export default styled;
