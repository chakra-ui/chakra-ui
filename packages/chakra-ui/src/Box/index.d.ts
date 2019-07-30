import {
  LayoutProps,
  ColorProps,
  SpaceProps,
  BordersProps,
  BackgroundProps,
  PositionProps,
  TypographyProps,
  FlexboxProps,
  ShadowProps,
  OpacityProps,
  GridProps,
  FontSizeProps as _FontSizeProps,
  FontWeightProps as _FontWeightProps,
  LineHeightProps as _LineHeightProps,
  BorderRadiusProps,
  BorderColorProps,
  LetterSpacingProps as _LetterSpacingProps
} from "styled-system";
import { StyledComponent } from "@emotion/styled";
import {
  RefAttributes,
  AriaAttributes,
  HTMLAttributes,
  ElementType
} from "react";
import {
  TextDecorationProperty,
  TextTransformProperty,
  OverflowXProperty,
  OverflowYProperty,
  AppearanceProperty,
  TransformProperty,
  TransformOriginProperty,
  WhiteSpaceProperty,
  UserSelectProperty,
  PointerEventsProperty,
  CursorProperty,
  ResizeProperty,
  TransitionProperty,
  ObjectFitProperty,
  ObjectPositionProperty,
  BackgroundAttachmentProperty
} from "csstype";

interface ICustomConfig {
  // Border radius shorthand
  rounded?: BorderRadiusProps;
  roundedTop?: BorderRadiusProps;
  roundedBottom?: BorderRadiusProps;
  roundedLeft?: BorderRadiusProps;
  roundedRight?: BorderRadiusProps;
  roundedTopRight?: BorderRadiusProps;
  roundedTopLeft?: BorderRadiusProps;
  roundedBottomRight?: BorderRadiusProps;
  roundedBottomLeft?: BorderRadiusProps;

  // Custom border color
  borderBottomColor?: BorderColorProps;
  borderTopColor?: BorderColorProps;
  borderRightColor?: BorderColorProps;
  borderLeftColor?: BorderColorProps;

  // CSS properties
  textDecoration?: TextDecorationProperty;
  textTransform?: TextTransformProperty;
  overflowX?: OverflowXProperty;
  overflowY?: OverflowYProperty;
  appearance?: AppearanceProperty;
  transform?: TransformProperty;
  transformOrigin?: TransformOriginProperty;
  whiteSpace?: WhiteSpaceProperty;
  userSelect?: UserSelectProperty;
  pointerEvents?: PointerEventsProperty;
  boxSizing?: BoxSizingProperty;
  cursor?: CursorProperty;
  resize?: ResizeProperty;
  transition?: TransitionProperty;
  objectFit?: ObjectFitProperty;
  objectPosition?: ObjectPositionProperty;
  backgroundAttachment?: BackgroundAttachmentProperty;
  bgAttachment?: BackgroundAttachmentProperty;

  // SVG color properties
  fill?: ColorProps;
  stroke?: ColorProps;
}

type FontSizeProps =
  | {
      fontSize:
        | "xs"
        | "sm"
        | "base"
        | "lg"
        | "xl"
        | "2xl"
        | "3xl"
        | "4xl"
        | "5xl";
    }
  | { fontSize: _FontSizeProps };

type FontWeightProps =
  | {
      fontWeight:
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
  | { fontSize: _FontWeightProps };

type LineHeightProps =
  | { lineHeight: "none" | "shorter" | "short" | "normal" | "tall" | "taller" }
  | { lineHeight: _LineHeightProps };

type LetterSpacingProps =
  | {
      letterSpacing:
        | "tigther"
        | "tight"
        | "normal"
        | "wide"
        | "wider"
        | "widest";
    }
  | { letterSpacing: _LetterSpacingProps };

export type BoxProps = AriaAttributes &
  RefAttributes<HTMLElement> &
  HTMLAttributes<HTMLDivElement> &
  LayoutProps &
  ColorProps &
  SpaceProps &
  BordersProps &
  BackgroundProps &
  PositionProps &
  TypographyProps &
  FlexboxProps &
  ShadowProps &
  OpacityProps &
  FontSizeProps &
  FontWeightProps &
  LetterSpacingProps &
  LineHeightProps &
  GridProps &
  ICustomConfig & {
    wordBreak: "normal" | "words" | "all" | "truncate";
    as: ElementType;
  };

declare const Box: StyledComponent<BoxProps, {}, {}>;

export default Box;
