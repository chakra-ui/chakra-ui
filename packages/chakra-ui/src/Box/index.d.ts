import * as StyledSystem from "styled-system";
import * as Emotion from "@emotion/styled";
import * as React from "react";

type CSS = React.CSSProperties;

interface ICustomConfig {
  // Custom borderRadius alias
  rounded?: StyledSystem.BorderRadiusProps;
  roundedTop?: StyledSystem.BorderRadiusProps;
  roundedBottom?: StyledSystem.BorderRadiusProps;
  roundedLeft?: StyledSystem.BorderRadiusProps;
  roundedRight?: StyledSystem.BorderRadiusProps;
  roundedTopRight?: StyledSystem.BorderRadiusProps;
  roundedTopLeft?: StyledSystem.BorderRadiusProps;
  roundedBottomRight?: StyledSystem.BorderRadiusProps;
  roundedBottomLeft?: StyledSystem.BorderRadiusProps;

  // Custom borderColor alias
  borderBottomColor?: StyledSystem.BorderColorProps;
  borderTopColor?: StyledSystem.BorderColorProps;
  borderRightColor?: StyledSystem.BorderColorProps;
  borderLeftColor?: StyledSystem.BorderColorProps;

  // Custom width alias
  w?: StyledSystem.WidthProps;
  minW?: StyledSystem.MinWidthProps;
  maxW?: StyledSystem.MaxWidthProps;

  // Custom height alias
  h?: StyledSystem.HeightProps;
  minH?: StyledSystem.MinHeightProps;
  maxH?: StyledSystem.MaxHeightProps;

  // Custom display alias
  d?: StyledSystem.DisplayProps;

  // Custom background alias
  backgroundAttachment?: StyledSystem.ResponsiveValue<
    CSS["backgroundAttachment"]
  >;
  bgImg?: StyledSystem.BackgroundImageProps;
  bgSize?: StyledSystem.BackgroundSizeProps;
  bgPos?: StyledSystem.BackgroundPositionProps;
  pos?: StyledSystem.PositionProps;
  flexDir?: StyledSystem.FlexDirectionProps;

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
  fill?: StyledSystem.ColorProps;
  stroke?: StyledSystem.ColorProps;

  bgAttachment?: StyledSystem.ResponsiveValue<CSS["backgroundAttachment"]>;
  shadow?: StyledSystem.BoxShadowProps;

  // List properties
  listStyleType?: StyledSystem.ResponsiveValue<CSS["listStyleType"]>;
  listStylePosition?: StyledSystem.ResponsiveValue<CSS["listStylePosition"]>;
  listStyleImage?: StyledSystem.ResponsiveValue<CSS["listStyleImage"]>;
  listStyleImg?: StyledSystem.ResponsiveValue<CSS["listStyleImage"]>;
  listStylePos?: StyledSystem.ResponsiveValue<CSS["listStylePosition"]>;
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
  | "5xl";

interface IFontSize {
  fontSize?: StyledSystem.ResponsiveValue<FontSize>;
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
  fontWeight?: StyledSystem.ResponsiveValue<FontWeight>;
}

type LineHeight = "none" | "shorter" | "short" | "normal" | "tall" | "taller";
interface ILineHeight {
  lineHeight?: StyledSystem.ResponsiveValue<LineHeight>;
}

type LetterSpacing =
  | "tighter"
  | "tight"
  | "normal"
  | "wide"
  | "wider"
  | "widest";

interface ILetterSpacing {
  letterSpacing?: StyledSystem.ResponsiveValue<LetterSpacing>;
}

interface As {
  as?: React.ElementType;
}

type TypographyProps = Omit<
  StyledSystem.TypographyProps,
  "fontWeight" | "lineHeight" | "fontSize" | "letterSpacing"
>;

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
  As;

declare const Box: Emotion.StyledComponent<BoxProps, {}, {}>;

export default Box;
