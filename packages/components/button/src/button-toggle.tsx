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
  onChange?: (v: (string | number | JSX.Element)[] | null) => any
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

  const defaultIndex = initialIndex ?? (allowNone ? undefined : 0)
  const [currButton, setCurrButton] = useState<Set<number | undefined>>(
    defaultIndex === undefined ? new Set() : new Set([defaultIndex]),
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

  const getSelectedValues = (
    selected: Set<number | undefined>,
  ): (string | number | JSX.Element)[] | null => {
    if (selected.size < 1) return null
    if (Array.isArray(children)) {
      return [...selected].map((idx) => getValue(children[idx as number]))
    } else {
      return [getValue(children)]
    }
  }

  const handleValueChange = (idx: number) => {
    if (currButton.has(idx)) {
      const cannot_allow_none_and_one_in_set = !allowNone && currButton.size < 2

      if (cannot_allow_none_and_one_in_set) return

      setCurrButton((prev) => {
        prev.delete(idx)

        if (onChange) onChange(getSelectedValues(prev))

        return new Set(prev)
      })
    } else {
      const exclusive_and_one_in_set = exclusive && currButton.size < 2

      if (exclusive_and_one_in_set) {
        const s = new Set([idx])

        setCurrButton(s)

        if (onChange) onChange(getSelectedValues(s))
      } else {
        setCurrButton((prev) => {
          const s = prev.add(idx)

          if (onChange) onChange(getSelectedValues(s))

          return new Set(s)
        })
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
