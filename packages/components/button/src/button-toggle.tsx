import { useState } from "react"
import { ButtonGroup } from "./button-group"
import { Button } from "./button"
import type { ButtonGroupProps } from "./button-group"

export interface ToggleButtonGroupProps
  extends Omit<ButtonGroupProps, "onChange"> {
  children: JSX.Element | JSX.Element[]
  initialIndex?: number
  allowNone?: boolean
  exclusive?: boolean
  onChange?: (v: string | number | JSX.Element | null) => any
}

export const ToggleButtonGroup = (
  props: ToggleButtonGroupProps,
): JSX.Element => {
  const {
    children,
    initialIndex,
    onChange,
    allowNone = true,
    exclusive = true,
    ...rest
  } = props

  const defaultIndex = allowNone ? -1 : 0

  const [currButton, setCurrButton] = useState<Set<number>>(
    new Set([initialIndex ?? defaultIndex]),
  )

  const getValue = (e: JSX.Element): string | number | JSX.Element => {
    if (e?.props?.value) {
      return e.props.value
    } else if (typeof e?.props?.children === "string") {
      return e.props.children
    } else {
      return e
    }
  }

  const handleValueChange = (idx: number) => {
    if (currButton.has(idx)) {
      const cannot_allow_none_and_one_in_set = !allowNone && currButton.size < 2

      if (cannot_allow_none_and_one_in_set) return

      if (onChange) {
        if (currButton.size < 2) {
          onChange(null)
        } else {
          Array.isArray(children)
            ? onChange(getValue(children[idx]))
            : onChange(getValue(children))
        }
      }
      setCurrButton((prev) => {
        prev.delete(idx)
        return new Set(prev)
      })
    } else {
      const exclusive_and_one_in_set = exclusive && currButton.size < 2
      if (exclusive_and_one_in_set) {
        setCurrButton(new Set([idx]))
      } else {
        setCurrButton((prev) => new Set(prev.add(idx)))
      }

      if (onChange) {
        Array.isArray(children)
          ? onChange(getValue(children[idx]))
          : onChange(getValue(children))
      }
    }
  }

  return (
    <ButtonGroup isAttached {...rest}>
      {Array.isArray(children) ? (
        children.map((element, idx) => (
          <ToggleButton
            key={idx}
            value={idx}
            selected={currButton.has(idx)}
            changeValue={handleValueChange}
          >
            {element}
          </ToggleButton>
        ))
      ) : (
        <ToggleButton
          value={0}
          selected={currButton.has(0)}
          changeValue={handleValueChange}
        >
          {children}
        </ToggleButton>
      )}
    </ButtonGroup>
  )
}

const ToggleButton = ({
  children,
  value,
  selected,
  changeValue,
}: {
  children: JSX.Element
  value: number
  selected: boolean
  changeValue: (new_val: number) => void
}) => {
  const { onClick, ...rest } = children.props

  const handleClick = () => {
    changeValue(value)
    if (onClick) onClick()
  }
  return (
    <Button
      {...rest}
      isActive={selected}
      overflowWrap={"break-word"}
      onClick={handleClick}
    />
  )
}
