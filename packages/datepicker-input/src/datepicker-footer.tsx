import { chakra, HTMLChakraProps, useStyles } from "@chakra-ui/system"
import { __DEV__ } from "@chakra-ui/utils"
import React, { FC } from "react"

export const DatepickerFooter: FC<HTMLChakraProps<"div">> = (props) => {
  const styles = useStyles()
  return (
    <chakra.div {...props} __css={styles.footer}>
      {props.children}
    </chakra.div>
  )
}

if (__DEV__) {
  DatepickerFooter.displayName = "DatepickerFooter"
}
