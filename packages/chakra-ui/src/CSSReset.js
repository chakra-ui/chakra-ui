/** @jsx jsx */
import { jsx, Global, css } from "@emotion/core";
import { useUIMode } from "./ThemeProvider";

const getThemedStyle = ({ colors }) => {
  return {
    light: {
      color: colors.gray[800],
      bg: undefined,
      borderColor: colors.gray[200]
    },
    dark: {
      color: colors.alpha[900],
      bg: colors.gray[900],
      borderColor: colors.alpha[300]
    }
  };
};

const CSSReset = () => {
  const { mode } = useUIMode();

  return (
    <Global
      styles={theme => css`
        /* Normalize CSS */
        html {
          -webkit-font-smoothing: antialiased;
          -webkit-text-size-adjust: 100%;
          text-rendering: optimizelegibility;
        }

        body {
          margin: 0;
        }

        main {
          display: block;
        }

        h1 {
          font-size: 2em;
          margin: 0.67em 0;
        }

        hr {
          box-sizing: content-box;
          height: 0;
          overflow: visible;
        }

        pre {
          font-family: monospace, monospace;
          font-size: 1em;
        }

        a {
          background-color: transparent;
        }

        abbr[title] {
          border-bottom: none;
          text-decoration: underline;
          text-decoration: underline dotted;
        }

        b,
        strong {
          font-weight: bolder;
        }

        code,
        kbd,
        samp {
          font-family: monospace, monospace;
          font-size: 1em;
        }

        small {
          font-size: 80%;
        }

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

        img {
          border-style: none;
        }

        button,
        input,
        optgroup,
        select,
        textarea {
          font-family: inherit;
          font-size: 100%;
          line-height: 1.15;
          margin: 0;
        }

        button,
        input {
          overflow: visible;
        }

        button,
        select {
          text-transform: none;
        }

        button,
        [type="button"],
        [type="reset"],
        [type="submit"] {
          -webkit-appearance: button;
        }

        button::-moz-focus-inner,
        [type="button"]::-moz-focus-inner,
        [type="reset"]::-moz-focus-inner,
        [type="submit"]::-moz-focus-inner {
          border-style: none;
          padding: 0;
        }

        fieldset {
          padding: 0.35em 0.75em 0.625em;
        }

        legend {
          box-sizing: border-box;
          color: inherit;
          display: table;
          max-width: 100%;
          padding: 0;
          white-space: normal;
        }

        progress {
          vertical-align: baseline;
        }

        textarea {
          overflow: auto;
        }

        [type="checkbox"],
        [type="radio"] {
          box-sizing: border-box;
          padding: 0;
        }

        [type="number"]::-webkit-inner-spin-button,
        [type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none !important;
        }

        [type="search"] {
          -webkit-appearance: textfield;
          outline-offset: -2px;
        }

        [type="search"]::-webkit-search-decoration {
          -webkit-appearance: none;
        }

        ::-webkit-file-upload-button {
          -webkit-appearance: button;
          font: inherit;
        }

        details {
          display: block;
        }

        summary {
          display: list-item;
        }

        template {
          display: none;
        }

        [hidden] {
          display: none !important;
        }

        /* SUIT CSS Base */

        html {
          box-sizing: border-box;
          font-family: sans-serif;
        }

        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }

        blockquote,
        dl,
        dd,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        figure,
        p,
        pre {
          margin: 0;
        }

        button {
          background: transparent;
          padding: 0;
        }

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

        /* Chakra Custom Reset Style */

        html {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            "Helvetica Neue", Arial, "Noto Sans", sans-serif,
            "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
            "Noto Color Emoji";
          line-height: 1.5;
          font-size: 1rem;
          color: ${getThemedStyle(theme)[mode]["color"]};
          background-color: ${getThemedStyle(theme)[mode]["bg"]};
        }

        *,
        *::before,
        *::after {
          border-width: 0;
          border-style: solid;
          border-color: ${getThemedStyle(theme)[mode]["borderColor"]};
        }

        img {
          border-style: solid;
        }

        img,
        video {
          max-width: 100%;
          height: auto;
        }

        textarea {
          resize: vertical;
        }

        input::placeholder,
        textarea::placeholder {
          color: inherit;
          opacity: 0.5;
        }

        button,
        [role="button"] {
          cursor: pointer;
        }

        *,
        *:focus {
          outline: 0;
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

        button,
        input,
        optgroup,
        select,
        textarea {
          padding: 0;
          line-height: inherit;
          color: inherit;
        }

        pre,
        code,
        kbd,
        samp {
          font-family: Menlo, Monaco, Consolas, "Liberation Mono", "Courier New",
            monospace;
        }
      `}
    />
  );
};

export default CSSReset;
