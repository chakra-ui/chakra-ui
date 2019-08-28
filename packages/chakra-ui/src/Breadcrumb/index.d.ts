import * as React from "react";
import { BoxProps } from "../Box";
import * as StyledSystem from "styled-system";
import { LinkProps } from "../Link";

interface IBreadcrumb {
  children?: React.ReactNode;
  /**
   * The visual separator between each breadcrumb item
   */
  separator?: string | React.ReactNode;
  /**
   * If `true`, the breadcrumb will add the separator automatically
   */
  addSeparator?: boolean;
  /**
   * The left and right margin applied to the separator
   */
  spacing?: StyledSystem.MarginProps;
}

type BreadcrumbProps = BoxProps & IBreadcrumb;
declare const Breadcrumb: React.FC<BreadcrumbProps>;
export default Breadcrumb;

/////////////////////////////////////////////////////////////

export const BreadcrumbSeparator: React.FC<BoxProps>;
export const BreadcrumbLink: React.FC<LinkProps>;

/////////////////////////////////////////////////////////////

export type BreadcrumbItemProps = BreadcrumbProps & {
  /**
   * If `true`, indicates that the breadcrumb item is active, adds
   * `aria-current=page` and renders a `span`
   */
  isCurrentPage?: boolean;
};

export const BreadcrumbItem: React.FC<BreadcrumbItemProps>;
