/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import Breadcrumb, { BreadcrumbItem } from ".";
import Link from "../Link";

const stories = storiesOf("Breadcrumb", module);
stories.add("Default", () => (
  <Breadcrumb maxWidth="md" mx="auto" mt={5}>
    <BreadcrumbItem>
      <Link href="/google">Home</Link>
    </BreadcrumbItem>

    <BreadcrumbItem>
      <Link href="/about">About</Link>
    </BreadcrumbItem>

    <BreadcrumbItem isActive>
      <Link href="/current">Current</Link>
    </BreadcrumbItem>
  </Breadcrumb>
));
