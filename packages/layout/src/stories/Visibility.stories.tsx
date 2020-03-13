import React from "react"
import { Hide, Show } from "../Visibility"

export default {
  title: "Visibility",
}

export const Show_ = () => (
  <Show above="320px">
    <div>Hey! I'll show above 320px</div>
  </Show>
)

export const Hide_ = () => (
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
