import { chakra } from "@chakra-ui/system"
import React, { FC } from "react"

export const DatepickerInputsRow: FC = (props) => {
  return (
    <chakra.div
      {...props}
      __css={{
        display: "flex",
        columnGap: 4,
        direction: ["column", "row"],
      }}
    >
      {props.children}
    </chakra.div>
  )
}
