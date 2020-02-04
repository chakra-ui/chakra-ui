import * as SS from "styled-system";
import { CustomProps } from "./custom/custom.interface";
import { PseudoProps } from "./pseudo";

type FontWeight =
  | "hairline"
  | "thin"
  | "light"
  | "normal"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold"
  | "black";

interface FontWeightProp {
  fontWeight?:
    | SS.ResponsiveValue<FontWeight>
    | SS.FontWeightProps["fontWeight"];
}

export type SystemProps = SS.ColorProps &
  SS.LayoutProps &
  SS.SpaceProps &
  Omit<SS.TypographyProps, "fontWeight"> &
  FontWeightProp &
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
