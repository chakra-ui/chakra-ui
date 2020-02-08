import * as React from "react";
import { SystemProps, ValidHTMLProps } from "../system";

export type As<P = any> = React.ReactType<P>;

export type PropsOf<T extends As> = React.ComponentPropsWithRef<T>;

type MergePropsOf<P, T extends As> = {} extends P
  ? Omit<P, keyof PropsOf<T>> & PropsOf<T>
  : PropsOf<T>;

type MergeGeneric<G, P, T extends As> = G & Omit<MergePropsOf<P, T>, keyof G>;

type GenericMiddleware<G, P, T extends As> = {} extends G
  ? MergeGeneric<G, P, T>
  : MergePropsOf<P, T>;

interface CustomizableProps {
  variant?: string;
  variantSize?: string;
  variantColor?: string;
}

interface ChakraProps extends SystemProps, ValidHTMLProps, CustomizableProps {
  as?: React.ElementType;
  isTruncated?: boolean;
  children?: React.ReactNode;
}

export interface CreateChakraComponent<T extends As, P = {}> {
  <G>(props: GenericMiddleware<G, P, T> & ChakraProps): JSX.Element;
  displayName?: string;
  defaultProps?: Partial<MergePropsOf<P, T> & ChakraProps>;
  propTypes?: {
    [prop: string]: React.Validator<any>;
  };
}

/**
 * When using `createChakra`, you can pass any of these options
 */
export interface CreateChakraOptions<P> {
  /**
   * The key of this component in `theme.components`.
   * Ideally, this should be the name of the component
   */
  themeKey?: string;
  /**
   * Additional props to attach to the component
   * You can use a function to make it dynamic
   */
  attrs?: PropsFunctionOrObject<P>;
  /**
   * Base style object to apply to this component
   * NB: This style is theme-aware so you can use all style props
   */
  baseStyle?: StyleFunctionOrObject<P>;
  /**
   * A boolean indicating if the component should avoid re-rendering
   * when props haven't changed. This uses `React.memo(...)`
   */
  pure?: boolean;
  /**
   * Whether we should forward prop to the underlying component.
   *
   * Useful when using `createChakra` with custom components, or using
   * custom prop name to control component styles.
   */
  shouldForwardProp?(propName: string): boolean;
}

type StyleFunctionOrObject<P> =
  | SystemProps
  | ((props: P & { colorMode?: "light" | "dark" }) => SystemProps);

type PropsFunctionOrObject<P> =
  | React.AllHTMLAttributes<any>
  | ((
      props: P & { colorMode?: "light" | "dark" },
    ) => React.AllHTMLAttributes<any>);
