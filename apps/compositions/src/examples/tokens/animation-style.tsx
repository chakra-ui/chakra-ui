"use client"

import { Button, Center, For, HStack, Stack } from "@chakra-ui/react"
import { useState } from "react"

export const TokensAnimationStyle = () => {
  const [animation, setAnimation] = useState<string | undefined>(undefined)
  return (
    <Stack gap="8" mb="8" align="flex-start">
      <HStack wrap="wrap">
        <For
          each={[
            "slide-fade-in",
            "slide-fade-out",
            "scale-fade-in",
            "scale-fade-out",
          ]}
        >
          {(animation) => (
            <Button
              size="sm"
              variant="outline"
              key={animation}
              onClick={() => setAnimation(animation)}
            >
              {animation}
            </Button>
          )}
        </For>
      </HStack>

      <Center
        width="240px"
        height="240px"
        animationDuration="slowest"
        animationStyle={animation}
        onAnimationEnd={() => setAnimation(undefined)}
        bg="bg"
        data-placement="bottom"
        borderWidth="1px"
        p="4"
      >
        Animation
      </Center>
    </Stack>
  )
}
