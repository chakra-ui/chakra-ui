import React from "react";
import { Hide, HideAt, Show, ShowAt } from "../Visibility";

export default {
  title: "Visibility",
};

export const ShowAt_ = () => (
  <ShowAt breakpoint="320px">
    <div>Hey! I'll show at 320px</div>
  </ShowAt>
);

export const HideAt_ = () => (
  <HideAt breakpoint="320px">
    <div>Hallos! I'll hide at 320px</div>
  </HideAt>
);

export const HideWithQuery = () => (
  <Hide query="(max-width: 400px)">
    <div>Hallos! I'll be hide at 400px</div>
  </Hide>
);

export const ShowWithQuery = () => (
  <Show query="(max-width: 400px)">
    <div>Hallos! I'll be show at 400px</div>
  </Show>
);
