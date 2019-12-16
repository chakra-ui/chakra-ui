import * as React from "react";
import { HTMLElements } from "./supported-elements";
import { SystemProps } from "../system";

export type As<P = any> = React.ReactType<P>;

export type PropsOf<T extends As> = React.ComponentPropsWithRef<T>;

type MergePropsOf<P, T extends As> = {} extends P
  ? Omit<P, keyof PropsOf<T>> & PropsOf<T>
  : PropsOf<T>;

interface OtherProps {
  as?: React.ElementType;
  isTruncated?: boolean;
  children?: React.ReactNode;
  apply?: string;
  htmlWidth?: string | number;
  htmlHeight?: string | number;
}

export interface ChakraComponent<T extends As> {
  <P>(props: MergePropsOf<P, T> & SystemProps & OtherProps): JSX.Element;
  displayName?: string;
  defaultProps?: Partial<PropsOf<T> & SystemProps & OtherProps>;
}

export type HTMLChakraComponents = {
  [K in HTMLElements]: ChakraComponent<K>;
};

export interface ChakraOptions {
  apply?: string;
}
