import * as StyledSystem from "styled-system";
import * as Emotion from "@emotion/styled";
import * as React from "react";

type CSS = Emotion.CSSObject;

interface ICustomConfig {
  // Border radius shorthand
  rounded?: StyledSystem.BorderRadiusProps;
  roundedTop?: StyledSystem.BorderRadiusProps;
  roundedBottom?: StyledSystem.BorderRadiusProps;
  roundedLeft?: StyledSystem.BorderRadiusProps;
  roundedRight?: StyledSystem.BorderRadiusProps;
  roundedTopRight?: StyledSystem.BorderRadiusProps;
  roundedTopLeft?: StyledSystem.BorderRadiusProps;
  roundedBottomRight?: StyledSystem.BorderRadiusProps;
  roundedBottomLeft?: StyledSystem.BorderRadiusProps;

  // Custom border color
  borderBottomColor?: StyledSystem.BorderColorProps;
  borderTopColor?: StyledSystem.BorderColorProps;
  borderRightColor?: StyledSystem.BorderColorProps;
  borderLeftColor?: StyledSystem.BorderColorProps;

  // CSS properties
  textDecoration?: StyledSystem.ResponsiveValue<CSS["textDecoration"]>;
  textTransform?: StyledSystem.ResponsiveValue<CSS["textTransform"]>;
  overflowX?: StyledSystem.ResponsiveValue<CSS["overflowX"]>;
  overflowY?: StyledSystem.ResponsiveValue<CSS["overflowY"]>;
  appearance?: StyledSystem.ResponsiveValue<CSS["appearance"]>;
  transform?: StyledSystem.ResponsiveValue<CSS["transform"]>;
  transformOrigin?: StyledSystem.ResponsiveValue<CSS["transformOrigin"]>;
  whiteSpace?: StyledSystem.ResponsiveValue<CSS["whiteSpace"]>;
  animation?: StyledSystem.ResponsiveValue<CSS["animation"]>;
  userSelect?: StyledSystem.ResponsiveValue<CSS["userSelect"]>;
  pointerEvents?: StyledSystem.ResponsiveValue<CSS["pointerEvents"]>;
  boxSizing?: StyledSystem.ResponsiveValue<CSS["boxSizing"]>;
  cursor?: StyledSystem.ResponsiveValue<CSS["cursor"]>;
  resize?: StyledSystem.ResponsiveValue<CSS["resize"]>;
  transition?: StyledSystem.ResponsiveValue<CSS["transition"]>;
  objectFit?: StyledSystem.ResponsiveValue<CSS["objectFit"]>;
  objectPosition?: StyledSystem.ResponsiveValue<CSS["objectPosition"]>;
  backgroundAttachment?: StyledSystem.ResponsiveValue<
    CSS["backgroundAttachment"]
  >;
  bgAttachment?: StyledSystem.ResponsiveValue<CSS["backgroundAttachment"]>;

  // SVG color properties
  fill?: StyledSystem.ColorProps;
  stroke?: StyledSystem.ColorProps;
}

interface IFontSize {
  fontSize: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
}

interface IFontWeight {
  fontWeight?:
    | "hairline"
    | "thin"
    | "light"
    | "normal"
    | "medium"
    | "semibold"
    | "bold"
    | "extrabold"
    | "black";
}

interface ILineHeight {
  lineHeight: "none" | "shorter" | "short" | "normal" | "tall" | "taller";
}

interface ILetterSpacing {
  letterSpacing: "tighter" | "tight" | "normal" | "wide" | "wider" | "widest";
}

export type BoxProps = React.RefAttributes<HTMLElement> &
  React.HTMLAttributes<HTMLDivElement> &
  StyledSystem.LayoutProps &
  StyledSystem.ColorProps &
  StyledSystem.SpaceProps &
  StyledSystem.BordersProps &
  StyledSystem.BackgroundProps &
  StyledSystem.PositionProps &
  StyledSystem.FlexboxProps &
  StyledSystem.ShadowProps &
  StyledSystem.OpacityProps &
  StyledSystem.TypographyProps &
  IFontSize &
  ILetterSpacing &
  ILineHeight &
  ICustomConfig & {
    wordBreak: "normal" | "words" | "all" | "truncate";
    as: React.ElementType;
  };

declare const Box: Emotion.StyledComponent<BoxProps, {}, {}>;

export default Box;
