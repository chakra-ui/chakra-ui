"use client"
import { Box, Marquee, Text } from "@chakra-ui/react"
import { useEffect, useRef } from "react"

export const MarqueeVelocity = () => {
  return (
    <Box height="30vh" pt="10">
      <Text textAlign="center" mb="10" color="gray.500">
        Scroll down quickly to see effect
      </Text>
      <VelocityRow baseSpeed={0.05}>Chakra-UI Velocity</VelocityRow>
      <VelocityRow baseSpeed={-0.05}>Marquee Component Velocity</VelocityRow>
    </Box>
  )
}

const VelocityRow = ({
  children,
  baseSpeed = 0.05,
}: {
  children: string
  baseSpeed: number
}) => {
  const contentRef = useRef<HTMLDivElement>(null)

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
      if (!contentRef.current) return
      scrollVelocity.current *= 0.95
      let moveBy = baseSpeed + scrollVelocity.current
      position.current += moveBy
      if (position.current <= -50) {
        position.current = 0
      } else if (position.current >= 0) {
        position.current = -50
      }

      contentRef.current.style.transform = `translate3d(${position.current}%, 0, 0)`

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
    <Marquee.Root>
      <Marquee.Viewport>
        <Marquee.Content
          ref={contentRef}
          style={{
            animation: "none",
            width: "200%",
            display: "flex",
          }}
        >
          {[...Array(4)].map((_, i) => (
            <Marquee.Item
              key={i}
              style={{
                width: "25%", // Each item is 1/4 of the 200% container
                flexShrink: 0,
                padding: "0 2rem",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Text
                fontSize="8xl"
                fontWeight="900"
                textTransform="uppercase"
                lineHeight="0.8"
                whiteSpace="nowrap"
              >
                {children}
              </Text>
            </Marquee.Item>
          ))}
        </Marquee.Content>
      </Marquee.Viewport>
    </Marquee.Root>
  )
}
