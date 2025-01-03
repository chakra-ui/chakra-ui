import { Slider as ChakraSlider, For, HStack } from "@chakra-ui/react"
import * as React from "react"

function _nullishCoalesce(lhs, rhsFn) {
  if (lhs != null) {
    return lhs
  } else {
    return rhsFn()
  }
}
function _optionalChain(ops) {
  let lastAccessLHS = undefined
  let value = ops[0]
  let i = 1
  while (i < ops.length) {
    const op = ops[i]
    const fn = ops[i + 1]
    i += 2
    if ((op === "optionalAccess" || op === "optionalCall") && value == null) {
      return undefined
    }
    if (op === "access" || op === "optionalAccess") {
      lastAccessLHS = value
      value = fn(value)
    } else if (op === "call" || op === "optionalCall") {
      value = fn((...args) => value.call(lastAccessLHS, ...args))
      lastAccessLHS = undefined
    }
  }
  return value
}

export const Slider = React.forwardRef(function Slider(props, ref) {
  const { marks: marksProp, label, showValue, ...rest } = props
  const value = _nullishCoalesce(props.defaultValue, () => props.value)

  const marks = _optionalChain([
    marksProp,
    "optionalAccess",
    (_2) => _2.map,
    "call",
    (_3) =>
      _3((mark) => {
        if (typeof mark === "number") return { value: mark, label: undefined }
        return mark
      }),
  ])

  const hasMarkLabel = !!_optionalChain([
    marks,
    "optionalAccess",
    (_4) => _4.some,
    "call",
    (_5) => _5((mark) => mark.label),
  ])

  return (
    <ChakraSlider.Root ref={ref} thumbAlignment="center" {...rest}>
      {label && !showValue && <ChakraSlider.Label>{label}</ChakraSlider.Label>}
      {label && showValue && (
        <HStack justify="space-between">
          <ChakraSlider.Label>{label}</ChakraSlider.Label>
          <ChakraSlider.ValueText />
        </HStack>
      )}
      <ChakraSlider.Control data-has-mark-label={hasMarkLabel || undefined}>
        <ChakraSlider.Track>
          <ChakraSlider.Range />
        </ChakraSlider.Track>
        <SliderThumbs value={value} />
        <SliderMarks marks={marks} />
      </ChakraSlider.Control>
    </ChakraSlider.Root>
  )
})

function SliderThumbs(props) {
  const { value } = props
  return (
    <For each={value}>
      {(_, index) => (
        <ChakraSlider.Thumb key={index} index={index}>
          <ChakraSlider.HiddenInput />
        </ChakraSlider.Thumb>
      )}
    </For>
  )
}

const SliderMarks = React.forwardRef(function SliderMarks(props, ref) {
  const { marks } = props
  if (!_optionalChain([marks, "optionalAccess", (_6) => _6.length])) return null

  return (
    <ChakraSlider.MarkerGroup ref={ref}>
      {marks.map((mark, index) => {
        const value = typeof mark === "number" ? mark : mark.value
        const label = typeof mark === "number" ? undefined : mark.label
        return (
          <ChakraSlider.Marker key={index} value={value}>
            <ChakraSlider.MarkerIndicator />
            {label}
          </ChakraSlider.Marker>
        )
      })}
    </ChakraSlider.MarkerGroup>
  )
})
