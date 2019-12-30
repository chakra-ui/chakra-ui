import { ThemeContext } from "@emotion/core";
import { css, get } from "@styled-system/css";
import * as React from "react";
import { forwardRef } from "../forward-ref";
import { isPropValid, jsx } from "../system";
import { As, CreateChakraComponent, CreateChakraOptions } from "./types";
import { replacePseudo } from "../system/jsx";

function getComponentStyles(props: any, options: any) {
  const themableProps = ["variant", "variantSize", "variantColor"];
  let componentStyle: any = {};

  for (const prop of themableProps) {
    if (themableProps.includes(prop)) {
      const getFromTheme = get(
        props.theme,
        `${options.themeKey}.${prop}.${props[prop]}`,
      );

      const systemObject =
        typeof getFromTheme === "function"
          ? replacePseudo(getFromTheme(props))
          : replacePseudo(getFromTheme);

      const style = css(systemObject)(props.theme);

      componentStyle = { ...componentStyle, ...style };
    }
  }
  return componentStyle;
}

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
      const propsWithTheme = { theme, ...props };
      args.forEach(arg => {
        const style = typeof arg === "function" ? arg(propsWithTheme) : arg;
        styles = { ...styles, ...style };
      });

      const componentStyles = getComponentStyles(propsWithTheme, options);

      styles = { ...componentStyles, ...styles };

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
        for (const key in props) {
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
