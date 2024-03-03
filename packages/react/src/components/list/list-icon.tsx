import { forwardRef } from "../../styled-system"
import { Icon, IconProps } from "../icon"
import { useListStyles } from "./list-context"

export interface ListIconProps extends IconProps {}

export const ListIcon = forwardRef<ListIconProps, "svg">(
  function ListIcon(props, ref) {
    const styles = useListStyles()
    return <Icon ref={ref} {...props} css={styles.icon} />
  },
)

ListIcon.displayName = "ListIcon"
