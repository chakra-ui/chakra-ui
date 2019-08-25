import * as React from "react";
import { BoxProps } from "../Box";

interface IBreadcrumb {
  children?: React.ReactNode;
  /**
   * The visual separator between each breadcrumb item
   */
  separator?: string | React.ReactNode;
  /**
   * The color of the visual separator
   */
  separatorColor?: string;
}

type BreadcrumbProps = BoxProps & IBreadcrumb;

declare const Breadcrumb: React.FC<BreadcrumbProps>;

export default Breadcrumb;

/////////////////////////////////////////////////////////////

export type BreadcrumbItemProps = BreadcrumbProps & {
  /**
   * If `true`, indicates that the breadcrumb item is active, adds
   * `aria-current=page` and renders a `span`
   */
  isCurrentPage?: boolean;
};

export const BreadcrumbItem: React.FC<BreadcrumbItemProps>;
