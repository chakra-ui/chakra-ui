/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import Breadcrumb, {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "../Breadcrumb";
import Box from "../Box";
import Icon from "../Icon";

const stories = storiesOf("Breadcrumb", module).addDecorator(story => (
  <Box maxWidth="md" mx="auto" mt={5}>
    {story()}
  </Box>
));

stories.add("default", () => (
  <Breadcrumb addSeparator={false}>
    <BreadcrumbItem>
      <BreadcrumbLink href="#">Breadcrumb 1</BreadcrumbLink>
      <BreadcrumbSeparator />
    </BreadcrumbItem>

    <BreadcrumbItem>
      <BreadcrumbLink href="#">Breadcrumb 2</BreadcrumbLink>
      <BreadcrumbSeparator />
    </BreadcrumbItem>

    <BreadcrumbItem isCurrentPage>
      <BreadcrumbLink href="#">Breadcrumb 3</BreadcrumbLink>
    </BreadcrumbItem>
  </Breadcrumb>
));

stories.add("separator", () => (
  <Breadcrumb separator=">">
    <BreadcrumbItem>
      <BreadcrumbLink href="#">Home</BreadcrumbLink>
    </BreadcrumbItem>

    <BreadcrumbItem>
      <BreadcrumbLink href="#">About</BreadcrumbLink>
    </BreadcrumbItem>

    <BreadcrumbItem isCurrentPage>
      <BreadcrumbLink href="#">Current</BreadcrumbLink>
    </BreadcrumbItem>
  </Breadcrumb>
));

stories.add("separator v2", () => (
  <Breadcrumb separator={<Icon name="chevron-right" />}>
    <BreadcrumbItem>
      <BreadcrumbLink href="#">Home</BreadcrumbLink>
    </BreadcrumbItem>

    <BreadcrumbItem>
      <BreadcrumbLink href="#">About</BreadcrumbLink>
    </BreadcrumbItem>

    <BreadcrumbItem isCurrentPage>
      <BreadcrumbLink href="#">Current</BreadcrumbLink>
    </BreadcrumbItem>
  </Breadcrumb>
));
