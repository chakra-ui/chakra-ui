import { SystemStyleObject } from "@chakra-ui/system"

export interface BreadcrumbOptions {
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

export interface BreadcrumbItemOptions extends BreadcrumbOptions {
  /**
   * @default false
   */
  isCurrentPage?: boolean
  /**
   * @default false
   */
  isLastChild?: boolean
}
