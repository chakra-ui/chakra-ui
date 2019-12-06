import styled, { FunctionInterpolation } from "@emotion/styled";
import * as React from "react";
import { Theme, useTheme } from "@chakra-ui/theme";
import { As, Component, PropsWithAs } from "./create-component";
import { forwardRef, memo } from "./forward-ref";
import { systemFn, truncate, AllProps, BoxHTMLProps } from "./system-props";
import { pseudo } from "./system-pseudo";

export interface ChakraOptions<T extends As, P> {
  as?: T;
  hook?: (props: P) => BoxHTMLProps;
  __themeKey?: string;
}

export function createChakra<T extends As, P>({
  //@ts-ignore
  as: type = "div",
  __themeKey,
  hook,
}: ChakraOptions<T, P>) {
  const StyledComp = styled(type as any)(
    systemFn,
    pseudo as FunctionInterpolation<object>,
    truncate as FunctionInterpolation<any>,
  );

  const ReactComp = (props: PropsWithAs<P, T>, ref: React.Ref<any>) => {
    const theme = useTheme();
    const componentTheme = theme[__themeKey as keyof Theme];

    let styleProps: Record<string, any> = {};

    // constraints. We'll only allow variant, variantColor and size to be theme-aware
    const themeable = ["size", "variant", "variantColor"] as const;

    for (const key of themeable) {
      // Get the component style for any of the themeable props
      const themedStyle =
        componentTheme &&
        componentTheme[key] &&
        componentTheme[key][(props as any)[key]];

      styleProps = {
        ...styleProps,
        ...themedStyle,
      };
    }

    let hookProps: Record<string, any> = {};
    if (hook) hookProps = hook(props); // let's find a way to memoize this return value

    return <StyledComp ref={ref} {...styleProps} {...hookProps} {...props} />;
  };

  return (memo(forwardRef(ReactComp)) as unknown) as Component<
    T,
    P &
      React.ComponentProps<T> &
      Omit<AllProps, "size"> & {
        size?: any;
        variant?: any;
        variantColor?: any;
        isTruncated?: boolean;
      }
  >;
}
