import { PropGetter } from "@chakra-ui/react-utils"
import { ariaAttr } from "@chakra-ui/utils"
import { CSSProperties, useCallback, useMemo } from "react"
import { useMultiSliderContext } from "./multi-slider-context"

export function useMultiSliderRoot() {
  const { isDisabled } = useMultiSliderContext()

  const rootStyle = useMemo<CSSProperties>(
    () => ({
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      touchAction: "none",
      WebkitTapHighlightColor: "rgba(0,0,0,0)",
      userSelect: "none",
      outline: 0,
    }),
    [],
  )

  const getRootProps: PropGetter = useCallback(
    (props = {}, ref = null) => ({
      ...props,
      ref,
      tabIndex: -1,
      "aria-disabled": ariaAttr(isDisabled),
      style: {
        ...props.style,
        ...rootStyle,
      },
    }),
    [isDisabled, rootStyle],
  )
  return {
    getRootProps,
  }
}
