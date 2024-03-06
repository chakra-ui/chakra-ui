import { createColorMixTransform } from "./styled-system/color-mix"
import { defineConfig } from "./styled-system/config"

const isCssVar = (v: string) => /^var\(--.+\)$/.test(v)

const wrap = (str: string, v: any) => (v != null ? `${str}(${v})` : v)

const deg = (v: any) => {
  if (isCssVar(v) || v == null) return v
  const unitless = typeof v === "string" && !v.endsWith("deg")
  return typeof v === "number" || unitless ? `${v}deg` : v
}

export const defaultBaseConfig = defineConfig({
  conditions: {
    hover: "&:is(:hover, [data-hover]):not(:disabled, [data-disabled])",
    active: "&:is(:active, [data-active]):not(:disabled, [data-disabled])",
    focus: "&:is(:focus, [data-focus])",
    focusWithin: "&:is(:focus-within, [data-focus-within])",
    focusVisible: "&:is(:focus-visible, [data-focus-visible])",
    disabled:
      "&:is(:disabled, [disabled], [data-disabled], [aria-disabled=true])",
    visited: "&:visited",
    target: "&:target",
    readOnly: "&:is([data-readonly], [aria-readonly=true], [readonly])",
    readWrite: "&:read-write",
    empty: "&:is(:empty, [data-empty])",
    checked:
      '&:is(:checked, [data-checked], [aria-checked=true], [data-state=checked"])',
    enabled: "&:enabled",
    expanded:
      '&:is([aria-expanded=true], [data-expanded], [data-state=expanded"])',
    highlighted: "&[data-highlighted]",

    before: "&::before",
    after: "&::after",
    firstLetter: "&::first-letter",
    firstLine: "&::first-line",
    marker: "&::marker",
    selection: "&::selection",
    file: "&::file-selector-button",
    backdrop: "&::backdrop",

    first: "&:first-of-type",
    last: "&:last-of-type",
    notFirst: "&:not(:first-of-type)",
    notLast: "&:not(:last-of-type)",
    only: "&:only-child",
    even: "&:nth-of-type(even)",
    odd: "&:nth-of-type(odd)",

    peerFocus: ".peer:is(:focus, [data-focus]) ~ &",
    peerHover:
      ".peer:is(:hover, [data-hover]):not(:disabled, [data-disabled]) ~ &",
    peerActive:
      ".peer:is(:active, [data-active]):not(:disabled, [data-disabled]) ~ &",
    peerFocusWithin: ".peer:focus-within ~ &",
    peerFocusVisible: ".peer:is(:focus-visible, [data-focus-visible]) ~ &",
    peerDisabled: ".peer:is(:disabled, [disabled], [data-disabled]) ~ &",
    peerChecked:
      ".peer:is(:checked, [data-checked], [aria-checked=true], [data-state=checked]) ~ &",
    peerInvalid: ".peer:is(:invalid, [data-invalid], [aria-invalid=true]) ~ &",
    peerExpanded:
      ".peer:is([aria-expanded=true], [data-expanded], [data-state=expanded]) ~ &",
    peerPlaceholderShown: ".peer:placeholder-shown ~ &",

    groupFocus: ".group:is(:focus, [data-focus]) &",
    groupHover:
      ".group:is(:hover, [data-hover]):not(:disabled, [data-disabled]) &",
    groupActive:
      ".group:is(:active, [data-active]):not(:disabled, [data-disabled]) &",
    groupFocusWithin: ".group:focus-within &",
    groupFocusVisible: ".group:is(:focus-visible, [data-focus-visible]) &",
    groupDisabled: ".group:is(:disabled, [disabled], [data-disabled]) &",
    groupChecked:
      ".group:is(:checked, [data-checked], [aria-checked=true], [data-state=checked]) &",
    groupExpanded:
      ".group:is([aria-expanded=true], [data-expanded], [data-state=expanded]) &",
    groupInvalid: ".group:invalid &",

    indeterminate:
      "&:is(:indeterminate, [data-indeterminate], [aria-checked=mixed], [data-state=indeterminate])",
    required: "&:is([data-required], [aria-required=true])",
    valid: "&:is([data-valid], [data-state=valid])",
    invalid: "&:is([data-invalid], [aria-invalid=true], [data-state=invalid])",
    autofill: "&:autofill",
    inRange: "&:in-range",
    outOfRange: "&:out-of-range",
    placeholder: "&::placeholder, &[data-placeholder]",
    placeholderShown: "&:is(:placeholder-shown, [data-placeholder-shown])",
    pressed: "&:is([aria-pressed=true], [data-pressed])",
    selected: "&:is([aria-selected=true], [data-selected])",
    grabbed: "&:is([aria-grabbed=true], [data-grabbed])",

    default: "&:default",
    optional: "&:optional",
    open: "&:is([open], [data-open], [data-state=open])",
    closed: "&:is([closed], [data-closed], [data-state=closed])",
    fullscreen: "&is(:fullscreen, [data-fullscreen])",
    loading: "&:is([data-loading], [aria-busy=true])",
    hidden: "&:is([hidden], [data-hidden])",

    currentPage: "&[aria-current=page]",
    currentStep: "&[aria-current=step]",

    motionReduce: "@media (prefers-reduced-motion: reduce)",
    motionSafe: "@media (prefers-reduced-motion: no-preference)",
    print: "@media print",
    landscape: "@media (orientation: landscape)",
    portrait: "@media (orientation: portrait)",

    dark: " &.dark, .dark &",
    light: " &.light, .light &",
    mediaDark: "@media (prefers-color-scheme: dark)",
    mediaLight: "@media (prefers-color-scheme: light)",

    highContrast: "@media (forced-colors: active)",
    lessContrast: "@media (prefers-contrast: less)",
    moreContrast: "@media (prefers-contrast: more)",

    ltr: "[dir=ltr] &",
    rtl: "[dir=rtl] &",

    scrollbar: "&::-webkit-scrollbar",
    scrollbarThumb: "&::-webkit-scrollbar-thumb",
    scrollbarTrack: "&::-webkit-scrollbar-track",

    horizontal: "&[data-orientation=horizontal]",
    vertical: "&[data-orientation=vertical]",
  },
  utilities: {
    // background
    background: {
      values: "colors",
      shorthand: ["bg"],
      transform: createColorMixTransform("background"),
    },
    backgroundColor: {
      values: "colors",
      shorthand: ["bgColor"],
      transform: createColorMixTransform("backgroundColor"),
    },
    backgroundSize: { shorthand: ["bgSize"] },
    backgroundPosition: { shorthand: ["bgPos"] },
    backgroundRepeat: { shorthand: ["bgRepeat"] },
    backgroundAttachment: { shorthand: ["bgAttachment"] },
    backgroundClip: { shorthand: ["bgClip"] },
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
    borderColor: {
      values: "colors",
      transform: createColorMixTransform("borderColor"),
    },
    borderTopColor: {
      values: "colors",
      transform: createColorMixTransform("borderTopColor"),
    },
    borderBlockStartColor: {
      values: "colors",
      transform: createColorMixTransform("borderBlockStartColor"),
    },
    borderBottomColor: {
      values: "colors",
      transform: createColorMixTransform("borderBottomColor"),
    },
    borderBlockEndColor: {
      values: "colors",
      transform: createColorMixTransform("borderBlockEndColor"),
    },
    borderLeftColor: {
      values: "colors",
      transform: createColorMixTransform("borderLeftColor"),
    },
    borderInlineStartColor: {
      values: "colors",
      shorthand: ["borderStartColor"],
      transform: createColorMixTransform("borderInlineStartColor"),
    },
    borderRightColor: {
      values: "colors",
      transform: createColorMixTransform("borderRightColor"),
    },
    borderInlineEndColor: {
      values: "colors",
      shorthand: ["borderEndColor"],
      transform: createColorMixTransform("borderInlineEndColor"),
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
    borderInlineStartRadius: {
      values: "radii",
      property: "borderRadius",
      shorthand: ["roundedStart", "borderStartRadius"],
      transform: (value) => ({
        borderStartStartRadius: value,
        borderEndStartRadius: value,
      }),
    },
    borderInlineEndRadius: {
      values: "radii",
      property: "borderRadius",
      shorthand: ["roundedEnd", "borderEndRadius"],
      transform: (value) => ({
        borderStartEndRadius: value,
        borderEndEndRadius: value,
      }),
    },
    borderTopRadius: {
      values: "radii",
      property: "borderRadius",
      shorthand: ["roundedTop"],
      transform: (value) => ({
        borderTopLeftRadius: value,
        borderTopRightRadius: value,
      }),
    },
    borderBottomRadius: {
      values: "radii",
      property: "borderRadius",
      shorthand: ["roundedBottom"],
      transform: (value) => ({
        borderBottomLeftRadius: value,
        borderBottomRightRadius: value,
      }),
    },
    borderLeftRadius: {
      values: "radii",
      property: "borderRadius",
      shorthand: ["roundedLeft"],
      transform: (value) => ({
        borderTopLeftRadius: value,
        borderBottomLeftRadius: value,
      }),
    },
    borderRightRadius: {
      values: "radii",
      property: "borderRadius",
      shorthand: ["roundedRight"],
      transform: (value) => ({
        borderTopRightRadius: value,
        borderBottomRightRadius: value,
      }),
    },

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
    color: {
      values: "colors",
      transform: createColorMixTransform("color"),
    },
    fill: {
      values: "colors",
      transform: createColorMixTransform("fill"),
    },
    stroke: {
      values: "colors",
      transform: createColorMixTransform("stroke"),
    },
    accentColor: {
      values: "colors",
      transform: createColorMixTransform("accentColor"),
    },
    // effects
    boxShadow: { values: "shadows", shorthand: ["shadow"] },
    boxShadowColor: {
      values: "colors",
      transform: createColorMixTransform("--shadow-color"),
      shorthand: ["shadowColor"],
    },
    mixBlendMode: { shorthand: ["blendMode"] },
    backgroundBlendMode: { shorthand: ["bgBlendMode"] },
    opacity: { values: "opacity" },
    // filters
    filter: {
      transform(v) {
        if (v !== "auto") {
          return { filter: v }
        }
        return {
          filter: `var(--blur) var(--brightness) var(--contrast) var(--grayscale) var(--hue-rotate) var(--invert) var(--saturate) var(--sepia) var(--drop-shadow)`,
        }
      },
    },
    blur: { transform: (v) => ({ "--blur": wrap("blur", v) }) },
    brightness: {
      transform: (v) => ({ "--brightness": wrap("brightness", v) }),
    },
    contrast: {
      transform: (v) => ({ "--contrast": wrap("contrast", v) }),
    },
    grayscale: {
      transform: (v) => ({ "--grayscale": wrap("grayscale", v) }),
    },
    hueRotate: {
      transform: (v) => ({ "--hue-rotate": wrap("hue-rotate", deg(v)) }),
    },
    invert: { transform: (v) => ({ "--invert": wrap("invert", v) }) },
    saturate: {
      transform: (v) => ({ "--saturate": wrap("saturate", v) }),
    },
    sepia: { transform: (v) => ({ "--sepia": wrap("sepia", v) }) },
    dropShadow: {
      transform: (v) => ({ "--drop-shadow": wrap("drop-shadow", v) }),
    },
    // backdrop filters
    backdropFilter: {
      transform(v) {
        if (v !== "auto") {
          return { backdropFilter: v }
        }
        return {
          backdropFilter: `var(--backdrop-blur) var(--backdrop-brightness) var(--backdrop-contrast) var(--backdrop-grayscale) var(--backdrop-hue-rotate) var(--backdrop-invert) var(--backdrop-opacity) var(--backdrop-saturate) var(--backdrop-sepia)`,
        }
      },
    },
    backdropBlur: {
      values: "blurs",
      transform: (v) => ({ "--backdrop-blur": wrap("blur", v) }),
    },
    backdropBrightness: {
      transform: (v) => ({
        "--backdrop-brightness": wrap("brightness", v),
      }),
    },
    backdropContrast: {
      transform: (v) => ({ "--backdrop-contrast": wrap("contrast", v) }),
    },
    backdropGrayscale: {
      transform: (v) => ({
        "--backdrop-grayscale": wrap("grayscale", v),
      }),
    },
    backdropHueRotate: {
      transform: (v) => ({
        "--backdrop-hue-rotate": wrap("hue-rotate", deg(v)),
      }),
    },
    backdropInvert: {
      transform: (v) => ({ "--backdrop-invert": wrap("invert", v) }),
    },
    backdropOpacity: {
      transform: (v) => ({ "--backdrop-opacity": wrap("opacity", v) }),
    },
    backdropSaturate: {
      transform: (v) => ({ "--backdrop-saturate": wrap("saturate", v) }),
    },
    backdropSepia: {
      transform: (v) => ({ "--backdrop-sepia": wrap("sepia", v) }),
    },
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
    outlineColor: {
      values: "colors",
      transform: createColorMixTransform("outlineColor"),
    },
    // layout
    aspectRatio: { values: "aspectRatios" },
    width: { values: "sizes", shorthand: ["w"] },
    inlineSize: { values: "sizes" },
    height: { values: "sizes", shorthand: ["h"] },
    blockSize: { values: "sizes" },
    boxSize: { values: "sizes", transform: (v) => ({ width: v, height: v }) },
    minWidth: { values: "sizes", shorthand: ["minW"] },
    minInlineSize: { values: "sizes" },
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
    },
    insetInlineEnd: {
      values: "spacing",
      shorthand: ["insetEnd"],
    },
    // shadow / ring
    ring: {
      transform(value) {
        return {
          "--ring-offset-shadow": `var(--ring-inset) 0 0 0 var(--ring-offset-width) var(--ring-offset-color)`,
          "--ring-shadow": `var(--ring-inset) 0 0 0 calc(var(--ring-width) + var(--ring-offset-width)) var(--ring-color)`,
          "--ring-width": value,
          boxShadow:
            "var(--ring-offset-shadow), var(--ring-shadow), var(--shadow, 0 0 #0000)",
        }
      },
    },
    ringColor: {
      values: "colors",
      transform: createColorMixTransform("--ring-color"),
    },
    ringOffset: {
      transform: (value) => ({ "--ring-offset-width": value }),
    },
    ringOffsetColor: {
      values: "colors",
      transform: createColorMixTransform("--ring-offset-color"),
    },
    ringInset: {
      transform: (v) => ({ "--ring-inset": v }),
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
    textDecorationColor: {
      values: "colors",
      transform: createColorMixTransform("textDecorationColor"),
    },
    textShadow: { values: "shadows" },
    // transform
    transform: {
      transform: (value) => {
        let v = value
        if (value === "auto") {
          v = `translateX(var(--translate-x, 0)) translateY(var(--translate-y, 0)) rotate(var(--rotate, 0)) scaleX(var(--scale-x, 1)) scaleY(var(--scale-y, 1)) skewX(var(--skew-x, 0)) skewY(var(--skew-y, 0))`
        }
        if (value === "auto-gpu") {
          v = `translate3d(var(--translate-x, 0), var(--translate-y, 0), 0) rotate(var(--rotate, 0)) scaleX(var(--scale-x, 1)) scaleY(var(--scale-y, 1)) skewX(var(--skew-x, 0)) skewY(var(--skew-y, 0))`
        }
        return { transform: v }
      },
    },
    skewX: { transform: (v) => ({ "--skew-x": deg(v) }) },
    skewY: { transform: (v) => ({ "--skew-y": deg(v) }) },
    scaleX: { transform: (v) => ({ "--scale-x": v }) },
    scaleY: { transform: (v) => ({ "--scale-y": v }) },
    scale: {
      transform(value) {
        if (value !== "auto") return { scale: value }
        return {
          scale: `var(--scale-x, 1) var(--scale-y, 1)`,
        }
      },
    },
    rotate: {
      transform(value) {
        if (value !== "auto") return { rotate: deg(value) }
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
          transform: `var(--translate-x) var(--translate-y)`,
        }
      },
    },
    translateX: {
      values: "spacing",
      transform: (v) => ({ "--translate-x": v }),
    },
    translateY: {
      values: "spacing",
      transform: (v) => ({ "--translate-y": v }),
    },
    // transition
    transitionDuration: { values: "durations" },
    transitionProperty: {
      values: {
        common:
          "background-color, border-color, color, fill, stroke, opacity, box-shadow, transform",
        colors: "background-color, border-color, color, fill, stroke",
        dimensions: "width, height",
        position: "left, right, top, bottom",
        background: "background-color, background-image, background-position",
      },
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
          WebkitLineClamp: "var(--line-clamp)",
          "--line-clamp": value,
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
    caretColor: {
      values: "colors",
      transform: createColorMixTransform("caretColor"),
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
