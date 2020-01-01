import { ThemeContext } from "@emotion/core";
import { get } from "@styled-system/css";
import * as React from "react";
import { useColorMode } from "../color-mode";
import { css } from "../css";
import { forwardRef } from "../forward-ref";
import { isPropValid, jsx } from "../system";
import { As, CreateChakraComponent, CreateChakraOptions } from "./types";

function getComponentStyles(props: any, options: any) {
  const themableProps = ["variant", "variantSize", "variantColor"];
  let componentStyle: any = {};

  const themeKey = options?.themeKey;
  if (!themeKey) return {};

  const getCommonStyle = get(props.theme, `components.${themeKey}.common`);

  if (getCommonStyle) {
    const commonStyle = css(getCommonStyle)(props.theme);
    componentStyle = commonStyle;
  }

  for (const prop of themableProps) {
    if (themableProps.includes(prop)) {
      const getFromTheme = get(
        props.theme,
        `components.${themeKey}.${prop}.${props[prop]}`,
      );

      if (!getFromTheme) continue;

      const systemObject =
        typeof getFromTheme === "function" ? getFromTheme(props) : getFromTheme;

      const style = css(systemObject)(props.theme);

      componentStyle = { ...componentStyle, ...style };
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
      // check if we should forward props
      const shouldForwardProps =
        typeof tag !== "string" || (as && typeof as !== "string");

      const theme = React.useContext(ThemeContext);
      const [colorMode] = useColorMode();

      // component component style
      let styles = {};
      const propsWithTheme = { theme, colorMode, ...props };

      interpolations.forEach(interpolation => {
        const style =
          typeof interpolation === "function"
            ? interpolation(propsWithTheme)
            : interpolation;
        styles = { ...styles, ...style };
      });

      const componentStyles = getComponentStyles(propsWithTheme, options);
      styles = { ...componentStyles, ...styles };

      // check if we should forward props
      let nextProps: Record<string, any> = shouldForwardProps
        ? { ...props }
        : {};

      // If hook was passed, invoke the hook
      if (options?.hook) {
        const hookProps = options.hook({ ref, ...props });
        nextProps = { ...nextProps, ...hookProps };
      }

      // Replace the htmlWidth and htmlHeight with the appropriate DOM props
      // This is mostly for the `img` tag
      const replace = {
        htmlWidth: "width",
        htmlHeight: "height",
      };

      if (!shouldForwardProps) {
        for (const prop in props) {
          if (!isPropValid(prop)) continue;
          const propKey =
            prop in replace ? replace[prop as keyof typeof replace] : prop;
          nextProps[propKey] = props[prop];
        }
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
