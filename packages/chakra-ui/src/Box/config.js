import { system } from "styled-system";

export const config = {
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
  borderBottomColor: {
    property: "borderBottomColor",
    scale: "colors",
  },
  borderTopColor: {
    property: "borderTopColor",
    scale: "colors",
  },
  borderLeftColor: {
    property: "borderLeftColor",
    scale: "colors",
  },
  borderRightColor: {
    property: "borderRightColor",
    scale: "colors",
  },
  rounded: {
    property: "borderRadius",
    scale: "radii",
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
  textDecoration: true,
  textTransform: true,
  overflowX: true,
  overflowY: true,
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
  backgroundAttachment: true,
  WebkitAppearance: true,
};

config.bgAttachment = config.backgroundAttachment;

const extraConfig = system(config);

export default extraConfig;

// Create an issue on @styled-system/css to allow custom alias to be passed to the `css` function
// In the meantime, let's transform the custom alias
const transformAlias = (prop, propValue) => {
  const configKeys = Object.keys(config);
  let result = {};

  if (configKeys.includes(prop)) {
    const { properties, property } = config[prop];
    if (properties) {
      properties.forEach(_cssProp => (result[_cssProp] = propValue));
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

export const tx = props => {
  let result = {};
  for (let prop in props) {
    result = { ...result, ...transformAlias(prop, props[prop]) };
  }
  return result;
};
