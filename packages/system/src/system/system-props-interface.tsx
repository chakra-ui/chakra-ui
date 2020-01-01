import * as SS from "styled-system";
import { CustomProps } from "./custom-props-interface";
import { PseudoProps } from "./pseudo-props-interface";

// All system props
// Write a TS Generic that'll take the custom theme and provider autocompletion
export type SystemProps = SS.ColorProps &
  SS.LayoutProps &
  SS.SpaceProps &
  SS.TypographyProps &
  SS.PositionProps &
  SS.BordersProps &
  SS.FlexboxProps &
  SS.ShadowProps &
  SS.GridProps &
  SS.OpacityProps &
  SS.OverflowProps &
  SS.ZIndexProps &
  PseudoProps &
  CustomProps;
