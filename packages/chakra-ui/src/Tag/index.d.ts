import { IBadge } from "../Badge";
import * as React from "react";
import { BoxProps } from "../Box";
import { PseudoBoxProps } from "../PseudoBox";
import { CenterProps } from "../Center";

export interface ITag {
  /**
   * The variant of the tag.
   */
  variant?: IBadge["variant"];
  /**
   * The size of the tag.
   */
  size?: "sm" | "md" | "lg";
  /**
   * The color of the tag's text.
   */
  color?: IBadge["color"];
}

export const TagLabel: React.FC<BoxProps>;

export const TagCloseButton: React.FC<PseudoBoxProps>;

export const TagAddon: React.FC<CenterProps>;

export type TagProps = ITag & PseudoBoxProps;

declare const Tag: React.FC<TagProps>;

export default Tag;
