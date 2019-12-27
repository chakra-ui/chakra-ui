/**@jsx jsx */
import { jsx, ThemeContext } from "@emotion/core";
import { css, get } from "@styled-system/css";
import * as React from "react";
import { forwardRef } from "../forward-ref";
import { isPropValid } from "../system";
import { As, CreateChakraComponent, CreateChakraOptions } from "./types";

export const styled = <T extends As, H = {}>(
  Comp: T,
  options?: CreateChakraOptions<H>,
) => (...styleInterpolations: any[]) => {
  const Styled = forwardRef(
    ({ as, ...props }: any, ref: React.Ref<Element>) => {
      let styles = {};
      const theme = React.useContext(ThemeContext);

      styleInterpolations.forEach(interpolation => {
        const style =
          typeof interpolation === "function"
            ? interpolation({ theme, ...props })
            : interpolation;
        Object.assign(styles, style);
      });

      let componentStyle: Record<string, any> = {};
      const themableProps = ["variant", "variantSize", "variantColor"];

      for (let prop of themableProps) {
        const componentStyleProps =
          options && options.themeKey
            ? css(get(theme, `${options.themeKey}.${prop}.${props[prop]}`))(
                theme,
              )
            : {};
        Object.assign(componentStyle, componentStyleProps);
      }

      let nextProps: Record<string, any> = {};
      for (let prop in props) {
        if (!isPropValid(prop)) continue;
        nextProps[prop] = props[prop];
      }

      // If hook prop was passed, invoke the hook
      let hookProps: Record<string, any> = {};
      if (options && options.hook) hookProps = options.hook({ ref, ...props });

      const finalProps = {
        ...nextProps,
        ...hookProps,
      };

      // Remove non-DOM props from hook's return
      for (let key in finalProps) {
        if (!isPropValid(key)) delete finalProps[key];
      }

      const Component = as || Comp;
      const componentProps =
        options && options.hook ? finalProps : { ...props, ref };

      const combinedStyle = { ...componentStyle, ...styles };
      const hasCombinedStyle = Object.keys(combinedStyle).length > 0;

      return (
        <Component
          css={hasCombinedStyle ? combinedStyle : undefined}
          {...componentProps}
        />
      );
    },
  );

  return Styled as CreateChakraComponent<T, H>;
};

export default styled;
