import * as React from "react";
import styled, { FunctionInterpolation } from "@emotion/styled";
import {
  layout,
  zIndex,
  color,
  space,
  background,
  border,
  grid,
  position,
  shadow,
  typography,
  flexbox,
  ColorProps,
  LayoutProps,
  SpaceProps,
  TypographyProps,
  BordersProps,
  FlexboxProps,
  ShadowProps,
  GridProps,
  OpacityProps,
  OverflowProps,
  PositionProps,
  ZIndexProps,
} from "styled-system";
import { customProps, CustomProps } from "./config";
import { pseudo, PseudoProps } from "./pseudo";
import { Omit } from "../utils";

const StyledBox = styled("div")(
  layout,
  color,
  space,
  background,
  border,
  grid,
  position,
  shadow,
  typography,
  flexbox,
  zIndex,
  pseudo as FunctionInterpolation<object>,
  customProps,
  truncate as FunctionInterpolation<any>,
);

function truncate(props: { isTruncated?: boolean }): SystemProps | undefined {
  if (props.isTruncated) {
    return {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    };
  }
}

export type SystemProps = ColorProps &
  LayoutProps &
  SpaceProps &
  TypographyProps &
  PositionProps &
  BordersProps &
  FlexboxProps &
  ShadowProps &
  GridProps &
  OpacityProps &
  PseudoProps &
  OverflowProps &
  ZIndexProps &
  CustomProps;

type BoxHTMLProps<T> = React.RefAttributes<T> &
  Omit<React.HTMLAttributes<T>, "color">;

export type BoxProps<P = {}, T = HTMLElement> = SystemProps &
  BoxHTMLProps<T> &
  P & {
    as?: React.ElementType;
    isTruncated?: boolean;
  };

const Box = React.forwardRef(function Box<P, T>(
  props: BoxProps<P, T>,
  ref: React.Ref<T>,
) {
  return <StyledBox ref={ref} {...props} />;
}) as <P, T = HTMLElement>(
  props: BoxProps<P, T>,
) => React.ReactElement<BoxProps<P, T>>;

export default Box;
