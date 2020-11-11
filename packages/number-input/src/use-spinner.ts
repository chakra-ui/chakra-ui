import { useInterval, useUnmountEffect } from "@chakra-ui/hooks"
import { useCallback, useRef, useState } from "react"

/**
 * When click and hold on a button - the speed of auto changing the value.
 */
const CONTINUOUS_CHANGE_INTERVAL = 50

/**
 * When click and hold on a button - the delay before auto changing the value.
 */
const CONTINUOUS_CHANGE_DELAY = 300

type Action = "increment" | "decrement"

/**
 * React hook used in the number input to spin its
 * value on long press of the spin buttons
 *
 * @param increment the function to increment
 * @param decrement the function to decrement
 */
export function useSpinner(increment: Function, decrement: Function) {
  /**
   * To keep incrementing/decrementing on press, we call that `spinning`
   */
  const [isSpinning, setIsSpinning] = useState(false)

  // This state keeps track of the action ("increment" or "decrement")
  const [action, setAction] = useState<Action | null>(null)

  // To increment the value the first time you mousedown, we call that `runOnce`
  const [runOnce, setRunOnce] = useState(true)

  // Store the timeout instance id in a ref, so we can clear the timeout later
  const timeoutRef = useRef<any>(null)

  // Clears the timeout from memory
  const removeTimeout = () => clearTimeout(timeoutRef.current)

  /**
   * useInterval hook provides a performant way to
   * update the state value at specific interval
   */
  useInterval(
    () => {
      if (action === "increment") {
        increment()
      }
      if (action === "decrement") {
        decrement()
      }
    },
    isSpinning ? CONTINUOUS_CHANGE_INTERVAL : null,
  )

  // Function to activate the spinning and increment the value
  const up = useCallback(() => {
    // increment the first fime
    if (runOnce) {
      increment()
    }

    // after a delay, keep incrementing at interval ("spinning up")
    timeoutRef.current = setTimeout(() => {
      setRunOnce(false)
      setIsSpinning(true)
      setAction("increment")
    }, CONTINUOUS_CHANGE_DELAY)
  }, [increment, runOnce])

  // Function to activate the spinning and increment the value
  const down = useCallback(() => {
    // decrement the first fime
    if (runOnce) {
      decrement()
    }

    // after a delay, keep decrementing at interval ("spinning down")
    timeoutRef.current = setTimeout(() => {
      setRunOnce(false)
      setIsSpinning(true)
      setAction("decrement")
    }, CONTINUOUS_CHANGE_DELAY)
  }, [decrement, runOnce])

  // Function to stop spinng (useful for mouseup, keyup handlers)
  const stop = useCallback(() => {
    setRunOnce(true)
    setIsSpinning(false)
    removeTimeout()
  }, [])

  /**
   * If the component unmounts while spinning,
   * let's clear the timeout as well
   */
  useUnmountEffect(removeTimeout)

  return { up, down, stop }
}
