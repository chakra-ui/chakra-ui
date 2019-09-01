import { IBadge } from "../Badge";
import * as React from "react";
import { BoxProps } from "../Box";
import { PseudoBoxProps } from "../PseudoBox";

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
   * The color scheme of the tag.
   */
  variantColor?: IBadge["variantColor"];
}
export type TagProps = ITag & PseudoBoxProps;
declare const Tag: React.FC<TagProps>;
export default Tag;

export const TagLabel: React.FC<BoxProps>;
export const TagCloseButton: React.FC<PseudoBoxProps>;

interface ITagIcon {
  icon: string | React.ElementType;
}
export const TagIcon: React.FC<ITagIcon & BoxProps>;
