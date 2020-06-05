import * as React from "react"

export interface DataListProps<T> {
  /**
   * The plain data array to map over
   */
  data: T[]
  /**
   * Function to get the unique key for each item at the specified index.
   *
   * By default, we fall back to using the index
   */
  getKey?: (item: T, index: number) => string | number
  /**
   * The component to render when the list is empty.
   */
  empty: React.ReactNode
  /**
   * Function to render an item from data
   */
  renderItem: (item: T, index: number) => React.ReactNode
}

/**
 * Simple React component to handle array data rendering
 */
export function DataList<T>(props: DataListProps<T>) {
  const { data = [], getKey, empty, renderItem } = props
  return (
    <React.Fragment>
      {data.length === 0 && empty}
      {data.length > 0 &&
        data.map((item, index) => {
          const key = getKey?.(item, index) ?? index
          const component = renderItem(item, index)
          return <React.Fragment key={key}>{component}</React.Fragment>
        })}
    </React.Fragment>
  )
}
