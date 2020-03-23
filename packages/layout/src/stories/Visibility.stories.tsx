import React from "react"
import { Hide, Show } from ".."

export default {
  title: "Visibility",
}

export const show = () => (
  <Show above="320px">
    <div>Hey! I'll show above 320px</div>
  </Show>
)

export const hide = () => (
  <Hide above="768px">
    <div>Hallos! I'll hide above 768px</div>
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
