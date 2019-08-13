import * as React from "react";
import { BoxProps } from "../Box";

interface IBreadcrumb {
  children: React.ReactNode;
  /**
   * The visual separator between each breadcrumb item
   */
  separator?: "/" | ">" | "-";
  /**
   * The color of the visual separator
   */
  separatorColor?: string;
}

export type BreadcrumbProps = BoxProps & IBreadcrumb;

declare const Breadcrumb: React.FunctionComponent<BreadcrumbProps>;

export type BreadcrumbItemProps = BreadcrumbProps & {
  /**
   * If `true`, indicates that the breadcrumb item is active, adds
   * `aria-current=page` and renders a `span` instead of an `a`
   */
  isActive?: boolean;
};

export const BreadcrumbItem: React.FunctionComponent<BreadcrumbItemProps>;

export default Breadcrumb;
