import * as React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "./Breadcrumb";

export default {
  title: "Breadcrumb",
};

export const Default = () => (
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
);

export const Separator = () => (
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
);

export const SeparatorV2 = () => (
  <Breadcrumb separator="/">
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
);
