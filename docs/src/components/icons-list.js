import React from "react"
import { Grid, Flex, Text } from "@chakra-ui/core"
import * as chakraIcons from "@chakra-ui/icons"

const IconsList = () => {
  return (
    <Grid
      mt={7}
      gap={5}
      templateColumns="repeat( auto-fit, minmax(120px, 1fr) )"
    >
      {Object.keys(chakraIcons).map((key, i) => {
        const Component = chakraIcons[key]
        return (
          <Flex
            p={3}
            key={i}
            align="center"
            borderRadius="md"
            borderWidth="1px"
            flexDir="column"
            justify="center"
          >
            <Text mt={2} fontSize="sm" textAlign="center">
              {`<${key}/>`}
            </Text>
          </Flex>
        )
      })}
    </Grid>
  )
}

export default IconsList
