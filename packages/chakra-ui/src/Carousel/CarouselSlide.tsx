import { css } from "@emotion/core";
import React from "react";

// TODO: Follow the status of https://github.com/WICG/inert and remove polyfill
if (typeof window !== "undefined") {
  import("wicg-inert");
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CarouselSlideProps
  extends React.PropsWithoutRef<JSX.IntrinsicElements["div"]> {}

export default function CarouselSlide({
  children,
  ...restProps
}: CarouselSlideProps) {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      css={css`
        flex: 0 0 100%;
        scroll-snap-align: start;
        scroll-snap-stop: always;

        > * {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}
      {...restProps}
    >
      {children}
    </div>
  );
}
