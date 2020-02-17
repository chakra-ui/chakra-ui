import icons from "@chakra-ui/icon-glyphs";
import * as React from "react";
import { Tag, TagIcon, TagLabel } from "./Tag";

export default {
  title: "Tag",
};

export const Basic = () => (
  <>
    <Tag variantSize="sm" variantColor="gray">
      Gray
    </Tag>
    <Tag variantColor="gray">Gray</Tag>
    <Tag variantSize="lg" variantColor="gray">
      Gray
    </Tag>
  </>
);

export const VariantColors = () => (
  <>
    <Tag variantSize="sm" variantColor="green">
      Gray
    </Tag>
    <Tag variantColor="pink">Gray</Tag>
    <Tag variantSize="lg" variantColor="blue">
      Gray
    </Tag>
  </>
);

export const LeftIcon = () => (
  <>
    <Tag variantColor="cyan">
      <TagIcon size="12px" children={icons.add.path} />
      <TagLabel>Green</TagLabel>
    </Tag>
  </>
);
