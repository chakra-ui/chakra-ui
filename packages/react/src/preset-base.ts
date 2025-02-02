import { createColorMixTransform } from "./styled-system/color-mix"
import { defineConditions, defineConfig } from "./styled-system/config"
import { cssVar } from "./styled-system/css-var"

const isCssVar = (v: string) => /^var\(--.+\)$/.test(v)

const wrap = (str: string, v: any) => (v != null ? `${str}(${v})` : v)

const deg = (v: any) => {
  if (isCssVar(v) || v == null) return v
  const unitless = typeof v === "string" && !v.endsWith("deg")
  return typeof v === "number" || unitless ? `${v}deg` : v
}

const createFocusRing = (selector: string) => {
  return {
    values: ["outside", "inside", "mixed", "none"],
    transform(value: any, { token }: any) {
      const focusRingColor = token("colors.colorPalette.focusRing")
      const styles: Record<string, any> = {
        inside: {
          "--focus-ring-color": focusRingColor,
          [selector]: {
            outlineOffset: "0px",
            outlineWidth: "var(--focus-ring-width, 1px)",
            outlineColor: "var(--focus-ring-color)",
            outlineStyle: "var(--focus-ring-style, solid)",
            borderColor: "var(--focus-ring-color)",
          },
        },
        outside: {
          "--focus-ring-color": focusRingColor,
          [selector]: {
            outlineWidth: "var(--focus-ring-width, 2px)",
            outlineOffset: "var(--focus-ring-offset, 2px)",
            outlineStyle: "var(--focus-ring-style, solid)",
            outlineColor: "var(--focus-ring-color)",
          },
        },
        mixed: {
          "--focus-ring-color": focusRingColor,
          [selector]: {
            outlineWidth: "var(--focus-ring-width, 3px)",
            outlineStyle: "var(--focus-ring-style, solid)",
            outlineColor:
              "color-mix(in srgb, var(--focus-ring-color), transparent 60%)",
            borderColor: "var(--focus-ring-color)",
          },
        },
        none: {
          "--focus-ring-color": focusRingColor,
          [selector]: {
            outline: "none",
          },
        },
      }

      return styles[value] ?? {}
    },
  }
}

const divideColor = createColorMixTransform("borderColor")

const createTransition = (value: string) => {
  return {
    transition: value,
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    transitionDuration: "150ms",
  }
}

export const defaultConditions = defineConditions({
  hover: [
    "@media (hover: hover)",
    "&:is(:hover, [data-hover]):not(:disabled, [data-disabled])",
  ],
  active:
    "&:is(:active, [data-active]):not(:disabled, [data-disabled], [data-state=open])",
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
    "&:is(:checked, [data-checked], [aria-checked=true], [data-state=checked])",
  enabled: "&:enabled",
  expanded:
    "&:is([aria-expanded=true], [data-expanded], [data-state=expanded])",
  highlighted: "&[data-highlighted]",
  complete: "&[data-complete]",
  incomplete: "&[data-incomplete]",
  dragging: "&[data-dragging]",

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
  inRange: "&:is(:in-range, [data-in-range])",
  outOfRange: "&:is(:out-of-range, [data-outside-range])",
  placeholder: "&::placeholder, &[data-placeholder]",
  placeholderShown: "&:is(:placeholder-shown, [data-placeholder-shown])",
  pressed: "&:is([aria-pressed=true], [data-pressed])",
  selected: "&:is([aria-selected=true], [data-selected])",
  grabbed: "&:is([aria-grabbed=true], [data-grabbed])",
  underValue: "&[data-state=under-value]",
  overValue: "&[data-state=over-value]",
  atValue: "&[data-state=at-value]",

  default: "&:default",
  optional: "&:optional",
  open: "&:is([open], [data-open], [data-state=open])",
  closed: "&:is([closed], [data-closed], [data-state=closed])",
  fullscreen: "&is(:fullscreen, [data-fullscreen])",
  loading: "&:is([data-loading], [aria-busy=true])",
  hidden: "&:is([hidden], [data-hidden])",

  current: "&[data-current]",
  currentPage: "&[aria-current=page]",
  currentStep: "&[aria-current=step]",
  today: "&[data-today]",
  unavailable: "&[data-unavailable]",
  rangeStart: "&[data-range-start]",
  rangeEnd: "&[data-range-end]",
  now: "&[data-now]",
  topmost: "&[data-topmost]",

  motionReduce: "@media (prefers-reduced-motion: reduce)",
  motionSafe: "@media (prefers-reduced-motion: no-preference)",
  print: "@media print",
  landscape: "@media (orientation: landscape)",
  portrait: "@media (orientation: portrait)",

  dark: ".dark &, .dark .chakra-theme:not(.light) &",
  light: ":root &, .light &",
  osDark: "@media (prefers-color-scheme: dark)",
  osLight: "@media (prefers-color-scheme: light)",

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

  icon: "& :where(svg)",
  starting: "@starting-style",
})

