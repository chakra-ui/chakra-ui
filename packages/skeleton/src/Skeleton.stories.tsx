import * as React from "react"
import { Skeleton } from "."
import { chakra, DarkMode } from "@chakra-ui/system"
import { Stack } from "@chakra-ui/layout"

export default {
  title: "Skeleton",
  decorators: [
    (story: Function) => (
      <chakra.div maxWidth="md" mt="40px" mx="auto">
        {story()}
      </chakra.div>
    ),
  ],
}

export const Basic = () => <Skeleton height="20px" />

export const AsContainer = () => (
  <Skeleton>
    <span>Chakra ui is cool</span>
  </Skeleton>
)

export const IsLoaded = () => {
  const [isLoaded, setLoaded] = React.useState(false)

  React.useEffect(() => {
    setTimeout(() => setLoaded(true), 1000)
  }, [])

  return (
    <Skeleton isLoaded={isLoaded}>
      <span>Chakra ui is cool</span>
    </Skeleton>
  )
}

export const FadeIn = () => {
  const [isLoaded, setLoaded] = React.useState(false)
  React.useEffect(() => {
    setTimeout(() => setLoaded(true), 1000)
  }, [])

  return (
    <Skeleton fadeInDuration={0} isLoaded={isLoaded}>
      <span>Chakra ui is cool</span>
    </Skeleton>
  )
}

export const WithBorderRadius = () => (
  <Skeleton boxSize="100px" borderRadius="100px" />
)

export const WithIsLoaded = () => {
  const [isLoaded, setLoaded] = React.useState(false)
  React.useEffect(() => {
    const intervalId = setInterval(() => setLoaded(x => !x), 1000)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <chakra.div>
      <chakra.div height="100px" borderWidth="1px">
        Content
      </chakra.div>
      <Skeleton width="100px" isLoaded={isLoaded}>
        <span>Chakra ui is cool</span>
      </Skeleton>
      <chakra.div height="100px" borderWidth="1px">
        Content
      </chakra.div>
    </chakra.div>
  )
}

export const WithCustomSpeed = () => (
  <Skeleton boxSize="100px" speed={2.4} borderRadius="100px" />
)

export const WithDarkMode = () => (
  <DarkMode>
    <Stack>
      <chakra.p>Some text</chakra.p>
      <Skeleton boxSize="100px" />
      <Skeleton boxSize="100px" />
      <Skeleton boxSize="100px" />
    </Stack>
  </DarkMode>
)
