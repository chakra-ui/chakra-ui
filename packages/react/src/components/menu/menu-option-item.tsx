"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef, useId } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import {
  OptionItemStateProvider,
  useMenuContext,
  useMenuGroupContext,
  useMenuStyles,
} from "./menu-context"
import { UseMenuOptionItemProps } from "./use-menu"

export interface MenuOptionItemProps
  extends HTMLChakraProps<"button", UseMenuOptionItemProps> {}

export const MenuOptionItem = forwardRef<
  HTMLButtonElement,
  MenuOptionItemProps
>(function MenuOptionItem(props, ref) {
  const api = useMenuContext()
  const group = useMenuGroupContext()
  const styles = useMenuStyles()

  const uid = useId()
  const id = props.id ?? `menuitem-${uid}`

  const optionProps = api.getOptionItemProps(
    {
      ...props,
      id,
      type: group.type,
      checked: group.checked(props.value!),
      onClick: () => group.setValue(props.value!),
    },
    ref,
  )

  return (
    <OptionItemStateProvider
      value={{ checked: group.checked(props.value!), type: group.type }}
    >
      <chakra.button
        {...optionProps}
        className={cx("chakra-menu__menuitem-option", props.className)}
        css={[styles.item, props.css]}
      />
    </OptionItemStateProvider>
  )
})

MenuOptionItem.displayName = "MenuOptionItem"
