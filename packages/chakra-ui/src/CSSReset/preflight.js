import { css } from "@emotion/core";

const tailwindPreflight = css`
  /*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */

  /* Document
   ========================================================================== */

  /**
 * 1. Correct the line height in all browsers.
 * 2. Prevent adjustments of font size after orientation changes in iOS.
 */

  html {
    line-height: 1.15; /* 1 */
    -webkit-text-size-adjust: 100%; /* 2 */
  }

  /* Sections
   ========================================================================== */

  /**
 * Remove the margin in all browsers.
 */

  body {
    margin: 0;
  }

  /**
 * Render the main element consistently in IE.
 */

  main {
    display: block;
  }

  /**
 * Correct the font size and margin on h1 elements within section and
 * article contexts in Chrome, Firefox, and Safari.
 */

  h1 {
    font-size: 2em;
    margin: 0.67em 0;
  }

  /* Grouping content
   ========================================================================== */

  /**
 * 1. Add the correct box sizing in Firefox.
 * 2. Show the overflow in Edge and IE.
 */

  hr {
    box-sizing: content-box; /* 1 */
    height: 0; /* 1 */
    overflow: visible; /* 2 */
  }

  /**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd em font sizing in all browsers.
 */

  pre {
    font-family: monospace, monospace; /* 1 */
    font-size: 1em; /* 2 */
  }

  /* Text-level semantics
   ========================================================================== */

  /**
 * Remove the gray background on active links in IE 10.
 */

  a {
    background-color: transparent;
  }

  /**
 * 1. Remove the bottom border in Chrome 57-
 * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
 */

  abbr[title] {
    border-bottom: none; /* 1 */
    text-decoration: underline; /* 2 */
    -webkit-text-decoration: underline dotted;
    text-decoration: underline dotted; /* 2 */
  }

  /**
 * Add the correct font weight in Chrome, Edge, and Safari.
 */

  b,
  strong {
    font-weight: bolder;
  }

  /**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd em font sizing in all browsers.
 */

  code,
  kbd,
  samp {
    font-family: monospace, monospace; /* 1 */
    font-size: 1em; /* 2 */
  }

  /**
 * Add the correct font size in all browsers.
 */

  small {
    font-size: 80%;
  }

  /**
 * Prevent sub and sup elements from affecting the line height in
 * all browsers.
 */

  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sub {
    bottom: -0.25em;
  }

  sup {
    top: -0.5em;
  }

  /* Embedded content
   ========================================================================== */

  /**
 * Remove the border on images inside links in IE 10.
 */

  img {
    border-style: none;
  }

  /* Forms
   ========================================================================== */

  /**
 * 1. Change the font styles in all browsers.
 * 2. Remove the margin in Firefox and Safari.
 */

  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit; /* 1 */
    font-size: 100%; /* 1 */
    line-height: 1.15; /* 1 */
    margin: 0; /* 2 */
  }

  /**
 * Show the overflow in IE.
 * 1. Show the overflow in Edge.
 */

  button,
  input {
    /* 1 */
    overflow: visible;
  }

  /**
 * Remove the inheritance of text transform in Edge, Firefox, and IE.
 * 1. Remove the inheritance of text transform in Firefox.
 */

  button,
  select {
    /* 1 */
    text-transform: none;
  }

  /**
 * Correct the inability to style clickable types in iOS and Safari.
 */

  /* button,
  [type="button"],
  [type="reset"],
  [type="submit"] {
    -webkit-appearance: button;
  } */

  /**
 * Remove the inner border and padding in Firefox.
 */

  button::-moz-focus-inner,
  [type="button"]::-moz-focus-inner,
  [type="reset"]::-moz-focus-inner,
  [type="submit"]::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }

  /**
 * Restore the focus styles unset by the previous rule.
 */

  /* button:-moz-focusring,
  [type="button"]:-moz-focusring,
  [type="reset"]:-moz-focusring,
  [type="submit"]:-moz-focusring {
    outline: 1px dotted ButtonText;
  } */

  /**
 * Correct the padding in Firefox.
 */

  fieldset {
    padding: 0.35em 0.75em 0.625em;
  }

  /**
 * 1. Correct the text wrapping in Edge and IE.
 * 2. Correct the color inheritance from fieldset elements in IE.
 * 3. Remove the padding so developers are not caught out when they zero out
 *    fieldset elements in all browsers.
 */

  legend {
    box-sizing: border-box; /* 1 */
    color: inherit; /* 2 */
    display: table; /* 1 */
    max-width: 100%; /* 1 */
    padding: 0; /* 3 */
    white-space: normal; /* 1 */
  }

  /**
 * Add the correct vertical alignment in Chrome, Firefox, and Opera.
 */

  progress {
    vertical-align: baseline;
  }

  /**
 * Remove the default vertical scrollbar in IE 10+.
 */

  textarea {
    overflow: auto;
  }

  /**
 * 1. Add the correct box sizing in IE 10.
 * 2. Remove the padding in IE 10.
 */

  [type="checkbox"],
  [type="radio"] {
    box-sizing: border-box; /* 1 */
    padding: 0; /* 2 */
  }

  /**
 * Correct the cursor style of increment and decrement buttons in Chrome.
 */

  [type="number"]::-webkit-inner-spin-button,
  [type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none !important;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }

  /**
 * 1. Correct the odd appearance in Chrome and Safari.
 * 2. Correct the outline style in Safari.
 */

  [type="search"] {
    -webkit-appearance: textfield; /* 1 */
    outline-offset: -2px; /* 2 */
  }

  /**
 * Remove the inner padding in Chrome and Safari on macOS.
 */

  [type="search"]::-webkit-search-decoration {
    -webkit-appearance: none !important;
  }

  /**
 * 1. Correct the inability to style clickable types in iOS and Safari.
 * 2. Change font properties to inherit in Safari.
 */

  ::-webkit-file-upload-button {
    -webkit-appearance: button; /* 1 */
    font: inherit; /* 2 */
  }

  /* Interactive
   ========================================================================== */

  /**
  * Add the correct display in Edge, IE 10+, and Firefox.
  */
  details {
    display: block;
  }

  /**
 * Add the correct display in all browsers.
 */

  summary {
    display: list-item;
  }

  /* Misc
   ========================================================================== */

  /**
 * Add the correct display in IE 10+.
 */

  template {
    display: none;
  }

  /**
 * Add the correct display in IE 10.
 */

  [hidden] {
    display: none !important;
  }

  /**
 * Manually forked from SUIT CSS Base: https://github.com/suitcss/base
 * A thin layer on top of normalize.css that provides a starting point more
 * suitable for web applications.
 */

  /**
 * 1. Prevent padding and border from affecting element width
 * https://goo.gl/pYtbK7
 * 2. Change the default font family in all browsers (opinionated)
 */

  html {
    box-sizing: border-box; /* 1 */
    font-family: sans-serif; /* 2 */
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /**
 * Removes the default spacing and border for appropriate elements.
 */

  blockquote,
  dl,
  dd,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  hr,
  figure,
  p,
  pre {
    margin: 0;
  }

  button {
    background: transparent;
    padding: 0;
  }

  /**
 * Work around a Firefox/IE bug where the transparent button background
 * results in a loss of the default button focus styles.
 */

  /* button:focus {
    outline: 1px dotted;
    outline: 5px auto -webkit-focus-ring-color;
  } */

  fieldset {
    margin: 0;
    padding: 0;
  }

  ol,
  ul {
    /* list-style: none; */
    margin: 0;
    padding: 0;
  }

  /**
 * Tailwind custom reset styles
 */

  /**
 * 1. Use the system font stack as a sane default.
 * 2. Use Tailwind's default "normal" line-height so the user isn't forced
 * to override it to ensure consistency even when using the default theme.
 */

  html {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
      "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; /* 1 */
    line-height: 1.5; /* 2 */
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
    text-rendering: optimizelegibility;
  }

  /**
 * Ensure horizontal rules are visible by default
 */

  hr {
    border-top-width: 1px;
  }

  /**
 * Undo the border-style: none reset that Normalize applies to images so that
 * our border-{width} utilities have the expected effect.
 *
 * The Normalize reset is unnecessary for us since we default the border-width
 * to 0 on all elements.
 *
 * https://github.com/tailwindcss/tailwindcss/issues/362
 */

  img {
    border-style: solid;
  }

  textarea {
    resize: vertical;
  }

  button,
  [role="button"] {
    cursor: pointer;
  }

  button::-moz-focus-inner {
    border: 0 !important;
  }

  table {
    border-collapse: collapse;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: inherit;
    font-weight: inherit;
  }

  /**
 * Reset links to optimize for opt-in styling instead of
 * opt-out.
 */

  a {
    color: inherit;
    text-decoration: inherit;
  }

  /**
 * Reset form element properties that are easy to forget to
 * style explicitly so you don't inadvertently introduce
 * styles that deviate from your design system. These styles
 * supplement a partial reset that is already applied by
 * normalize.css.
 */

  button,
  input,
  optgroup,
  select,
  textarea {
    padding: 0;
    line-height: inherit;
    color: inherit;
  }

  /**
 * Use the configured 'mono' font family for elements that
 * are expected to be rendered with a monospace font, falling
 * back to the system monospace stack if there is no configured
 * 'mono' font family.
 */

  pre,
  code,
  kbd,
  samp {
    font-family: Menlo, Monaco, Consolas, "Liberation Mono", "Courier New",
      monospace;
  }

  /**
 * Make replaced elements display: block by default as that's
 * the behavior you want almost all of the time. Inspired by
 * CSS Remedy, with svg added as well.
 *
 * https://github.com/mozdevs/cssremedy/issues/14
 */

  img,
  svg,
  video,
  canvas,
  audio,
  iframe,
  embed,
  object {
    display: block;
    vertical-align: middle;
  }

  /**
 * Constrain images and videos to the parent width and preserve
 * their instrinsic aspect ratio.
 *
 * https://github.com/mozdevs/cssremedy/issues/14
 */

  img,
  video {
    max-width: 100%;
    height: auto;
  }
`;

export default tailwindPreflight;
