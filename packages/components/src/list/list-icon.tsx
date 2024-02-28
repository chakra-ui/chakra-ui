import { Icon, IconProps } from "../icon"
import { forwardRef } from "../system"
import { useListStyles } from "./list-context"

export interface ListIconProps extends IconProps {}

export const ListIcon = forwardRef<ListIconProps, "svg">(
  function ListIcon(props, ref) {
    const styles = useListStyles()
    return <Icon ref={ref} {...props} __css={styles.icon} />
  },
)

ListIcon.displayName = "ListIcon"
