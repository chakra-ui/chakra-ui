import * as SS from "styled-system";
import { Theme } from "@chakra-ui/theme";
import { CustomProps } from "./custom-props-interface";
import { PseudoProps } from "./pseudo-props-interface";

// Modify the font size types from styled-system to include fontSizes in Theme
interface ModifiedFontSize {
  fontSize?:
    | SS.ResponsiveValue<keyof Theme["fontSizes"]>
    | SS.FontSizeProps["fontSize"];
}

// Modify the font weight types from styled-system to include fontWeight in Theme
interface ModifiedFontWeight {
  fontWeight?:
    | SS.ResponsiveValue<keyof Theme["fontWeights"]>
    | SS.FontWeightProps["fontWeight"];
}

// Modify the font line types from styled-system to include lineHeight in Theme
interface ModifiedLineHeight {
  lineHeight?:
    | SS.ResponsiveValue<keyof Theme["lineHeights"]>
    | SS.LineHeightProps["lineHeight"];
}

// Modify the font size types from styled-system to include letterSpacing in Theme
interface ModifiedLetterSpacing {
  letterSpacing?:
    | SS.ResponsiveValue<keyof Theme["letterSpacings"]>
    | SS.LetterSpacingProps["letterSpacing"];
}

// Replace the types in styled-system typography with modified types
type ModifiedTypographyProps = Omit<
  SS.TypographyProps,
  "fontWeight" | "lineHeight" | "fontSize" | "letterSpacing"
> &
  ModifiedFontSize &
  ModifiedFontWeight &
  ModifiedLineHeight &
  ModifiedLetterSpacing;

// All system props
export type SystemProps = SS.ColorProps &
  SS.LayoutProps &
  SS.SpaceProps &
  ModifiedTypographyProps &
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

export type BoxHTMLProps<T = any> = React.RefAttributes<T> &
  Omit<React.HTMLAttributes<T>, "color">;

export type AllProps = SystemProps & BoxHTMLProps;
