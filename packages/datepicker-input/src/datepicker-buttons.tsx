import {
  Button,
  ButtonProps,
  IconButton,
  IconButtonProps,
} from "@chakra-ui/button"
import { CloseButton, CloseButtonProps } from "@chakra-ui/close-button"
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import { chakra, HTMLChakraProps, useStyles } from "@chakra-ui/system"
import { __DEV__ } from "@chakra-ui/utils"
import React, { FC } from "react"
import { useDatepickerInputContext } from "./datepicker-input-context"

type DatepickerButtonProps = Partial<Omit<IconButtonProps, "onChange">>

export const DatepickerCloseButton = (props: CloseButtonProps) => {
  const styles = useStyles()
  const { onClose } = useDatepickerInputContext()
  return (
    <CloseButton
      {...props}
      onClick={() => onClose()}
      __css={{ ...styles.closeButton }}
    />
  )
}

export const DatepickerPrevButton = (props: DatepickerButtonProps) => {
  const { goToPreviousMonths } = useDatepickerInputContext()
  return (
    <IconButton
      aria-label="Previous Month"
      size="sm"
      icon={<ChevronLeftIcon />}
      {...props}
      onClick={() => goToPreviousMonths()}
    />
  )
}

export const DatepickerNextButton = (props: DatepickerButtonProps) => {
  const { goToNextMonths } = useDatepickerInputContext()
  return (
    <IconButton
      aria-label="Next Month"
      size="sm"
      icon={<ChevronRightIcon />}
      {...props}
      onClick={() => goToNextMonths()}
    />
  )
}

export const DatepickerButtonsContainer: FC<HTMLChakraProps<"div">> = (
  props,
) => {
  const styles = useStyles()
  return (
    <chakra.div {...props} __css={styles.buttonsContainer}>
      {props.children}
    </chakra.div>
  )
}

export const DatepickerResetButton = (props: ButtonProps) => {
  const { onResetDates } = useDatepickerInputContext()

  return (
    <Button
      size="sm"
      {...props}
      onClick={onResetDates}
      onMouseUp={(e) => {
        e.currentTarget.blur()
      }}
    >
      {props.children || "Reset Dates"}
    </Button>
  )
}

export const DatepickerTodayButton = (props: ButtonProps) => {
  const { goToDate } = useDatepickerInputContext()

  return (
    <Button
      size="sm"
      {...props}
      onClick={() => goToDate(new Date())}
      onMouseUp={(e) => {
        e.currentTarget.blur()
      }}
    >
      {props.children || "Today"}
    </Button>
  )
}

if (__DEV__) {
  DatepickerCloseButton.displayName = "DatepickerCloseButton"
  DatepickerPrevButton.displayName = "DatepickerPrevButton"
  DatepickerNextButton.displayName = "DatepickerNextButton"
  DatepickerButtonsContainer.displayName = "DatepickerButtonsContainer"
}
