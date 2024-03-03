import { SystemStyleObject } from "../../styled-system"

export interface BreadcrumbListOptions {
  /**
   * The visual separator between each breadcrumb item
   * @default "/"
   * @type string | React.ReactElement
   */
  separator?: string | React.ReactElement
  /**
   * The left and right margin applied to the separator
   * @default "0.5rem"
   * @type SystemStyleObject["mx"]
   */
  spacing?: SystemStyleObject["mx"]
}

export interface BreadcrumbItemOptions extends BreadcrumbListOptions {
  /**
   * @default false
   */
  isCurrentPage?: boolean
  /**
   * @default false
   */
  isLastChild?: boolean
}
