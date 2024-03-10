import { cx } from "@chakra-ui/utils"
import { useId } from "react"
import {
  HTMLChakraProps,
  SystemStyleObject,
  chakra,
  forwardRef,
} from "../../styled-system"
import {
  useMenuContext,
  useMenuGroupContext,
  useMenuStyles,
} from "./menu-context"
import { MenuIcon } from "./menu-icon"
import { UseMenuOptionItemProps } from "./use-menu"

const CheckIcon = (props: React.ComponentProps<"svg">) => (
  <svg viewBox="0 0 14 14" width="1em" height="1em" {...props}>
    <polygon
      fill="currentColor"
      points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039"
    />
  </svg>
)

export interface MenuOptionItemProps
  extends HTMLChakraProps<"button", UseMenuOptionItemProps> {
  /**
   * @type React.ReactElement
   */
  icon?: React.ReactElement | null
  /**
   * @type SystemStyleObject["mr"]
   */
  iconSpacing?: SystemStyleObject["mr"]
}

export const MenuOptionItem = forwardRef<MenuOptionItemProps, "button">(
  function MenuOptionItem(props, ref) {
    const { icon, iconSpacing = "0.75rem", ...restProps } = props

    const api = useMenuContext()
    const group = useMenuGroupContext()
    const styles = useMenuStyles()

    const uid = useId()
    const id = props.id ?? `menuitem-${uid}`

    const optionProps = api.getOptionItemProps(
      {
        ...restProps,
        id,
        type: group.type,
        onClick: () => group.onChange(props.value!),
      },
      ref,
    )

    return (
      <chakra.button
        {...optionProps}
        className={cx("chakra-menu__menuitem-option", restProps.className)}
        css={[styles.item, props.css]}
      >
        {icon !== null && (
          <MenuIcon
            fontSize="0.8em"
            marginEnd={iconSpacing}
            opacity={props.isChecked ? 1 : 0}
          >
            {icon || <CheckIcon />}
          </MenuIcon>
        )}
        <span style={{ flex: 1 }}>{props.children}</span>
      </chakra.button>
    )
  },
)

MenuOptionItem.displayName = "MenuOptionItem"
