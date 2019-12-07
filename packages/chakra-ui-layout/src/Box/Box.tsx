import * as React from "react";
import styled, { FunctionInterpolation } from "@emotion/styled";
import { Omit } from "@chakra-ui/utils";
import { systemFn, shouldForwardProp, SystemProps, truncate } from "./system";
import { pseudo } from "./pseudo";

const StyledBox = styled("div", {
  shouldForwardProp,
})(
  systemFn,
  pseudo as FunctionInterpolation<object>,
  truncate as FunctionInterpolation<any>,
);

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

const Box2 = React.forwardRef(function Box<P, T extends HTMLElement>(
  props: BoxProps<P, T>,
  ref: React.Ref<T>,
) {
  //@ts-ignore
  return <StyledBox ref={ref} {...props} />;
}) as {
  <P, T = any>(props: BoxProps<P, T>): React.ReactElement<BoxProps<P, T>>;
  displayName?: string;
};

Box2.displayName = "Box2";

function Test() {
  return (
    <Box2<{ sun?: boolean }, HTMLButtonElement>
      onKeyDown={event => {
        console.log(event);
      }}
      onClick={event => {
        console.log(event);
      }}
      sun
    />
  );
}

export default Box;
export { SystemProps };
