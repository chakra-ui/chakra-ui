import { ThemeContext } from "@emotion/core";
import { css, get } from "@styled-system/css";
import * as React from "react";
import { forwardRef } from "../forward-ref";
import { isPropValid, jsx } from "../system";
import { As, CreateChakraComponent, CreateChakraOptions } from "./types";

export const styled = <T extends As, H = {}>(
  tag: T,
  options?: CreateChakraOptions<H>,
) => (...args: any[]) => {
  const Styled = forwardRef(
    ({ as, ...props }: any, ref: React.Ref<Element>) => {
      // check if we should forward props
      const shouldForwardProps =
        typeof tag !== "string" || (as && typeof as !== "string");
      const theme = React.useContext(ThemeContext);

      // component component style
      let styles = {};
      args.forEach(arg => {
        const style =
          typeof arg === "function" ? arg({ theme, ...props }) : arg;
        styles = { ...styles, ...style };
      });

      // styles for component variant, size, variantColor
      const themableProps = ["variant", "variantSize", "variantColor"];

      for (let prop of themableProps) {
        const componentStyle =
          options && options.themeKey
            ? css(get(theme, `${options.themeKey}.${prop}.${props[prop]}`))(
                theme,
              )
            : {};
        styles = { ...styles, ...componentStyle };
      }

      // check if we should forward props
      let nextProps: Record<string, any> = shouldForwardProps
        ? { ...props }
        : {};

      // If hook was passed, invoke the hook
      if (options && options.hook) {
        const hookProps = options.hook({ ref, ...props });
        nextProps = { ...nextProps, ...hookProps };
      }

      if (!shouldForwardProps) {
        for (let key in props) {
          if (!isPropValid(key)) continue;
          nextProps[key] = props[key];
        }
      }

      const hasStyles = Object.keys(styles).length > 0;

      return jsx(as || tag, {
        ...nextProps,
        css: hasStyles ? styles : undefined,
      });
    },
  );

  return Styled as CreateChakraComponent<T, H>;
};

export default styled;
