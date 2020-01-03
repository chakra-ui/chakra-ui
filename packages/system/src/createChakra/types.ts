import * as React from "react";
import { SystemProps } from "../system";
import { SafeMerge } from "@chakra-ui/utils";

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

interface NativeImageProps {
  htmlWidth?: string | number;
  htmlHeight?: string | number;
}

/**
 * This is the interface for a Chakra component.
 * All chakra components support JSX generics
 *
 * @template H - The props for the hook
 * @template T - The component type
 * @template P - The generic prop passed
 */
export interface CreateChakraComponent<
  T extends As,
  H = {},
  C extends ComponentThemingProps = {}
> {
  <P>(
    props: GenericMiddleware<P, H, T> &
      SystemProps &
      SafeMerge<ComponentThemingProps, C> &
      NativeImageProps &
      OtherProps,
  ): JSX.Element;

  displayName?: string;

  defaultProps?: Partial<
    MergePropsOf<H, T> & SystemProps & ComponentThemingProps
  >;
}

/**
 * For all components that has `themeKey` passed,
 * the user can pass these 3 props to customize them
 */
interface ComponentThemingProps {
  variant?: string;
  variantSize?: string;
  variantColor?: string;
}

/**
 * When using `createChakra`, you can pass any of these options
 */
export interface CreateChakraOptions<P> {
  /**
   * The hook to execute within the component.
   * @returns valid HTML attributes
   */
  hook?: (props: P) => React.HTMLProps<any>;
  /**
   * The key of this component in `theme.components`.
   * Ideally, this should be the name of the component
   */
  themeKey?: string;
  /**
   * Add a data-* signature to this component.
   * @example
   * dataAttr : "button",
   * => `data-chakra-button`
   */
  dataAttr?: string;
  /**
   * Some base styles to add the all components
   */
  baseStyles?: SystemProps;
}

///////////////////////////////////////////////////////////////////

type ThemingProps = {
  /**
   * The `variant` prop passed to the component
   */
  variant: string;
  /**
   * The `theme` object
   */
  theme: object;
  /**
   * The `variantColor` prop passed to the component
   */
  variantColor: string;
  /**
   * The current `colorMode` from localStorage
   */
  colorMode: "light" | "dark";
};

type Style = {
  [k: string]: SystemProps | ((props: ThemingProps) => SystemProps);
};

export interface ComponentStyle {
  variant?: Style;
  variantColor?: Style;
  variantSize?: Style;
}
