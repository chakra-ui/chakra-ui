import * as React from "react";
import styled from "@emotion/styled";
import { Omit } from "@chakra-ui/utils";
import { systemFn, shouldForwardProp, SystemProps } from "./system";

const StyledBox = styled("div", {
  shouldForwardProp,
})(systemFn);

type BoxHTMLProps<T> = React.RefAttributes<T> &
  Omit<React.HTMLAttributes<T>, "color">;

export type BoxProps<P = {}, T = HTMLElement> = SystemProps &
  BoxHTMLProps<T> &
  P & {
    as?: React.ElementType;
    isTruncated?: boolean;
  };

const Box = React.forwardRef(function Box<P, T extends HTMLElement>(
  props: BoxProps<P, T>,
  ref: React.Ref<T>,
) {
  //@ts-ignore
  return <StyledBox ref={ref} {...props} />;
}) as <P, T = HTMLElement>(
  props: BoxProps<P, T>,
) => React.ReactElement<BoxProps<P, T>>;

export default Box;
export { SystemProps };
