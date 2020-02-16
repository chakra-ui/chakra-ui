import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Tag, TagIcon, TagLabel } from "./Tag";
import icons from "@chakra-ui/icon-glyphs";

const stories = storiesOf("Tag", module);

stories.add("basic", () => (
  <>
    <Tag variantSize="sm" variantColor="gray">
      Gray
    </Tag>
    <Tag variantColor="gray">Gray</Tag>
    <Tag variantSize="lg" variantColor="gray">
      Gray
    </Tag>
  </>
));

stories.add("variant colors", () => (
  <>
    <Tag variantSize="sm" variantColor="green">
      Gray
    </Tag>
    <Tag variantColor="pink">Gray</Tag>
    <Tag variantSize="lg" variantColor="blue">
      Gray
    </Tag>
  </>
));

stories.add("with left icon", () => (
  <>
    <Tag variantColor="cyan">
      <TagIcon size="12px" children={icons.add.path} />
      <TagLabel>Green</TagLabel>
    </Tag>
  </>
));
