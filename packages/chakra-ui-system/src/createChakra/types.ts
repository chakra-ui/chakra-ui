import * as React from "react";
import { SystemProps } from "../system";

export type As<P = any> = React.ReactType<P>;

export type PropsOf<T extends As> = React.ComponentPropsWithRef<T>;

type MergePropsOf<O, T extends As> = {} extends O
  ? Omit<O, keyof PropsOf<T>> & PropsOf<T>
  : PropsOf<T>;

type MergeGeneric<G, P, T extends As> = G & Omit<MergePropsOf<P, T>, keyof G>;

type GenericMiddleware<P, H, T extends As> = {} extends P
  ? MergeGeneric<P, H, T>
  : MergePropsOf<H, T>;

interface OtherProps {
  as?: React.ElementType;
  isTruncated?: boolean;
  children?: React.ReactNode;
}

/**
 * This is the interface for a Chakra component.
 * All chakra components support JSX generics
 *
 * @template H - The props for the hook
 * @template T - The component type
 * @template P - The generic prop passed
 */
export interface CreateChakraComponent<T extends As, H = {}> {
  <P>(
    props: GenericMiddleware<P, H, T> &
      SystemProps &
      ComponentThemeProps &
      OtherProps,
  ): JSX.Element;

  displayName?: string;

  defaultProps?: Partial<
    MergePropsOf<H, T> & SystemProps & ComponentThemeProps
  >;
}

/**
 * For all components that has `themeKey` passed,
 * the user can pass these 3 props to customize them
 */
interface ComponentThemeProps {
  variant?: string;
  variantSize?: string;
  variantColor?: string;
}

/**
 * When using `createChakra`, you can pass any of these options
 */
export interface CreateChakraOptions<P> {
  hook?: (props: P) => React.HTMLProps<any>;
  themeKey?: string;
}
