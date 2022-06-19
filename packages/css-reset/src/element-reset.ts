type ElementCssReset = Record<keyof JSX.IntrinsicElements | string, any>

export const elementResets: ElementCssReset = {
  a: {
    backgroundColor: "transparent",
    color: "inherit",
    textDecoration: "inherit",
  },
  abbr: {
    "&[title]": {
      borderBottom: "none",
      textDecoration: ["underline", "underline dotted"],
      WebkitTextDecoration: "underline dotted",
    },
  },
  audio: { display: "block" },
  b: { fontWeight: "bold" },
  blockquote: { margin: "0" },
  body: {
    position: "relative",
    minHeight: "100%",
    fontFeatureSettings: "'kern'",
    margin: "0",
  },
  button: {
    fontFamily: "inherit",
    fontSize: "100%",
    lineHeight: "inherit",
    margin: "0",
    color: "inherit",
    textTransform: "none",
    overflow: "visible",
    cursor: "pointer",
    background: "transparent",
    padding: "0",
    "&::-moz-focus-inner": {
      border: "0 !important",
      borderStyle: "none",
      padding: "0",
    },
  },
  canvas: { display: "block" },
  code: {
    fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    fontSize: "1em",
  },
  dd: { margin: "0" },
  details: { display: "block" },
  dl: { margin: "0" },
  embed: { display: "block" },
  fieldset: { padding: "0", margin: "0" },
  figure: { margin: "0" },
  h1: { fontSize: "inherit", fontWeight: "inherit", margin: "0" },
  h2: { fontSize: "inherit", fontWeight: "inherit", margin: "0" },
  h3: { fontSize: "inherit", fontWeight: "inherit", margin: "0" },
  h4: { fontSize: "inherit", fontWeight: "inherit", margin: "0" },
  h5: { fontSize: "inherit", fontWeight: "inherit", margin: "0" },
  h6: { fontSize: "inherit", fontWeight: "inherit", margin: "0" },
  hr: {
    borderTopWidth: "1px",
    boxSizing: "content-box",
    height: "0",
    overflow: "visible",
    margin: "0",
  },
  html: {
    lineHeight: 1.5,
    WebkitTextSizeAdjust: "100%",
    fontFamily: "system-ui, sans-serif",
    WebkitFontSmoothing: "antialiased",
    textRendering: "optimizeLegibility",
    MozOsxFontSmoothing: "grayscale",
    touchAction: "manipulation",
  },
  iframe: { display: "block" },
  img: {
    display: "block",
    maxWidth: "100%",
    height: "auto",
    borderStyle: "none",
  },
  input: {
    fontFamily: "inherit",
    fontSize: "100%",
    lineHeight: "inherit",
    margin: "0",
    padding: "0",
    color: "inherit",
    '&[type="checkbox"], &[type="radio"]': {
      boxSizing: "border-box",
      padding: "0",
    },
    '&[type="number"]': {
      MozAppearance: "textfield",
      "&::-webkit-inner-spin-button, &::-webkit-outer-spin-button": {
        WebkitAppearance: "none !important",
      },
    },
    '&[type="search"]': {
      WebkitAppearance: "textfield",
      outlineOffset: "-2px",
      "&::-webkit-search-decoration": { WebkitAppearance: "none !important" },
    },
    '&[type="file"]::-webkit-file-upload-button': {
      WebkitAppearance: "button",
      font: "inherit",
    },
  },
  kbd: {
    fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    fontSize: "1em",
  },
  legend: {
    boxSizing: "border-box",
    color: "inherit",
    display: "table",
    maxWidth: "100%",
    padding: "0",
    whiteSpace: "normal",
  },
  main: { display: "block" },
  object: { display: "block" },
  ol: { margin: "0", padding: "0" },
  optgroup: {
    fontFamily: "inherit",
    fontSize: "100%",
    lineHeight: "inherit",
    margin: "0",
    padding: "0",
    color: "inherit",
  },
  p: { margin: "0" },
  pre: {
    fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    fontSize: "1em",
    margin: "0",
  },
  progress: { verticalAlign: "baseline" },
  samp: {
    fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    fontSize: "1em",
  },
  select: {
    textTransform: "none",
    fontFamily: "inherit",
    fontSize: "100%",
    lineHeight: "inherit",
    margin: "0",
    padding: "0",
    color: "inherit",
    "&::-ms-expand": { display: "none" },
  },
  small: { fontSize: "80%" },
  strong: { fontWeight: "bold" },
  sub: {
    fontSize: "75%",
    lineHeight: 0,
    position: "relative",
    verticalAlign: "baseline",
    bottom: "-0.25em",
  },
  summary: { display: "list-item" },
  sup: {
    fontSize: "75%",
    lineHeight: 0,
    position: "relative",
    verticalAlign: "baseline",
    top: "-0.5em",
  },
  svg: { display: "block" },
  table: { borderCollapse: "collapse" },
  template: { display: "none" },
  textarea: {
    fontFamily: "inherit",
    fontSize: "100%",
    lineHeight: "inherit",
    margin: "0",
    padding: "0",
    color: "inherit",
    overflow: "auto",
    resize: "vertical",
  },
  ul: { margin: "0", padding: "0" },
  video: { display: "block", maxWidth: "100%", height: "auto" },
}

export const cssResetForEveryElement = {
  borderWidth: "0",
  borderStyle: "solid",
  boxSizing: "border-box",
  "&::before": {
    borderWidth: "0",
    borderStyle: "solid",
    boxSizing: "border-box",
  },
  "&::after": {
    borderWidth: "0",
    borderStyle: "solid",
    boxSizing: "border-box",
  },
}

export function getCssResetForElement(element: string) {
  return {
    ...cssResetForEveryElement,
    ...elementResets[element],
  }
}

export const globalCssResets = {
  "[data-js-focus-visible] :focus:not([data-focus-visible-added]):not([data-focus-visible-disabled])":
    {
      outline: "none",
      boxShadow: "none",
    },
  "[hidden]": {
    display: "none !important",
  },
  '[role="button"]': {
    cursor: "pointer",
  },
}
