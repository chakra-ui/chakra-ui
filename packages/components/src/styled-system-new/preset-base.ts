import { defineSystem } from "./theming"

const isCssVar = (v: string) => /^var\(--.+\)$/.test(v)

const toDeg = (v: any) => {
  if (isCssVar(v) || v == null) return v
  const unitless = typeof v === "string" && !v.endsWith("deg")
  return typeof v === "number" || unitless ? `${v}deg` : v
}

export const presetBase = defineSystem({
  utilities: {
    // background
    background: { values: "colors", shorthand: ["bg"] },
    backgroundColor: { values: "colors", shorthand: ["bgColor"] },
    backgroundSize: { shorthand: ["bgSize"] },
    backgroundPosition: { shorthand: ["bgPos"] },
    backgroundRepeat: { shorthand: ["bgRepeat"] },
    backgroundAttachment: { shorthand: ["bgAttachment"] },
    backgroundGradient: {
      shorthand: ["bgGradient"],
      values(theme) {
        return {
          ...theme("gradients"),
          "to-t": "linear-gradient(to top, var(--gradient))",
          "to-tr": "linear-gradient(to top right, var(--gradient))",
          "to-r": "linear-gradient(to right, var(--gradient))",
          "to-br": "linear-gradient(to bottom right, var(--gradient))",
          "to-b": "linear-gradient(to bottom, var(--gradient))",
          "to-bl": "linear-gradient(to bottom left, var(--gradient))",
          "to-l": "linear-gradient(to left, var(--gradient))",
          "to-tl": "linear-gradient(to top left, var(--gradient))",
        }
      },
      transform(value) {
        return {
          "--gradient-stops": "var(--gradient-from), var(--gradient-to)",
          "--gradient": "var(--gradient-via-stops, var(--gradient-stops))",
          backgroundImage: value,
        }
      },
    },
    gradientFrom: {
      values: "colors",
      transform: (value) => ({ "--gradient-from": value }),
    },
    gradientTo: {
      values: "colors",
      transform: (value) => ({ "--gradient-to": value }),
    },
    gradientVia: {
      values: "colors",
      transform(value) {
        return {
          "--gradient-via": value,
          "--gradient-via-stops":
            "var(--gradient-from), var(--gradient-via), var(--gradient-to)",
        }
      },
    },
    backgroundImage: { values: "gradients", shorthand: ["bgImg", "bgImage"] },
    // border
    border: { values: "borders" },
    borderTop: { values: "borders" },
    borderLeft: { values: "borders" },
    borderBlockStart: { values: "borders" },
    borderRight: { values: "borders" },
    borderInlineEnd: { values: "borders" },
    borderBottom: { values: "borders" },
    borderBlockEnd: { values: "borders" },
    borderInlineStart: { values: "borders", shorthand: ["borderStart"] },
    borderInline: { values: "borders", shorthand: ["borderX"] },
    borderBlock: { values: "borders", shorthand: ["borderY"] },
    // border colors
    borderColor: { values: "colors" },
    borderTopColor: { values: "colors" },
    borderBlockStartColor: { values: "colors" },
    borderBottomColor: { values: "colors" },
    borderBlockEndColor: { values: "colors" },
    borderLeftColor: { values: "colors" },
    borderInlineStartColor: {
      values: "colors",
      shorthand: ["borderStartColor"],
    },
    borderRightColor: { values: "colors" },
    borderInlineEndColor: {
      values: "colors",
      shorthand: ["borderEndColor"],
    },
    // border styles
    borderStyle: { values: "borderStyles" },
    borderTopStyle: { values: "borderStyles" },
    borderBlockStartStyle: { values: "borderStyles" },
    borderBottomStyle: { values: "borderStyles" },
    borderBlockEndStyle: {
      values: "borderStyles",
    },
    borderInlineStartStyle: {
      values: "borderStyles",
      shorthand: ["borderStartStyle"],
    },
    borderInlineEndStyle: {
      values: "borderStyles",
      shorthand: ["borderEndStyle"],
    },
    borderLeftStyle: { values: "borderStyles" },
    borderRightStyle: { values: "borderStyles" },
    // border radius
    borderRadius: { values: "radii", shorthand: ["rounded"] },
    borderTopLeftRadius: { values: "radii", shorthand: ["roundedTopLeft"] },
    borderStartStartRadius: {
      values: "radii",
      shorthand: ["roundedStartStart"],
    },
    borderEndStartRadius: { values: "radii", shorthand: ["roundedEndStart"] },
    borderTopRightRadius: { values: "radii", shorthand: ["roundedTopRight"] },
    borderStartEndRadius: { values: "radii", shorthand: ["roundedStartEnd"] },
    borderEndEndRadius: { values: "radii", shorthand: ["roundedEndEnd"] },
    borderBottomLeftRadius: {
      values: "radii",
      shorthand: ["roundedBottomLeft"],
    },
    borderBottomRightRadius: {
      values: "radii",
      shorthand: ["roundedBottomRight"],
    },
    borderInlineStartRadius: { values: "radii", shorthand: ["roundedStart"] },
    borderInlineEndRadius: { values: "radii", shorthand: ["roundedEnd"] },
    borderTopRadius: { values: "radii", shorthand: ["roundedTop"] },
    borderBottomRadius: { values: "radii", shorthand: ["roundedBottom"] },
    borderLeftRadius: { values: "radii", shorthand: ["roundedLeft"] },
    borderRightRadius: { values: "radii", shorthand: ["roundedRight"] },

    borderWidth: { values: "borderWidths" },
    borderBlockStartWidth: { values: "borderWidths" },
    borderTopWidth: { values: "borderWidths" },
    borderBottomWidth: { values: "borderWidths" },
    borderBlockEndWidth: { values: "borderWidths" },
    borderRightWidth: { values: "borderWidths" },
    borderInlineStartWidth: {
      values: "borderWidths",
      shorthand: ["borderStartWidth"],
    },
    borderInlineEndWidth: {
      values: "borderWidths",
      shorthand: ["borderEndWidth"],
    },
    borderLeftWidth: { values: "borderWidths" },
    // colors
    color: { values: "colors" },
    fill: { values: "colors" },
    stroke: { values: "colors" },
    accentColor: { values: "colors" },
    // effects
    boxShadow: { values: "shadows", shorthand: ["shadow"] },
    mixBlendMode: { shorthand: ["blendMode"] },
    backgroundBlendMode: { shorthand: ["bgBlendMode"] },
    opacity: { values: "opacity" },
    // filters
    filter: {
      transform(v) {
        if (v !== "auto") return v
        return `var(--chakra-blur) var(--chakra-brightness) var(--chakra-contrast) var(--chakra-grayscale) var(--chakra-hue-rotate) var(--chakra-invert) var(--chakra-saturate) var(--chakra-sepia) var(--chakra-drop-shadow)`
      },
    },
    blur: { transform: (v) => ({ "--chakra-blur": v }) },
    brightness: { transform: (v) => ({ "--chakra-brightness": v }) },
    contrast: { transform: (v) => ({ "--chakra-contrast": v }) },
    grayscale: { transform: (v) => ({ "--chakra-grayscale": v }) },
    hueRotate: { transform: (v) => ({ "--chakra-hue-rotate": v }) },
    invert: { transform: (v) => ({ "--chakra-invert": v }) },
    saturate: { transform: (v) => ({ "--chakra-saturate": v }) },
    sepia: { transform: (v) => ({ "--chakra-sepia": v }) },
    dropShadow: { transform: (v) => ({ "--chakra-drop-shadow": v }) },
    // backdrop filters
    backdropFilter: {
      transform(v) {
        if (v !== "auto") return v
        return `var(--chakra-backdrop-blur) var(--chakra-backdrop-brightness) var(--chakra-backdrop-contrast) var(--chakra-backdrop-grayscale) var(--chakra-backdrop-hue-rotate) var(--chakra-backdrop-invert) var(--chakra-backdrop-opacity) var(--chakra-backdrop-saturate) var(--chakra-backdrop-sepia)`
      },
    },
    backdropBlur: { transform: (v) => ({ "--chakra-backdrop-blur": v }) },
    backdropBrightness: {
      transform: (v) => ({ "--chakra-backdrop-brightness": v }),
    },
    backdropContrast: {
      transform: (v) => ({ "--chakra-backdrop-contrast": v }),
    },
    backdropGrayscale: {
      transform: (v) => ({ "--chakra-backdrop-grayscale": v }),
    },
    backdropHueRotate: {
      transform: (v) => ({ "--chakra-backdrop-hue-rotate": v }),
    },
    backdropInvert: { transform: (v) => ({ "--chakra-backdrop-invert": v }) },
    backdropOpacity: { transform: (v) => ({ "--chakra-backdrop-opacity": v }) },
    backdropSaturate: {
      transform: (v) => ({ "--chakra-backdrop-saturate": v }),
    },
    backdropSepia: { transform: (v) => ({ "--chakra-backdrop-sepia": v }) },
    // flexbox
    flexBasis: { values: "sizes" },
    gap: { values: "spacing" },
    rowGap: { values: "spacing" },
    columnGap: { values: "spacing" },
    flexDirection: { shorthand: ["flexDir"] },
    // grid
    gridGap: { values: "spacing" },
    gridColumnGap: { values: "spacing" },
    gridRowGap: { values: "spacing" },
    // interactivity
    outlineColor: { values: "colors" },
    // layout
    aspectRatio: { values: "aspectRatios" },
    width: { values: "sizes", shorthand: ["w"] },
    inlineSize: { values: "sizes" },
    height: { values: "sizes", shorthand: ["h"] },
    blockSize: { values: "sizes" },
    boxSize: { values: "sizes", transform: (v) => ({ width: v, height: v }) },
    minWidth: { values: "sizes", shorthand: ["minW"] },
    minInlineSize: { values: "sizes", shorthand: ["minInlineSize"] },
    minHeight: { values: "sizes", shorthand: ["minH"] },
    minBlockSize: { values: "sizes" },
    maxWidth: { values: "sizes", shorthand: ["maxW"] },
    maxInlineSize: { values: "sizes" },
    maxHeight: { values: "sizes", shorthand: ["maxH"] },
    maxBlockSize: { values: "sizes" },
    hideFrom: {
      values: "breakpoints",
      //@ts-ignore
      transform: (v) => ({ [`@screen min:${v}`]: { display: "none" } }),
    },
    hideBelow: {
      values: "breakpoints",
      //@ts-ignore
      transform: (v) => ({ [`@screen max:${v}`]: { display: "none" } }),
    },
    // scroll
    overscrollBehavior: { shorthand: ["overscroll"] },
    overscrollBehaviorX: { shorthand: ["overscrollX"] },
    overscrollBehaviorY: { shorthand: ["overscrollY"] },
    // scroll margin
    scrollMargin: { values: "spacing" },
    scrollMarginTop: { values: "spacing" },
    scrollMarginBottom: { values: "spacing" },
    scrollMarginLeft: { values: "spacing" },
    scrollMarginRight: { values: "spacing" },
    scrollMarginX: {
      values: "spacing",
      transform: (v) => ({ scrollMarginLeft: v, scrollMarginRight: v }),
    },
    scrollMarginY: {
      values: "spacing",
      transform: (v) => ({ scrollMarginTop: v, scrollMarginBottom: v }),
    },
    // scroll padding
    scrollPadding: { values: "spacing" },
    scrollPaddingTop: { values: "spacing" },
    scrollPaddingBottom: { values: "spacing" },
    scrollPaddingLeft: { values: "spacing" },
    scrollPaddingRight: { values: "spacing" },
    scrollPaddingX: { values: "spacing" },
    scrollPaddingY: { values: "spacing" },
    // list
    listStylePosition: { shorthand: ["listStylePos"] },
    listStyleImage: { shorthand: ["listStyleImg"] },
    // position
    position: { shorthand: ["pos"] },
    zIndex: { values: "zIndex" },
    inset: { values: "spacing" },
    insetInline: { values: "spacing", shorthand: ["insetX"] },
    insetBlock: { values: "spacing", shorthand: ["insetY"] },
    top: { values: "spacing" },
    insetBlockStart: { values: "spacing" },
    bottom: { values: "spacing" },
    insetBlockEnd: { values: "spacing" },
    left: { values: "spacing" },
    right: { values: "spacing" },
    insetInlineStart: {
      values: "spacing",
      shorthand: ["insetStart"],
      transform: (value) => ({ left: value, "&:dir(rtl)": { right: value } }),
    },
    insetInlineEnd: {
      values: "spacing",
      shorthand: ["insetEnd"],
      transform: (value) => ({ right: value, "&:dir(rtl)": { left: value } }),
    },
    // shadow / ring
    ring: {
      transform(value) {
        return {
          "--chakra-ring-offset-shadow": `var(--chakra-ring-inset) 0 0 0 var(--chakra-ring-offset-width) var(--chakra-ring-offset-color)`,
          "--chakra-ring-shadow": `var(--chakra-ring-inset) 0 0 0 calc(var(--chakra-ring-width) + var(--chakra-ring-offset-width)) var(--chakra-ring-color)`,
          "--chakra-ring-width": value,
          boxShadow: `var(--chakra-ring-offset-shadow), var(--chakra-ring-shadow), var(--chakra-shadow, 0 0 #0000)`,
        }
      },
    },
    ringColor: {
      values: "colors",
      transform: (value) => ({ "--chakra-ring-color": value }),
    },
    ringOffset: {
      transform: (value) => ({ "--chakra-ring-offset-width": value }),
    },
    ringOffsetColor: {
      values: "colors",
      transform: (v) => ({ "--chakra-ring-offset-color": v }),
    },
    ringInset: {
      transform: (v) => ({ "--chakra-ring-inset": v }),
    },
    // margin
    margin: { values: "spacing", shorthand: ["m"] },
    marginTop: { values: "spacing", shorthand: ["mt"] },
    marginBlockStart: { values: "spacing", shorthand: ["mt"] },
    marginRight: { values: "spacing", shorthand: ["mr"] },
    marginBottom: { values: "spacing", shorthand: ["mb"] },
    marginBlockEnd: { values: "spacing" },
    marginLeft: { values: "spacing", shorthand: ["ml"] },
    marginInlineStart: { values: "spacing", shorthand: ["ms", "marginStart"] },
    marginInlineEnd: { values: "spacing", shorthand: ["ms", "marginEnd"] },
    marginInline: { values: "spacing", shorthand: ["mx", "marginX"] },
    marginBlock: { values: "spacing", shorthand: ["my", "marginY"] },
    // padding
    padding: { values: "spacing", shorthand: ["p"] },
    paddingTop: { values: "spacing", shorthand: ["pt"] },
    paddingRight: { values: "spacing", shorthand: ["pr"] },
    paddingBottom: { values: "spacing", shorthand: ["pb"] },
    paddingBlockStart: { values: "spacing" },
    paddingBlockEnd: { values: "spacing" },
    paddingLeft: { values: "spacing", shorthand: ["pl"] },
    paddingInlineStart: {
      values: "spacing",
      shorthand: ["ps", "paddingStart"],
    },
    paddingInlineEnd: { values: "spacing", shorthand: ["pe", "paddingEnd"] },
    paddingInline: { values: "spacing", shorthand: ["px", "paddingX"] },
    paddingBlock: { values: "spacing", shorthand: ["py", "paddingY"] },
    // text decoration
    textDecoration: { shorthand: ["textDecor"] },
    textDecorationColor: { values: "colors" },
    textShadow: { values: "shadows" },
    // transform
    transform: {
      transform: (value) => {
        let v = value
        if (value === "auto") {
          v = `translateX(var(--chakra-translate-x, 0)) translateY(var(--chakra-translate-y, 0)) rotate(var(--chakra-rotate, 0)) scaleX(var(--chakra-scale-x, 1)) scaleY(var(--chakra-scale-y, 1)) skewX(var(--chakra-skew-x, 0)) skewY(var(--chakra-skew-y, 0))`
        }
        if (value === "auto-gpu") {
          v = `translate3d(var(--chakra-translate-x, 0), var(--chakra-translate-y, 0), 0) rotate(var(--chakra-rotate, 0)) scaleX(var(--chakra-scale-x, 1)) scaleY(var(--chakra-scale-y, 1)) skewX(var(--chakra-skew-x, 0)) skewY(var(--chakra-skew-y, 0))`
        }
        return { transform: v }
      },
    },
    skewX: { transform: (v) => ({ "--chakra-skew-x": toDeg(v) }) },
    skewY: { transform: (v) => ({ "--chakra-skew-y": toDeg(v) }) },
    scaleX: { transform: (v) => ({ "--chakra-scale-x": v }) },
    scaleY: { transform: (v) => ({ "--chakra-scale-y": v }) },
    scale: {
      transform(value) {
        if (value !== "auto") return { scale: value }
        return {
          scale: `var(--chakra-scale-x, 1) var(--chakra-scale-y, 1)`,
        }
      },
    },
    rotate: {
      transform(value) {
        if (value !== "auto") return { rotate: toDeg(value) }
        return {
          rotate: `var(--rotate-x, 0) var(--rotate-y, 0) var(--rotate-z, 0)`,
        }
      },
    },
    // transform / translate
    translate: {
      transform(value) {
        if (value !== "auto") return { transform: value }
        return {
          transform: `var(--chakra-translate-x) var(--chakra-translate-y)`,
        }
      },
    },
    translateX: {
      values: "spacing",
      transform: (v) => ({ "--chakra-translate-x": v }),
    },
    translateY: {
      values: "spacing",
      transform: (v) => ({ "--chakra-translate-y": v }),
    },
    // transition
    transitionDuration: { values: "durations" },
    transitionProperty: {
      values: "properties",
      shorthand: ["transition"],
    },
    transitionTimingFunction: {
      values: "easings",
      shorthand: ["transitionTiming"],
    },
    // animation
    animation: { values: "animations" },
    animationDuration: { values: "durations" },
    animationDelay: { values: "durations" },
    // typography
    fontFamily: { values: "fonts" },
    fontSize: { values: "fontSizes" },
    fontWeight: { values: "fontWeights" },
    lineHeight: { values: "lineHeights" },
    letterSpacing: { values: "letterSpacings" },
    truncated: {
      values: { type: "boolean" },
      transform(value) {
        if (value === true) {
          return {
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }
        }
        return {}
      },
    },
    noOfLines: {
      transform(value) {
        return {
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: "var(--chakra-line-clamp)",
          "--chakra-line-clamp": value,
          overflow: "hidden",
          textOverflow: "ellipsis",
        }
      },
    },
    // helpers
    srOnly: {
      values: { type: "boolean" },
      transform(value) {
        return srMapping[value] || {}
      },
    },
    debug: {
      values: { type: "boolean" },
      transform(value) {
        if (!value) return {}
        return {
          outline: "1px solid blue !important",
          "& > *": {
            outline: "1px solid red !important",
          },
        }
      },
    },
  },
})

const srMapping: Record<string, any> = {
  true: {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: "0",
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    borderWidth: "0",
  },
  false: {
    position: "static",
    width: "auto",
    height: "auto",
    padding: "0",
    margin: "0",
    overflow: "visible",
    clip: "auto",
    whiteSpace: "normal",
  },
}
