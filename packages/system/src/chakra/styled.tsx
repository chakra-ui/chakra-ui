import { isFunction, isString } from "@chakra-ui/utils";
import { ThemeContext } from "@emotion/core";
import * as React from "react";
import {
  filterProps,
  getDisplayName,
} from "../createChakra/create-chakra.utils";
import { forwardRef } from "../forward-ref";
import { jsx } from "../system";
import { As, ChakraComponent } from "./types";

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

  //@ts-ignore
  Styled.displayName = `Chakra(${getDisplayName(component)})`;

  return Styled as ChakraComponent<T>;
};

export default styled;
