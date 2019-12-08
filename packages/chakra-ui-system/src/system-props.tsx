import { Theme } from "@chakra-ui/theme";
import { Omit } from "@chakra-ui/utils";
import {
  createShouldForwardProp,
  props,
} from "@styled-system/should-forward-prop";
import * as SS from "styled-system";
import { customProps, CustomProps } from "./system-config";
import { PseudoProps } from "./system-pseudo";

// Prevent some prop from getting to the underlying DOM element
const _shouldForwardProp = createShouldForwardProp([
  ...props,
  "d",
  "textDecoration",
  "pointerEvents",
  "visibility",
  "transform",
  "cursor",
  "fill",
  "stroke",
]);

/**
 * htmlWidth and htmlHeight is used in the <Image />
 * component to support the native `width` and `height` attributes
 *
 * https://github.com/chakra-ui/chakra-ui/issues/149
 */
const nativeHTMLPropAlias = ["htmlWidth", "htmlHeight"];

export function shouldForwardProp(prop: string) {
  if (nativeHTMLPropAlias.includes(prop)) {
    return true;
  } else {
    return _shouldForwardProp(prop);
  }
}

// Compose all style functions into a single function
export const systemFn = SS.compose(
  SS.layout,
  SS.color,
  SS.space,
  SS.background,
  SS.border,
  SS.grid,
  SS.position,
  SS.shadow,
  SS.typography,
  SS.flexbox,
  SS.zIndex,
  customProps,
);

// Allow users pass the `isTruncated` prop from any component
export function truncate(props: {
  isTruncated?: boolean;
}): SystemProps | undefined {
  if (props.isTruncated) {
    return {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    };
  }
}

// Type Definitions

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
  // ModifiedTypographyProps &
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

export type BoxHTMLProps = React.RefAttributes<any> &
  Omit<React.HTMLAttributes<any>, "color">;

export type AllProps = SystemProps & BoxHTMLProps;
