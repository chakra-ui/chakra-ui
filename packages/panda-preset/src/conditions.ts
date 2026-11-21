import type { Conditions } from "@pandacss/types"

// Copied from `defaultConditions` in packages/react/src/preset-base.ts.
// Hand-written: `clean` keeps it and `sync` skips it, so `chakra-theme` survives.
export const conditions: Conditions = {
  hover: {
    "@media (hover: hover)": {
      "&:is(:hover, [data-hover]):not(:disabled, [data-disabled])": "@slot",
    },
  },
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
  fullscreen: "&:is(:fullscreen, [data-fullscreen])",
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
}
