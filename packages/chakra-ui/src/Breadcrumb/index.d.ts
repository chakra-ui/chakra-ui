import * as React from "react";
import { BoxProps } from "../Box";

export interface BreadcrumbProps extends BoxProps {
  children: React.ReactNode;
  separator?: "/" | ">" | "-";
}

declare const Breadcrumb: React.FunctionComponent<BreadcrumbProps>;

export default Breadcrumb;
