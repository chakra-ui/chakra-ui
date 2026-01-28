"use client"

import { Marquee, Stack } from "@chakra-ui/react"
import {
  IoLogoFigma,
  IoLogoGitlab,
  IoLogoJavascript,
  IoLogoLinkedin,
  IoLogoTwitter,
  IoLogoVimeo,
} from "react-icons/io5"
import type { IconType } from "react-icons/lib"

interface Item {
  icon: IconType
  color: string
}

const items: Item[] = [
  { icon: IoLogoFigma, color: "#F24E1E" },
  { icon: IoLogoTwitter, color: "#1da1f2" },
  { icon: IoLogoLinkedin, color: "#0077b5" },
  { icon: IoLogoGitlab, color: "#fc6d26" },
  { icon: IoLogoVimeo, color: "#1ab7ea" },
  { icon: IoLogoJavascript, color: "#f7df1e" },
]

export const MarqueeMultiple = () => {
  return (
    <Stack gap="8" py="8">
      <MarqueeRow items={items} />
      <MarqueeRow items={items} reverse />
    </Stack>
  )
}

interface MarqueeRowProps {
  items: Item[]
  reverse?: boolean
}

const MarqueeRow = (props: MarqueeRowProps) => {
  const { items, reverse = false } = props
  return (
    <Marquee.Root reverse={reverse} autoFill>
      <Marquee.Viewport>
        <Marquee.Content>
          {items.map((item, i) => (
            <Marquee.Item key={i} px="2rem">
              <item.icon size="3rem" color={item.color} />
            </Marquee.Item>
          ))}
        </Marquee.Content>
      </Marquee.Viewport>
    </Marquee.Root>
  )
}
