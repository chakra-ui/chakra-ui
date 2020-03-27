import React from "react"
import { Hide, Show } from ".."

export default {
  title: "Visibility",
}

export const show = () => (
  <Show above="sm">
    <div>Hey! I'll show above sm (480px)</div>
  </Show>
)

export const hide = () => (
  <Hide below="768px">
    <div>Hallos! I'll hide below 768px</div>
  </Hide>
)

export const HideWithQuery = () => (
  <Hide breakpoint="(max-width: 400px)">
    <div>Hallos! I'll be hide at 400px</div>
  </Hide>
)

export const ShowWithQuery = () => (
  <Show breakpoint="(max-width: 400px)">
    <div>Hallos! I'll be show at 400px</div>
  </Show>
)
