"use client"

import { mergeRefs, useControllableState } from "@chakra-ui/hooks"
import type {
  ButtonProps,
  GroupProps,
  InputProps,
  StackProps,
} from "@chakra-ui/react"
import { Box, HStack, IconButton, Input, Stack } from "@chakra-ui/react"
import { forwardRef, useRef } from "react"
import { LuEye, LuEyeOff } from "react-icons/lu"
import { InputGroup } from "./input-group"

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

    const inputRef = useRef<HTMLInputElement>(null)

    return (
      <InputGroup
        endElement={
          <VisibilityTrigger
            disabled={rest.disabled}
            onPointerDown={(e) => {
              e.preventDefault()
              setVisible(!visible)
            }}
          >
            {visible ? <LuEyeOff /> : <LuEye />}
          </VisibilityTrigger>
        }
      >
        <Input
          {...rest}
          ref={mergeRefs(ref, inputRef)}
          type={visible ? "text" : "password"}
        />
      </InputGroup>
    )
  },
)

const VisibilityTrigger = forwardRef<HTMLButtonElement, ButtonProps>(
  function VisibilityTrigger(props, ref) {
    return (
      <IconButton
        tabIndex={-1}
        ref={ref}
        me="-2"
        size="sm"
        color="fg.muted/80"
        variant="ghost"
        aria-label="Toggle password visibility"
        {...props}
      />
    )
  },
)

interface PasswordStrengthMeterProps extends StackProps {
  max?: number
  value: number
}

export const PasswordStrengthMeter = forwardRef<
  HTMLDivElement,
  PasswordStrengthMeterProps
>(function PasswordStrengthMeter(props, ref) {
  const { max = 4, value, ...rest } = props

  const percent = (value / max) * 100
  const { label, colorPalette } = getColorPalette(percent)

  return (
    <Stack align="flex-end" gap="1" ref={ref} {...rest}>
      <HStack width="full" ref={ref} {...rest}>
        {Array.from({ length: max }).map((_, index) => (
          <Box
            key={index}
            height="1"
            flex="1"
            rounded="sm"
            data-selected={index < value ? "" : undefined}
            layerStyle="fill.muted"
            colorPalette="gray"
            _selected={{
              colorPalette,
              layerStyle: "fill.solid",
            }}
          />
        ))}
      </HStack>
      {label && <HStack textStyle="xs">{label}</HStack>}
    </Stack>
  )
})

function getColorPalette(percent: number) {
  switch (true) {
    case percent < 33:
      return { label: "Low", colorPalette: "red" }
    case percent < 66:
      return { label: "Medium", colorPalette: "orange" }
    default:
      return { label: "High", colorPalette: "green" }
  }
}
