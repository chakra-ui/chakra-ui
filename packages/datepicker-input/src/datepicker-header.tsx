import { chakra, HTMLChakraProps, useStyles } from "@chakra-ui/system"
import { __DEV__ } from "@chakra-ui/utils"
import React, { FC } from "react"

export const DatepickerHeader: FC<HTMLChakraProps<"div">> = (props) => {
  const styles = useStyles()
  return (
    <chakra.div {...props} __css={styles.header}>
      {props.children}
    </chakra.div>
  )
}

if (__DEV__) {
  DatepickerHeader.displayName = "DatepickerHeader"
}
