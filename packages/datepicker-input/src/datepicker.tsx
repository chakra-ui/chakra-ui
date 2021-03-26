import { useBoolean } from "@chakra-ui/hooks"
import { Portal } from "@chakra-ui/portal"
import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  StylesProvider,
  useMultiStyleConfig,
} from "@chakra-ui/system"
import { SlideFade } from "@chakra-ui/transition"
import { __DEV__ } from "@chakra-ui/utils"
import { AnimatePresence } from "framer-motion"
import React, { useEffect, useRef } from "react"
import {
  DatepickerButtonsContainer,
  DatepickerCloseButton,
  DatepickerNextButton,
  DatepickerPrevButton,
  DatepickerResetButton,
  DatepickerTodayButton,
} from "./datepicker-buttons"
import { DatepickerFooter } from "./datepicker-footer"
import { DatepickerHeader } from "./datepicker-header"
import { useDatepickerInputContext } from "./datepicker-input-context"
import { DatepickerMonth } from "./datepicker-month"

export interface DatepickerProps extends HTMLChakraProps<"div"> {}

export const Datepicker = forwardRef<DatepickerProps, "div">((props, ref) => {
  const styles = useMultiStyleConfig("Datepicker", props)

  const { isOpen, containerRef } = useDatepickerInputContext()

  /**
   * This is hacky, because the SlideFade just lowers the opacity
   * and doesn't really remove the object, so an extra hide show is
   * set in order to close on delay, so the animation can finish
   */

  const [show, setShow] = useBoolean(isOpen)

  const timeoutRef = useRef<any>(null)

  useEffect(() => {
    if (!isOpen) {
      timeoutRef.current = setTimeout(() => {
        setShow.off()
      }, 200)
    } else {
      setShow.on()
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [isOpen, setShow])

  return (
    <StylesProvider value={styles}>
      <AnimatePresence>
        {show && (
          <Portal containerRef={containerRef}>
            <chakra.div
              __css={{
                position: "absolute",
                zIndex: 1,
              }}
            >
              <SlideFade in={isOpen} offsetY={-8}>
                <chakra.div
                  {...props}
                  ref={ref}
                  __css={{
                    ...styles.container,
                  }}
                >
                  {props.children || (
                    <>
                      <DatepickerHeader>
                        <DatepickerButtonsContainer>
                          <DatepickerPrevButton />
                          <DatepickerNextButton />
                        </DatepickerButtonsContainer>
                        <DatepickerCloseButton />
                      </DatepickerHeader>
                      <DatepickerMonth />
                      <DatepickerFooter>
                        <DatepickerResetButton />
                        <DatepickerTodayButton />
                      </DatepickerFooter>
                    </>
                  )}
                </chakra.div>
              </SlideFade>
            </chakra.div>
          </Portal>
        )}
      </AnimatePresence>
    </StylesProvider>
  )
})

if (__DEV__) {
  Datepicker.displayName = "Datepicker"
}
