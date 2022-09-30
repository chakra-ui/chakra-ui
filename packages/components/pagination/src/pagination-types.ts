export type UsePaginationProps = {
  /**
   * Total number of data items
   */
  count: number
  /**
   * Number of data items per page
   */
  defaultPageSize?: number
  /**
   * Number of data items per page
   */
  pageSize?: number
  /**
   * Number of pages to show beside active page
   */
  siblingCount?: number
  /**
   * The default active page
   */
  defaultPage?: number
  /**
   * The active page
   */
  page?: number
  /**
   * Called when the page number is changed, and it takes the resulting page number argument
   */
  onChange?: (details: {
    page: number
    pageSize: number
    srcElement: HTMLElement | null
  }) => void
}