const currentBgVar = cssVar("bg-currentcolor")

const isCurrentBgVar = (value: string) =>
  value === currentBgVar.ref || value === "currentBg"

const colorValues = (theme: any) => ({
  ...theme("colors"),
  currentBg: currentBgVar,
})

export const defaultBaseConfig = defineConfig({
  conditions: defaultConditions,
  utilities: {
    // background
    background: {
      values: colorValues,
      shorthand: ["bg"],
      transform(value, args) {
        if (isCurrentBgVar(args.raw)) return { background: currentBgVar.ref }
        const styleObj = createColorMixTransform("background")(value, args)
        return { ...styleObj, [currentBgVar.var]: styleObj?.background }
      },
    },
    backgroundColor: {
      values: colorValues,
      shorthand: ["bgColor"],
      transform(value, args) {
        if (isCurrentBgVar(args.raw))
          return { backgroundColor: currentBgVar.ref }
        const styleObj = createColorMixTransform("backgroundColor")(value, args)
        return {
          ...styleObj,
          [currentBgVar.var]: styleObj?.backgroundColor,
        }
      },
    },
    backgroundSize: { shorthand: ["bgSize"] },
    backgroundPosition: { shorthand: ["bgPos"] },
    backgroundRepeat: { shorthand: ["bgRepeat"] },
    backgroundAttachment: { shorthand: ["bgAttachment"] },
    backgroundClip: {
      shorthand: ["bgClip"],
      values: ["text"],
      transform(value) {
        return value === "text"
          ? { color: "transparent", backgroundClip: "text" }
          : { backgroundClip: value }
      },
    },
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
      values: colorValues,
      transform: createColorMixTransform("--gradient-from"),
    },
    gradientTo: {
      values: colorValues,
      transform: createColorMixTransform("--gradient-to"),
    },
    gradientVia: {
      values: colorValues,
      transform(value, args) {
        const styles = createColorMixTransform("--gradient-via")(value, args)
        return {
          ...styles,
          "--gradient-via-stops":
            "var(--gradient-from), var(--gradient-via), var(--gradient-to)",
        }
      },
    },
    backgroundImage: {
      values(theme) {
        return { ...theme("gradients"), ...theme("assets") }
      },
      shorthand: ["bgImg", "bgImage"],
    },
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
      values: colorValues,
      transform: createColorMixTransform("borderColor"),
    },
    borderTopColor: {
      values: colorValues,
      transform: createColorMixTransform("borderTopColor"),
    },
    borderBlockStartColor: {
      values: colorValues,
      transform: createColorMixTransform("borderBlockStartColor"),
    },
    borderBottomColor: {
      values: colorValues,
      transform: createColorMixTransform("borderBottomColor"),
    },
    borderBlockEndColor: {
      values: colorValues,
      transform: createColorMixTransform("borderBlockEndColor"),
    },
    borderLeftColor: {
      values: colorValues,
      transform: createColorMixTransform("borderLeftColor"),
    },
    borderInlineStartColor: {
      values: colorValues,
      shorthand: ["borderStartColor"],
      transform: createColorMixTransform("borderInlineStartColor"),
    },
    borderRightColor: {
      values: colorValues,
      transform: createColorMixTransform("borderRightColor"),
    },
    borderInlineEndColor: {
      values: colorValues,
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
      shorthand: ["roundedStartStart", "borderTopStartRadius"],
    },
    borderEndStartRadius: {
      values: "radii",
      shorthand: ["roundedEndStart", "borderBottomStartRadius"],
    },
    borderTopRightRadius: {
      values: "radii",
      shorthand: ["roundedTopRight"],
    },
    borderStartEndRadius: {
      values: "radii",
      shorthand: ["roundedStartEnd", "borderTopEndRadius"],
    },
    borderEndEndRadius: {
      values: "radii",
      shorthand: ["roundedEndEnd", "borderBottomEndRadius"],
    },
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
    borderInlineWidth: {
      values: "borderWidths",
      shorthand: ["borderXWidth"],
    },
    borderInlineStartWidth: {
      values: "borderWidths",
      shorthand: ["borderStartWidth"],
    },
    borderInlineEndWidth: {
      values: "borderWidths",
      shorthand: ["borderEndWidth"],
    },
    borderLeftWidth: { values: "borderWidths" },
    borderBlockWidth: {
      values: "borderWidths",
      shorthand: ["borderYWidth"],
    },
    // colors
    color: {
      values: colorValues,
      transform: createColorMixTransform("color"),
    },
    fill: {
      values: colorValues,
      transform: createColorMixTransform("fill"),
    },
    stroke: {
      values: colorValues,
      transform: createColorMixTransform("stroke"),
    },
    accentColor: {
      values: colorValues,
      transform: createColorMixTransform("accentColor"),
    },
    // divide
    divideX: {
      values: { type: "string" },
      transform(value) {
        return {
          "& > :not(style, [hidden]) ~ :not(style, [hidden])": {
            borderInlineStartWidth: value,
            borderInlineEndWidth: "0px",
          },
        }
      },
    },
    divideY: {
      values: { type: "string" },
      transform(value) {
        return {
          "& > :not(style, [hidden]) ~ :not(style, [hidden])": {
            borderTopWidth: value,
            borderBottomWidth: "0px",
          },
        }
      },
    },
    divideColor: {
      values: colorValues,
      transform(value, args) {
        return {
          "& > :not(style, [hidden]) ~ :not(style, [hidden])": divideColor(
            value,
            args,
          ),
        }
      },
    },
    divideStyle: {
      property: "borderStyle",
      transform(value) {
        return {
          "& > :not(style, [hidden]) ~ :not(style, [hidden])": {
            borderStyle: value,
          },
        }
      },
    },
    // effects
    boxShadow: { values: "shadows", shorthand: ["shadow"] },
    boxShadowColor: {
      values: colorValues,
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
    blur: {
      values: "blurs",
      transform: (v) => ({ "--blur": wrap("blur", v) }),
    },
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
    rowGap: { values: "spacing", shorthand: ["gapY"] },
    columnGap: { values: "spacing", shorthand: ["gapX"] },
    flexDirection: { shorthand: ["flexDir"] },
    // grid
    gridGap: { values: "spacing" },
    gridColumnGap: { values: "spacing" },
    gridRowGap: { values: "spacing" },
    // interactivity
    outlineColor: {
      values: colorValues,
      transform: createColorMixTransform("outlineColor"),
    },
    focusRing: createFocusRing("&:is(:focus, [data-focus])"),
    focusVisibleRing: createFocusRing(
      "&:is(:focus-visible, [data-focus-visible])",
    ),
    focusRingColor: {
      values: colorValues,
      transform: createColorMixTransform("--focus-ring-color"),
    },
    focusRingOffset: {
      values: "spacing",
      transform: (v) => ({ "--focus-ring-offset": v }),
    },
    focusRingWidth: {
      values: "borderWidths",
      property: "outlineWidth",
      transform: (v) => ({ "--focus-ring-width": v }),
    },
    focusRingStyle: {
      values: "borderStyles",
      property: "outlineStyle",
      transform: (v) => ({ "--focus-ring-style": v }),
    },
    // layout
    aspectRatio: { values: "aspectRatios" },
    width: { values: "sizes", shorthand: ["w"] },
    inlineSize: { values: "sizes" },
    height: { values: "sizes", shorthand: ["h"] },
    blockSize: { values: "sizes" },
    boxSize: {
      values: "sizes",
      property: "width",
      transform: (v) => ({ width: v, height: v }),
    },
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
      transform: (value, { raw, token }) => {
        const bp = token.raw(`breakpoints.${raw}`)
        const media = bp
          ? `@breakpoint ${raw}`
          : `@media screen and (min-width: ${value})`
        return {
          [media]: { display: "none" },
        }
      },
    },
    hideBelow: {
      values: "breakpoints",
      //@ts-ignore
      transform(value, { raw, token }) {
        const bp = token.raw(`breakpoints.${raw}`)
        const media = bp
          ? `@breakpoint ${raw}Down`
          : `@media screen and (max-width: ${value})`
        return {
          [media]: {
            display: "none",
          },
        }
      },
    },
    // scroll
    overscrollBehavior: { shorthand: ["overscroll"] },
    overscrollBehaviorX: { shorthand: ["overscrollX"] },
    overscrollBehaviorY: { shorthand: ["overscrollY"] },
    scrollbar: {
      values: ["visible", "hidden"],
      transform(v) {
        switch (v) {
          case "visible":
            return {
              msOverflowStyle: "auto",
              scrollbarWidth: "auto",
              "&::-webkit-scrollbar": { display: "block" },
            }
          case "hidden":
            return {
              msOverflowStyle: "none",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }
          default:
            return {}
        }
      },
    },
    scrollbarColor: {
      values: colorValues,
      transform: createColorMixTransform("scrollbarColor"),
    },
    scrollbarGutter: { values: "spacing" },
    scrollbarWidth: { values: "sizes" },
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
    scrollPaddingInline: { values: "spacing", shorthand: ["scrollPaddingX"] },
    scrollPaddingBlock: { values: "spacing", shorthand: ["scrollPaddingY"] },
    // scroll snap
    scrollSnapType: {
      values: {
        none: "none",
        x: "x var(--scroll-snap-strictness)",
        y: "y var(--scroll-snap-strictness)",
        both: "both var(--scroll-snap-strictness)",
      },
    },
    scrollSnapStrictness: {
      values: ["mandatory", "proximity"],
      transform: (v) => ({ "--scroll-snap-strictness": v }),
    },
    scrollSnapMargin: { values: "spacing" },
    scrollSnapMarginTop: { values: "spacing" },
    scrollSnapMarginBottom: { values: "spacing" },
    scrollSnapMarginLeft: { values: "spacing" },
    scrollSnapMarginRight: { values: "spacing" },
    // list
    listStylePosition: { shorthand: ["listStylePos"] },
    listStyleImage: { values: "assets", shorthand: ["listStyleImg"] },
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
      values: colorValues,
      transform: createColorMixTransform("--ring-color"),
    },
    ringOffset: {
      transform: (value) => ({ "--ring-offset-width": value }),
    },
    ringOffsetColor: {
      values: colorValues,
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
    marginInlineEnd: { values: "spacing", shorthand: ["me", "marginEnd"] },
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
      values: colorValues,
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
    spaceXReverse: {
      values: { type: "boolean" },
      transform(value) {
        return {
          "& > :not(style, [hidden]) ~ :not(style, [hidden])": {
            "--space-x-reverse": value ? "1" : undefined,
          },
        }
      },
    },
    spaceX: {
      property: "marginInlineStart",
      values: "spacing",
      transform: (v) => ({
        "& > :not(style, [hidden]) ~ :not(style, [hidden])": {
          "--space-x-reverse": "0",
          marginInlineStart: `calc(${v} * calc(1 - var(--space-x-reverse)))`,
          marginInlineEnd: `calc(${v} * var(--space-x-reverse))`,
        },
      }),
    },
    spaceYReverse: {
      values: { type: "boolean" },
      transform(value) {
        return {
          "& > :not(style, [hidden]) ~ :not(style, [hidden])": {
            "--space-y-reverse": value ? "1" : undefined,
          },
        }
      },
    },
    spaceY: {
      property: "marginTop",
      values: "spacing",
      transform: (v) => ({
        "& > :not(style, [hidden]) ~ :not(style, [hidden])": {
          "--space-y-reverse": "0",
          marginTop: `calc(${v} * calc(1 - var(--space-y-reverse)))`,
          marginBottom: `calc(${v} * var(--space-y-reverse))`,
        },
      }),
    },
    rotate: {
      transform(value) {
        if (value !== "auto") return { rotate: deg(value) }
        return {
          rotate: `var(--rotate-x, 0) var(--rotate-y, 0) var(--rotate-z, 0)`,
        }
      },
    },
    rotateX: {
      transform(value) {
        return { "--rotate-x": deg(value) }
      },
    },
    rotateY: {
      transform(value) {
        return { "--rotate-y": deg(value) }
      },
    },
    // transform / translate
    translate: {
      transform(value) {
        if (value !== "auto") return { translate: value }
        return {
          translate: `var(--translate-x) var(--translate-y)`,
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
    transition: {
      values: [
        "all",
        "common",
        "colors",
        "opacity",
        "position",
        "backgrounds",
        "size",
        "shadow",
        "transform",
      ],
      transform(value) {
        switch (value) {
          case "all":
            return createTransition("all")
          case "position":
            return createTransition(
              "left, right, top, bottom, inset-inline, inset-block",
            )
          case "colors":
            return createTransition(
              "color, background-color, border-color, text-decoration-color, fill, stroke",
            )
          case "opacity":
            return createTransition("opacity")
          case "shadow":
            return createTransition("box-shadow")
          case "transform":
            return createTransition("transform")
          case "size":
            return createTransition("width, height")
          case "backgrounds":
            return createTransition(
              "background, background-color, background-image, background-position",
            )
          case "common":
            return createTransition(
              "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
            )
          default:
            return { transition: value }
        }
      },
    },
    transitionDuration: { values: "durations" },
    transitionProperty: {
      values: {
        common:
          "background-color, border-color, color, fill, stroke, opacity, box-shadow, translate, transform",
        colors: "background-color, border-color, color, fill, stroke",
        size: "width, height",
        position: "left, right, top, bottom, inset-inline, inset-block",
        background:
          "background, background-color, background-image, background-position",
      },
    },
    transitionTimingFunction: { values: "easings" },
    // animation
    animation: { values: "animations" },
    animationDuration: { values: "durations" },
    animationDelay: { values: "durations" },
    animationTimingFunction: { values: "easings" },
    // typography
    fontFamily: { values: "fonts" },
    fontSize: { values: "fontSizes" },
    fontWeight: { values: "fontWeights" },
    lineHeight: { values: "lineHeights" },
    letterSpacing: { values: "letterSpacings" },
    textIndent: { values: "spacing" },
    truncate: {
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
    lineClamp: {
      transform(value) {
        if (value === "none") {
          return {
            WebkitLineClamp: "unset",
          }
        }
        return {
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: value,
          WebkitBoxOrient: "vertical",
          textWrap: "wrap",
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
      values: colorValues,
      transform: createColorMixTransform("caretColor"),
    },
    cursor: { values: "cursor" },
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
