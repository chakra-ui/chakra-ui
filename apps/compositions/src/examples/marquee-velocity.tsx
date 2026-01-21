import { Box, Flex, Text } from "@chakra-ui/react"
import { useEffect, useRef } from "react"

export const MarqueeVelocity = () => {
  return (
    <Box height="200vh" pt="10">
      <Text textAlign="center" mb="10" color="gray.500">
        Scroll down quickly to see effect
      </Text>
      <VelocityRow baseSpeed={1}>Vanilla React Velocity</VelocityRow>

      <VelocityRow baseSpeed={-1}>Performance Optimized</VelocityRow>
    </Box>
  )
}

const VelocityRow = ({
  children,
  baseSpeed = 2,
}: {
  children: string
  baseSpeed: number
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const position = useRef(0)
  const scrollVelocity = useRef(0)
  const lastScrollY = useRef(0)
  const rafId = useRef<number | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const delta = currentScrollY - lastScrollY.current

      scrollVelocity.current += delta * 0.5
      lastScrollY.current = currentScrollY
    }

    const animate = () => {
      if (!containerRef.current) return

      scrollVelocity.current *= 0.95

      let moveBy = baseSpeed + scrollVelocity.current

      position.current += moveBy

      if (position.current <= -50) {
        position.current = 0
      } else if (position.current >= 0) {
        position.current = -50
      }
      containerRef.current.style.transform = `translate3d(${position.current}%, 0, 0)`

      rafId.current = requestAnimationFrame(animate)
    }

    window.addEventListener("scroll", handleScroll)
    rafId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [baseSpeed])

  return (
    <Box overflow="hidden" whiteSpace="nowrap" mb={4}>
      <Flex ref={containerRef} width="200%" style={{ willChange: "transform" }}>
        {[...Array(4)].map((_, i) => (
          <Text
            key={i}
            flexShrink={0}
            width="25%"
            fontSize="8xl"
            fontWeight="900"
            textTransform="uppercase"
            lineHeight="0.8"
            px={4}
          >
            {children}
          </Text>
        ))}
      </Flex>
    </Box>
  )
}
