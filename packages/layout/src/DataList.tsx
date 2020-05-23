import React from "react"

interface ItemProps<T> {
  /**
   * The item from data being rendered.
   */
  item: T
  /**
   * The index corresponding to this item in the data array.
   */
  index: number
}

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
  renderItem: (props: ItemProps<T>) => React.ReactNode
}

export function DataList<T>(props: DataListProps<T>) {
  const { data = [], getKey, empty, renderItem } = props
  return (
    <React.Fragment>
      {data.length === 0 && empty}
      {data.length > 0 &&
        data.map((item, index) => {
          const key = getKey?.(item, index) ?? index
          const component = renderItem({ item, index })
          return <React.Fragment key={key}>{component}</React.Fragment>
        })}
    </React.Fragment>
  )
}
