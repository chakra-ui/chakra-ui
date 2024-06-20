"use client"

import { useControllableState } from "@chakra-ui/hooks"
import type { GroupProps, InputProps } from "@chakra-ui/react"
import {
  Group,
  IconButton,
  Input,
  InputElement,
  createIcon,
} from "@chakra-ui/react"
import { forwardRef } from "react"

interface VisibilityProps {
  defaultVisible?: boolean
  visible?: boolean
  onVisibleChange?: (visible: boolean) => void
}

export interface PasswordInputProps extends InputProps, VisibilityProps {
  rootProps?: GroupProps
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput(props, ref) {
    const {
      rootProps,
      defaultVisible,
      visible: visibleProp,
      onVisibleChange,
      ...rest
    } = props

    const [visible, setVisible] = useControllableState({
      value: visibleProp,
      defaultValue: defaultVisible,
      onChange: onVisibleChange,
    })

    const handleClick = () => setVisible(!visible)

    return (
      <Group {...rootProps}>
        <Input
          paddingEnd="4.5rem"
          {...rest}
          ref={ref}
          type={visible ? "text" : "password"}
        />
        <InputElement placement="end">
          <IconButton disabled={rest.disabled} onClick={handleClick}>
            {visible ? <EyeOffIcon /> : <EyeOnIcon />}
          </IconButton>
        </InputElement>
      </Group>
    )
  },
)

const EyeOffIcon = createIcon({
  d: "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21",
})

const EyeOnIcon = createIcon({
  d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
})
