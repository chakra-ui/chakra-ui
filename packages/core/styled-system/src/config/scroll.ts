import * as CSS from "csstype"
import { Config } from "../utils/prop-config"
import { t, Token } from "../utils"

export const scroll: Config = {
  scrollBehavior: true,
  scrollSnapAlign: true,
  scrollSnapStop: true,
  scrollSnapType: true,
  // scroll margin
  scrollMargin: t.spaceT("scrollMargin"),
  scrollMarginTop: t.spaceT("scrollMarginTop"),
  scrollMarginBottom: t.spaceT("scrollMarginBottom"),
  scrollMarginLeft: t.spaceT("scrollMarginLeft"),
  scrollMarginRight: t.spaceT("scrollMarginRight"),
  scrollMarginX: t.spaceT(["scrollMarginLeft", "scrollMarginRight"]),
  scrollMarginY: t.spaceT(["scrollMarginTop", "scrollMarginBottom"]),
  // scroll padding
  scrollPadding: t.spaceT("scrollPadding"),
  scrollPaddingTop: t.spaceT("scrollPaddingTop"),
  scrollPaddingBottom: t.spaceT("scrollPaddingBottom"),
  scrollPaddingLeft: t.spaceT("scrollPaddingLeft"),
  scrollPaddingRight: t.spaceT("scrollPaddingRight"),
  scrollPaddingX: t.spaceT(["scrollPaddingLeft", "scrollPaddingRight"]),
  scrollPaddingY: t.spaceT(["scrollPaddingTop", "scrollPaddingBottom"]),
}

export interface ScrollProps {
  scrollBehavior?: Token<CSS.Property.ScrollBehavior>
  scrollSnapAlign?: Token<CSS.Property.ScrollSnapAlign>
  scrollSnapStop?: Token<CSS.Property.ScrollSnapStop>
  scrollSnapType?: Token<CSS.Property.ScrollSnapType>
  scrollMargin?: Token<CSS.Property.ScrollMargin | number, "space">
  scrollMarginTop?: Token<CSS.Property.ScrollMarginTop | number, "space">
  scrollMarginBottom?: Token<CSS.Property.ScrollMarginBottom | number, "space">
  scrollMarginLeft?: Token<CSS.Property.ScrollMarginLeft | number, "space">
  scrollMarginRight?: Token<CSS.Property.ScrollMarginRight | number, "space">
  scrollMarginX?: Token<CSS.Property.ScrollMargin | number, "space">
  scrollMarginY?: Token<CSS.Property.ScrollMargin | number, "space">
  scrollPadding?: Token<CSS.Property.ScrollPadding | number, "space">
  scrollPaddingTop?: Token<CSS.Property.ScrollPaddingTop | number, "space">
  scrollPaddingBottom?: Token<
    CSS.Property.ScrollPaddingBottom | number,
    "space"
  >
  scrollPaddingLeft?: Token<CSS.Property.ScrollPaddingLeft | number, "space">
  scrollPaddingRight?: Token<CSS.Property.ScrollPaddingRight | number, "space">
  scrollPaddingX?: Token<CSS.Property.ScrollPadding | number, "space">
  scrollPaddingY?: Token<CSS.Property.ScrollPadding | number, "space">
}
