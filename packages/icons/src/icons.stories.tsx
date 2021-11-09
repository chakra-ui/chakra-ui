import React from "react"
import { isFunction } from "@chakra-ui/utils"
import * as AllIcons from "."
import type { IconProps } from "."

export default {
  title: "Components / Media and Icons / Icons",
}

export const allIcons = () => (
  <>
    {Object.entries(AllIcons).map(
      ([iconName, IconComponent]) =>
        isFunction<React.FC<IconProps>>(IconComponent) && (
          <React.Fragment key={iconName}>
            <IconComponent boxSize="40px" />
          </React.Fragment>
        ),
    )}
  </>
)
