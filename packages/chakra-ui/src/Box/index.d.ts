import * as StyledSystem from "styled-system";
import * as Emotion from "@emotion/styled";
import * as React from "react";
import { Omit } from "../common-types";

type CSS = React.CSSProperties;

type borderRadius = StyledSystem.BorderRadiusProps["borderRadius"];
type borderColor = StyledSystem.BorderColorProps["borderColor"];

interface ICustomConfig {
  // Custom borderRadius alias
  rounded?: borderRadius;
  roundedTop?: borderRadius;
  roundedBottom?: borderRadius;
  roundedLeft?: borderRadius;
  roundedRight?: borderRadius;
  roundedTopRight?: borderRadius;
  roundedTopLeft?: borderRadius;
  roundedBottomRight?: borderRadius;
  roundedBottomLeft?: borderRadius;

  // Custom borderColor alias
  borderBottomColor?: borderColor;
  borderTopColor?: borderColor;
  borderRightColor?: borderColor;
  borderLeftColor?: borderColor;

  // Custom width alias
  w?: StyledSystem.WidthProps["width"];
  minW?: StyledSystem.MinWidthProps["minWidth"];
  maxW?: StyledSystem.MaxWidthProps["maxWidth"];

  // Custom height alias
  h?: StyledSystem.HeightProps["height"];
  minH?: StyledSystem.MinHeightProps["minHeight"];
  maxH?: StyledSystem.MaxHeightProps["maxHeight"];

  // Custom display alias
  d?: StyledSystem.DisplayProps["display"];

  // Custom background alias
  backgroundAttachment?: StyledSystem.ResponsiveValue<
    CSS["backgroundAttachment"]
  >;
  bgImg?: StyledSystem.BackgroundImageProps["backgroundImage"];
  bgSize?: StyledSystem.BackgroundSizeProps["backgroundSize"];
  bgPos?: StyledSystem.BackgroundPositionProps["backgroundPosition"];
  pos?: StyledSystem.PositionProps["position"];
  flexDir?: StyledSystem.FlexDirectionProps["flexDirection"];

  // CSS properties
  textDecoration?: StyledSystem.ResponsiveValue<CSS["textDecoration"]>;
  textDecor?: StyledSystem.ResponsiveValue<CSS["textDecoration"]>;
  textTransform?: StyledSystem.ResponsiveValue<CSS["textTransform"]>;
  overflowX?: StyledSystem.ResponsiveValue<CSS["overflowX"]>;
  overflowY?: StyledSystem.ResponsiveValue<CSS["overflowY"]>;
  appearance?: StyledSystem.ResponsiveValue<CSS["appearance"]>;
  transform?: StyledSystem.ResponsiveValue<CSS["transform"]>;
  transformOrigin?: StyledSystem.ResponsiveValue<CSS["transformOrigin"]>;
  animation?: StyledSystem.ResponsiveValue<CSS["animation"]>;
  userSelect?: StyledSystem.ResponsiveValue<CSS["userSelect"]>;
  pointerEvents?: StyledSystem.ResponsiveValue<CSS["pointerEvents"]>;
  boxSizing?: StyledSystem.ResponsiveValue<CSS["boxSizing"]>;
  cursor?: StyledSystem.ResponsiveValue<CSS["cursor"]>;
  resize?: StyledSystem.ResponsiveValue<CSS["resize"]>;
  transition?: StyledSystem.ResponsiveValue<CSS["transition"]>;
  objectFit?: StyledSystem.ResponsiveValue<CSS["objectFit"]>;
  objectPosition?: StyledSystem.ResponsiveValue<CSS["objectPosition"]>;

  // Ellipsis alias
  wordBreak?: StyledSystem.ResponsiveValue<CSS["wordBreak"]>;
  overflowWrap?: StyledSystem.ResponsiveValue<CSS["overflowWrap"]>;
  whiteSpace?: StyledSystem.ResponsiveValue<CSS["whiteSpace"]>;

  // SVG color properties
  fill?: StyledSystem.ColorProps["color"];
  stroke?: StyledSystem.ColorProps["color"];

  bgAttachment?: StyledSystem.ResponsiveValue<CSS["backgroundAttachment"]>;
  shadow?: StyledSystem.BoxShadowProps["boxShadow"];

  // List properties
  listStyleType?: StyledSystem.ResponsiveValue<CSS["listStyleType"]>;
  listStylePosition?: StyledSystem.ResponsiveValue<CSS["listStylePosition"]>;
  listStyleImage?: StyledSystem.ResponsiveValue<CSS["listStyleImage"]>;
  listStyleImg?: StyledSystem.ResponsiveValue<CSS["listStyleImage"]>;
  listStylePos?: StyledSystem.ResponsiveValue<CSS["listStylePosition"]>;

  // Outline prop
  outline?: StyledSystem.ResponsiveValue<CSS["outline"]>;
  float?: StyledSystem.ResponsiveValue<CSS["float"]>;
}

type FontSize =
  | "xs"
  | "sm"
  | "base"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl";

interface IFontSize {
  fontSize?:
    | StyledSystem.ResponsiveValue<FontSize>
    | StyledSystem.FontSizeProps["fontSize"];
}

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

interface IFontWeight {
  fontWeight?:
    | StyledSystem.ResponsiveValue<FontWeight>
    | StyledSystem.FontWeightProps["fontWeight"];
}

type LineHeight = "none" | "shorter" | "short" | "normal" | "tall" | "taller";

interface ILineHeight {
  lineHeight?:
    | StyledSystem.ResponsiveValue<LineHeight>
    | StyledSystem.LineHeightProps["lineHeight"];
}

type LetterSpacing =
  | "tighter"
  | "tight"
  | "normal"
  | "wide"
  | "wider"
  | "widest";

interface ILetterSpacing {
  letterSpacing?:
    | StyledSystem.ResponsiveValue<LetterSpacing>
    | StyledSystem.LetterSpacingProps["letterSpacing"];
}

interface As {
  as?: React.ElementType;
}

type TypographyProps = Omit<
  StyledSystem.TypographyProps,
  "fontWeight" | "lineHeight" | "fontSize" | "letterSpacing"
>;

interface Truncated {
  /**
   * If `true`, the text will be truncated
   */
  isTruncated?: boolean;
}

export type BoxProps = React.RefAttributes<HTMLElement> &
  React.HTMLAttributes<HTMLElement> &
  StyledSystem.LayoutProps &
  StyledSystem.ColorProps &
  StyledSystem.SpaceProps &
  StyledSystem.BordersProps &
  StyledSystem.BackgroundProps &
  StyledSystem.PositionProps &
  StyledSystem.FlexboxProps &
  StyledSystem.ShadowProps &
  StyledSystem.GridProps &
  StyledSystem.OpacityProps &
  TypographyProps &
  IFontSize &
  ILetterSpacing &
  IFontWeight &
  ILineHeight &
  ICustomConfig &
  As &
  Truncated;

declare const Box: React.FC<BoxProps>;

export default Box;
