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
  LetterSpacingProps as _LetterSpacingProps,
} from "styled-system";
import { StyledComponent } from "@emotion/styled";
import { RefAttributes, AriaAttributes, HTMLAttributes } from "react";

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

export interface BoxProps
  extends AriaAttributes,
    RefAttributes<HTMLElement>,
    HTMLAttributes<HTMLDivElement>,
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
    FontSizeProps,
    FontWeightProps,
    LetterSpacingProps,
    LineHeightProps,
    GridProps {
  wordBreak: "normal" | "words" | "all" | "truncate";
  as: string | React.ReactElement;
  textTransform: "uppercase" | "lowercase" | "capitalize" | "normal-case";
}

declare const Box: StyledComponent<BoxProps, {}, {}>;

export default Box;
