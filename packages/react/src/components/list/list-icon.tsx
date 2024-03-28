"use client"

import { forwardRef } from "react"
import { Icon, IconProps } from "../icon"
import { useListStyles } from "./list-context"

export interface ListIconProps extends IconProps {}

export const ListIcon = forwardRef<SVGElement, ListIconProps>(
  function ListIcon(props, ref) {
    const styles = useListStyles()
    return <Icon ref={ref} {...props} css={[styles.icon, props.css]} />
  },
)

ListIcon.displayName = "ListIcon"
