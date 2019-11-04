import * as StyledSystem from "styled-system";

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

export const customProps = StyledSystem.system(config);

type borderRadius = StyledSystem.BorderRadiusProps["borderRadius"];
type borderColor = StyledSystem.BorderColorProps["borderColor"];
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
  bgImage?: StyledSystem.BackgroundImageProps["backgroundImage"];
  bgSize?: StyledSystem.BackgroundSizeProps["backgroundSize"];
  bgPos?: StyledSystem.BackgroundPositionProps["backgroundPosition"];
  pos?: StyledSystem.PositionProps["position"];
  flexDir?: StyledSystem.FlexDirectionProps["flexDirection"];

  // CSS properties
  textDecoration?: StyledSystem.ResponsiveValue<CSS["textDecoration"]>;
  textDecor?: StyledSystem.ResponsiveValue<CSS["textDecoration"]>;
  textTransform?: StyledSystem.ResponsiveValue<CSS["textTransform"]>;
  overflowX?: StyledSystem.OverflowProps["overflow"];
  overflowY?: StyledSystem.OverflowProps["overflow"];
  appearance?: StyledSystem.ResponsiveValue<CSS["appearance"]>;
  transform?: StyledSystem.ResponsiveValue<CSS["transform"]>;
  transformOrigin?: StyledSystem.ResponsiveValue<CSS["transformOrigin"]>;
  animation?: StyledSystem.ResponsiveValue<CSS["animation"]>;
  userSelect?: string | StyledSystem.ResponsiveValue<CSS["userSelect"]>;
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
  textOverflow?: StyledSystem.ResponsiveValue<CSS["textOverflow"]>;
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
  willChange?: StyledSystem.ResponsiveValue<CSS["willChange"]>;

  // Border Width props
  borderTopWidth?: StyledSystem.ResponsiveValue<CSS["borderTopWidth"]>;
  borderBottomWidth?: StyledSystem.ResponsiveValue<CSS["borderBottomWidth"]>;
  borderLeftWidth?: StyledSystem.ResponsiveValue<CSS["borderLeftWidth"]>;
  borderRightWidth?: StyledSystem.ResponsiveValue<CSS["borderRightWidth"]>;
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
