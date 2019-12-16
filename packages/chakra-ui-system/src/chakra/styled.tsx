import { jsx, ThemeContext } from "@emotion/core";
import * as React from "react";
import { forwardRef } from "../forward-ref";
import { isPropValid } from "../system";
import { As, ChakraComponent } from "./types";
import { css, get } from "@styled-system/css";

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
            ? interpolation({ theme, ...props })
            : interpolation;
        Object.assign(styles, style);
      });

      const themedStyles = css(get(theme, apply || `styles.${tag}`))(theme);
      const finalCSS = { ...themedStyles, ...styles };

      const replace = {
        htmlWidth: "width",
        htmlHeight: "height",
      };

      if (!shouldForwardProps) {
        for (let prop in props) {
          if (!isPropValid(prop)) continue;
          // Replace the htmlWidth and htmlHeight with the appropriate DOM props
          if (Object.keys(replace).includes(prop)) {
            const htmlProp = replace[prop as keyof typeof replace];
            nextProps[htmlProp] = props[prop];
            continue;
          }

          nextProps[prop] = props[prop];
        }
      }

      return jsx(as || tag, {
        ...nextProps,
        ref,
        css: finalCSS,
      });
    },
  );
  return Styled as ChakraComponent<T>;
};

export default styled;
