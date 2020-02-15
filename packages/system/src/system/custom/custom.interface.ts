import * as SS from "styled-system";

type borderRadius = SS.BorderRadiusProps["borderRadius"];
type borderColor = SS.BorderColorProps["borderColor"];
type CSS = React.CSSProperties;

export interface CustomProps {
  borderTopRadius?: borderRadius;
  borderBottomRadius?: borderRadius;
  borderLeftRadius?: borderRadius;
  borderRightRadius?: borderRadius;
  borderTopRightRadius?: borderRadius;
  borderTopLeftRadius?: borderRadius;
  borderBottomRightRadius?: borderRadius;
  borderBottomLeftRadius?: borderRadius;

  // Custom borderColor alias
  borderBottomColor?: borderColor;
  borderTopColor?: borderColor;
  borderRightColor?: borderColor;
  borderLeftColor?: borderColor;

  // Custom width alias
  w?: SS.WidthProps["width"];
  minW?: SS.MinWidthProps["minWidth"];
  maxW?: SS.MaxWidthProps["maxWidth"];

  // Custom height alias
  h?: SS.HeightProps["height"];
  minH?: SS.MinHeightProps["minHeight"];
  maxH?: SS.MaxHeightProps["maxHeight"];

  // Custom display alias
  d?: SS.DisplayProps["display"];

  // Custom background alias
  backgroundAttachment?: SS.ResponsiveValue<CSS["backgroundAttachment"]>;
  bgImage?: SS.BackgroundImageProps["backgroundImage"];
  bgSize?: SS.BackgroundSizeProps["backgroundSize"];
  bgPos?: SS.BackgroundPositionProps["backgroundPosition"];
  pos?: SS.PositionProps["position"];
  flexDir?: SS.FlexDirectionProps["flexDirection"];

  // CSS properties
  textDecoration?: SS.ResponsiveValue<CSS["textDecoration"]>;
  textDecor?: SS.ResponsiveValue<CSS["textDecoration"]>;
  textTransform?: SS.ResponsiveValue<CSS["textTransform"]>;
  overflowX?: SS.OverflowProps["overflow"];
  overflowY?: SS.OverflowProps["overflow"];
  appearance?: SS.ResponsiveValue<CSS["appearance"]>;
  transform?: SS.ResponsiveValue<CSS["transform"]>;
  transformOrigin?: SS.ResponsiveValue<CSS["transformOrigin"]>;
  animation?: SS.ResponsiveValue<CSS["animation"]>;
  userSelect?: string | SS.ResponsiveValue<CSS["userSelect"]>;
  pointerEvents?: SS.ResponsiveValue<CSS["pointerEvents"]>;
  boxSizing?: SS.ResponsiveValue<CSS["boxSizing"]>;
  cursor?: SS.ResponsiveValue<CSS["cursor"]>;
  resize?: SS.ResponsiveValue<CSS["resize"]>;
  transition?: SS.ResponsiveValue<CSS["transition"]>;
  objectFit?: SS.ResponsiveValue<CSS["objectFit"]>;
  objectPosition?: SS.ResponsiveValue<CSS["objectPosition"]>;

  // Ellipsis alias
  wordBreak?: SS.ResponsiveValue<CSS["wordBreak"]>;
  overflowWrap?: SS.ResponsiveValue<CSS["overflowWrap"]>;
  textOverflow?: SS.ResponsiveValue<CSS["textOverflow"]>;
  whiteSpace?: SS.ResponsiveValue<CSS["whiteSpace"]>;

  textColor?: SS.ColorProps["color"];
  placeItems?: SS.ResponsiveValue<CSS["placeItems"]>;

  // SVG color properties
  fill?: SS.ColorProps["color"];
  stroke?: SS.ColorProps["color"];

  bgAttachment?: SS.ResponsiveValue<CSS["backgroundAttachment"]>;
  shadow?: SS.BoxShadowProps["boxShadow"];

  // List properties
  listStyleType?: SS.ResponsiveValue<CSS["listStyleType"]>;
  listStylePosition?: SS.ResponsiveValue<CSS["listStylePosition"]>;
  listStyleImage?: SS.ResponsiveValue<CSS["listStyleImage"]>;
  listStyleImg?: SS.ResponsiveValue<CSS["listStyleImage"]>;
  listStylePos?: SS.ResponsiveValue<CSS["listStylePosition"]>;

  // Outline prop
  outline?: SS.ResponsiveValue<CSS["outline"]>;
  float?: SS.ResponsiveValue<CSS["float"]>;
  willChange?: SS.ResponsiveValue<CSS["willChange"]>;

  // Border Width props
  borderTopWidth?: SS.ResponsiveValue<CSS["borderTopWidth"]>;
  borderBottomWidth?: SS.ResponsiveValue<CSS["borderBottomWidth"]>;
  borderLeftWidth?: SS.ResponsiveValue<CSS["borderLeftWidth"]>;
  borderRightWidth?: SS.ResponsiveValue<CSS["borderRightWidth"]>;
}
