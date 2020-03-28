import { Global } from "@emotion/core"
import React from "react"

const CSSReset = () => (
  <Global
    styles={`
      body,
      html {
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -webkit-text-size-adjust: 100%;
        text-rendering: optimizelegibility;
        -ms-overflow-style: -ms-autohiding-scrollbar;
        text-decoration-skip-ink: auto;
      }

      *,
      *:before,
      *:after {
        border-width: 0;
        border-style: solid;
        box-sizing: inherit;
      }

      *{
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
      }

      body,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      p,
      dl,
      blockquote,
      ol,
      ul {
        margin: 0;
        padding: 0;
        font-weight: normal;
      }

      var,
      address,
      dfn,
      cite {
        font-style: italic;
      }

      img,
      video {
        border-style: none;
        max-width: 100%;
        height: auto;
      }

      img,
      fieldset {
        border: 0;
      }

      code,
      kbd,
      samp {
        font-family: monospace, monospace;
        font-size: 1em;
      }

      abbr {
        cursor: help;
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

      button,
      input,
      optgroup,
      select,
      textarea {
        font-family: inherit;
        font-size: 100%;
        margin: 0;
      }

      button::-moz-focus-inner,
      [type="button"]::-moz-focus-inner,
      [type="reset"]::-moz-focus-inner,
      [type="submit"]::-moz-focus-inner {
        border-style: none;
      }

      legend {
        box-sizing: border-box;
        color: inherit;
        display: table;
        max-width: 100%;
        padding: 0;
        white-space: normal;
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

      input[type="number"] {
        -moz-appearance: textfield;
      }

      [type="search"] {
        -webkit-appearance: textfield;
        outline-offset: -2px;
      }

      [type="search"]::-webkit-search-decoration {
        -webkit-appearance: none !important;
      }

      hr {
        border-top-width: 1px;
      }

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

      button {
        background: transparent;
        padding: 0;
      }

      button::-moz-focus-inner {
        border: 0 !important;
      }

      table {
        border-collapse: collapse;
        border-spacing: 0;
        width: 100%;
      }

      td,
      th {
        border: none;
        text-align: left;
      }

      caption {
        text-align: left;
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

      img,
      svg,
      video,
      canvas,
      audio,
      iframe,
      embed,
      object {
        display: block;
      }
    `}
  />
)

export default CSSReset
