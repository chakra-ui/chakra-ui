/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import Breadcrumb, { BreadcrumbItem } from ".";
import Link from "../Link";
import Box from "../Box";
import Icon from "../Icon";

const stories = storiesOf("Breadcrumb", module).addDecorator(story => (
  <Box maxWidth="md" mx="auto" mt={5}>
    {story()}
  </Box>
));

stories.add("default", () => (
  <Breadcrumb>
    <BreadcrumbItem>
      <Link href="#">Breadcrumb 1</Link>
    </BreadcrumbItem>

    <BreadcrumbItem>
      <Link href="#">Breadcrumb 2</Link>
    </BreadcrumbItem>

    <BreadcrumbItem isCurrentPage>
      <Link href="#">Breadcrumb 3</Link>
    </BreadcrumbItem>
  </Breadcrumb>
));

stories.add("separator", () => (
  <Breadcrumb separator=">">
    <BreadcrumbItem>
      <Link href="#">Home</Link>
    </BreadcrumbItem>

    <BreadcrumbItem>
      <Link href="#">About</Link>
    </BreadcrumbItem>

    <BreadcrumbItem isCurrentPage>
      <Link href="#">Current</Link>
    </BreadcrumbItem>
  </Breadcrumb>
));

stories.add("separator v2", () => (
  <Breadcrumb separator={<Icon name="chevron-right" />}>
    <BreadcrumbItem>
      <Link href="#">Home</Link>
    </BreadcrumbItem>

    <BreadcrumbItem>
      <Link href="#">About</Link>
    </BreadcrumbItem>

    <BreadcrumbItem isCurrentPage>
      <Link href="#">Current</Link>
    </BreadcrumbItem>
  </Breadcrumb>
));
