import * as SS from "styled-system";

export const config: { [key: string]: any } = {
  roundedTop: {
    properties: ["borderTopLeftRadius", "borderTopRightRadius"],
    scale: "radii",
  },
  roundedBottom: {
    properties: ["borderBottomLeftRadius", "borderBottomRightRadius"],
    scale: "radii",
  },
  roundedLeft: {
    properties: ["borderTopLeftRadius", "borderBottomLeftRadius"],
    scale: "radii",
  },
  roundedRight: {
    properties: ["borderTopRightRadius", "borderBottomRightRadius"],
    scale: "radii",
  },
  roundedTopRight: {
    property: "borderTopRightRadius",
    scale: "radii",
  },
  roundedTopLeft: {
    property: "borderTopLeftRadius",
    scale: "radii",
  },
  roundedBottomRight: {
    property: "borderBottomRightRadius",
    scale: "radii",
  },
  roundedBottomLeft: {
    property: "borderBottomLeftRadius",
    scale: "radii",
  },
  rounded: {
    property: "borderRadius",
    scale: "radii",
  },
  d: {
    property: "display",
  },
  w: {
    property: "width",
    scale: "sizes",
  },
  minW: {
    property: "minWidth",
    scale: "sizes",
  },
  maxW: {
    property: "maxWidth",
    scale: "sizes",
  },
  h: {
    property: "height",
    scale: "sizes",
  },
  minH: {
    property: "minHeight",
    scale: "sizes",
  },
  maxH: {
    property: "maxHeight",
    scale: "sizes",
  },
  bgImg: {
    property: "backgroundImage",
  },
  bgImage: {
    property: "backgroundImage",
  },
  bgSize: {
    property: "backgroundSize",
  },
  bgPos: {
    property: "backgroundPosition",
  },
  bgRepeat: {
    property: "backgroundRepeat",
  },
  pos: {
    property: "position",
  },
  flexDir: {
    property: "flexDirection",
  },
  shadow: {
    property: "boxShadow",
    scale: "shadows",
  },
  textDecoration: { property: "textDecoration" },
  overflowX: true,
  overflowY: true,
  textTransform: true,
  animation: true,
  appearance: true,
  transform: true,
  transformOrigin: true,
  visibility: true,
  whiteSpace: true,
  userSelect: true,
  pointerEvents: true,
  wordBreak: true,
  overflowWrap: true,
  textOverflow: true,
  boxSizing: true,
  cursor: true,
  resize: true,
  transition: true,
  listStyleType: true,
  listStylePosition: true,
  listStyleImage: true,
  fill: {
    property: "fill",
    scale: "colors",
  },
  stroke: {
    property: "stroke",
    scale: "colors",
  },
  objectFit: true,
  objectPosition: true,
  backgroundAttachment: {
    property: "backgroundAttachment",
  },
  outline: true,
  float: true,
  willChange: true,
};

config.bgAttachment = config.backgroundAttachment;
config.textDecor = config.textDecoration;
config.listStylePos = config.listStylePosition;
config.listStyleImg = config.listStyleImage;

export const customProps = SS.system(config);

type borderRadius = SS.BorderRadiusProps["borderRadius"];
type borderColor = SS.BorderColorProps["borderColor"];
type CSS = React.CSSProperties;

export interface CustomProps {
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
  bgImg?: SS.BackgroundImageProps["backgroundImage"];
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

const transformAlias = (prop: string, propValue: any): object => {
  const configKeys: string[] = Object.keys(config);
  let result: Record<string, any> = {};

  if (configKeys.includes(prop)) {
    const { properties, property } = config[prop];
    if (properties) {
      properties.forEach((prop: string) => (result[prop] = propValue));
    }
    if (property) {
      result[property] = propValue;
    }
    if (config[prop] === true) {
      result[prop] = propValue;
    }
  } else {
    result[prop] = propValue;
  }
  return result;
};

export const transformAliasProps = (props: any): object => {
  let result: Record<string, any> = {};
  for (let prop in props) {
    if (typeof props[prop] === "object") {
      result = { ...result, [prop]: transformAliasProps(props[prop]) };
    } else {
      result = { ...result, ...transformAlias(prop, props[prop]) };
    }
  }
  return result;
};
