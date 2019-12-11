import { Theme, useTheme } from "@chakra-ui/theme";
import styled, { FunctionInterpolation } from "@emotion/styled";
import * as React from "react";
import { As } from "./create-component";
import { forwardRef, memo } from "./forward-ref";
import { BoxHTMLProps, systemFn, SystemProps, truncate } from "./system-props";
import { pseudo } from "./system-pseudo";

interface ChakraOptions<T extends As, O> {
  as?: T;
  hook?: (props: O & BoxHTMLProps) => BoxHTMLProps;
  __themeKey?: string;
  baseProps?: Partial<MergePropsOf<O, T> & SystemProps & ThemeProps>;
}

interface ThemeProps {
  __variant?: string;
  __size?: string;
  __variantColor?: string;
  isTruncated?: boolean;
}

type MergePropsOf<O, T extends As> = Omit<
  O,
  keyof React.ComponentPropsWithRef<T>
> &
  React.ComponentPropsWithRef<T>;

type MergeGeneric<G, P, T extends As> = G & Omit<MergePropsOf<P, T>, keyof G>;

type GenericMiddleware<P, O, T extends As> = {} extends P
  ? MergeGeneric<P, O, T>
  : MergePropsOf<O, T>;

// instead of inferring the types from the `as` prop, we'll allow users pass a generic
// inferring types can take some noticeable time in VSCode.
// To understand this, use the `createComponent` function to see what I mean

interface ChakraComponent<T extends As, O> {
  <P>(
    props: GenericMiddleware<P, O, T> &
      SystemProps &
      ThemeProps & { as?: React.ElementType },
  ): JSX.Element;
  displayName?: string;
  defaultProps?: Partial<SystemProps & O>;
}

function createChakra<T extends As, O>({
  //@ts-ignore
  as: type = "div",
  __themeKey,
  hook,
  baseProps,
}: ChakraOptions<T, O>) {
  //@ts-ignore
  const StyledComp = styled(type)(
    systemFn,
    pseudo as FunctionInterpolation<object>,
    truncate as FunctionInterpolation<any>,
  );

  const Comp = (props: any, ref: React.Ref<any>) => {
    const theme = useTheme();
    const componentTheme = theme[__themeKey as keyof Theme];

    let styleProps: Record<string, any> = {};

    // constraints. We'll only allow variant, variantColor and size to be theme-aware
    const themeable = ["__size", "__variant", "__variantColor"];

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
    if (hook) hookProps = hook({ ref, ...props });

    const mergedProps = {
      ...baseProps,
      ...styleProps,
      ...props,
      ...hookProps,
    };

    return <StyledComp {...mergedProps} />;
  };

  return memo(forwardRef(Comp)) as ChakraComponent<T, O>;
}

export default createChakra;
