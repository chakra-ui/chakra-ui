"use client"

import { Stack, Text } from "@chakra-ui/react"
import { Button } from "compositions/ui/button"
import { Skeleton } from "compositions/ui/skeleton"
import { useState } from "react"

export const SkeletonWithLoaded = () => {
  const [loaded, setLoaded] = useState(false)

  return (
    <Stack align="flex-start">
      <Skeleton height="6" loaded={loaded}>
        <Text>Chakra ui is cool</Text>
      </Skeleton>
      <Button size="sm" onClick={() => setLoaded((c) => !c)}>
        Toggle
      </Button>
    </Stack>
  )
}
