/**
 * 📝 Notes for Contributors:
 *
 * - When creating an interactive component, we recommend creating hooks that
 * handles accessibility, state management, and behavior concerns.
 *
 * - Hooks should return prop-getters and some state information.
 *
 * > If you're not creating an interactive component, you can delete this file.
 *
 * @see https://chakra-ui.com/guides/component-guide
 */

import * as React from "react"

export interface UseRatingProps {
  value: number
  hoveredValue: number
}

export function useRating(props: UseRatingProps) {
  const [rating, setRating] = React.useState(props.value)
  const [hoveredRating, setHoveredRating] = React.useState(props.hoveredValue)
  const handleClick = React.useCallback(
    (idx: number) => {
      if (!isNaN(idx)) {
        if (rating === 1 && idx === 1) {
          setRating(0)
        } else if (rating === idx) {
          setRating(idx - 1)
        } else {
          setRating(idx)
        }
      }
    },
    [rating],
  )

  const handleHover = React.useCallback(
    (idx: number) => {
      if (!isNaN(idx)) {
        setHoveredRating(idx)
      }
    },
    [hoveredRating],
  )

  return {
    rating,
    hoveredRating,
    handleClick,
    handleHover,
  }
}

export type UseRatingReturn = ReturnType<typeof useRating>
