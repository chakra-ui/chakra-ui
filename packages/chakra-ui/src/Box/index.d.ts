import * as StyledSystem from "styled-system";
import * as Emotion from "@emotion/styled";
import * as React from "react";
import * as CSS from "csstype";

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
  textDecoration?: StyledSystem.ResponsiveValue<CSS.TextDecorationProperty>;
  textTransform?: StyledSystem.ResponsiveValue<CSS.TextTransformProperty>;
  overflowX?: StyledSystem.ResponsiveValue<CSS.OverflowXProperty>;
  overflowY?: StyledSystem.ResponsiveValue<CSS.OverflowYProperty>;
  appearance?: StyledSystem.ResponsiveValue<CSS.AppearanceProperty>;
  transform?: StyledSystem.ResponsiveValue<CSS.TransformProperty>;
  transformOrigin?: StyledSystem.ResponsiveValue<
    CSS.TransformOriginProperty<string>
  >;
  whiteSpace?: StyledSystem.ResponsiveValue<CSS.WhiteSpaceProperty>;
  animation?: StyledSystem.ResponsiveValue<CSS.AnimationProperty>;
  userSelect?: StyledSystem.ResponsiveValue<CSS.UserSelectProperty>;
  pointerEvents?: StyledSystem.ResponsiveValue<CSS.PointerEventsProperty>;
  boxSizing?: StyledSystem.ResponsiveValue<CSS.BoxSizingProperty>;
  cursor?: StyledSystem.ResponsiveValue<CSS.CursorProperty>;
  resize?: StyledSystem.ResponsiveValue<CSS.ResizeProperty>;
  transition?: StyledSystem.ResponsiveValue<CSS.TransitionProperty>;
  objectFit?: StyledSystem.ResponsiveValue<CSS.ObjectFitProperty>;
  objectPosition?: StyledSystem.ResponsiveValue<
    CSS.ObjectPositionProperty<string>
  >;
  backgroundAttachment?: StyledSystem.ResponsiveValue<
    CSS.BackgroundAttachmentProperty
  >;
  bgAttachment?: StyledSystem.ResponsiveValue<CSS.BackgroundAttachmentProperty>;

  // SVG color properties
  fill?: StyledSystem.ColorProps;
  stroke?: StyledSystem.ColorProps;
}

interface FontSizeProps {
  fontSize: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
}

interface FontWeightProps {
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

interface LineHeightProps {
  lineHeight: "none" | "shorter" | "short" | "normal" | "tall" | "taller";
}

interface LetterSpacingProps {
  letterSpacing: "tighter" | "tight" | "normal" | "wide" | "wider" | "widest";
}

export type BoxProps = React.AriaAttributes &
  React.RefAttributes<HTMLElement> &
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
  FontSizeProps &
  LetterSpacingProps &
  LineHeightProps &
  ICustomConfig & {
    wordBreak: "normal" | "words" | "all" | "truncate";
    as: React.ReactType;
  };

declare const Box: Emotion.StyledComponent<BoxProps, {}, {}>;

export default Box;
