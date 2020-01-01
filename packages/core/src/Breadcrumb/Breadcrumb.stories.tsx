import * as React from "react";
import { storiesOf } from "@storybook/react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "./Breadcrumb";
import { Icon } from "../Icon";
import setup from "../story.setup";

const stories = storiesOf("Breadcrumb", module);

stories.addDecorator(setup);

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
