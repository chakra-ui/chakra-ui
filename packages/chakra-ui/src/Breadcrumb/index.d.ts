import * as React from "react";
import { BoxProps } from "../Box";

interface IBreadcrumb {
  children: React.ReactNode;
  separator?: "/" | ">" | "-";
}

export type BreadcrumbProps = BoxProps & IBreadcrumb;

declare const Breadcrumb: React.FunctionComponent<BreadcrumbProps>;

export type BreadcrumbItemProps = BreadcrumbProps & {
  isCurrent?: boolean;
};

export const BreadcrumbItem: React.FunctionComponent<BreadcrumbItemProps>;

export default Breadcrumb;
