import { Grid, Text, VStack } from "@chakra-ui/layout"
import * as React from "react"
import type { IconProps } from "../src"
import * as AllIcons from "../src"

export default {
  title: "Components / Media and Icons / Icons",
}

export const Icons = () => (
  <Grid gap="8" gridTemplateColumns="repeat(auto-fill, minmax(8rem, 1fr))">
    {Object.entries(AllIcons).map(([key, value]) => {
      if (key === "createIcon") {
        return null
      }

      const IconComponent = value as React.FC<IconProps>

      return (
        <React.Fragment key={key}>
          <VStack spacing="3">
            <IconComponent boxSize="40px" />
            <Text>{key}</Text>
          </VStack>
        </React.Fragment>
      )
    })}
  </Grid>
)
