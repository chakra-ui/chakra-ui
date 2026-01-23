"use client"
import { Marquee, Stack } from "@chakra-ui/react"
import {
  IoLogoAmazon,
  IoLogoAndroid,
  IoLogoAngular,
  IoLogoBehance,
  IoLogoFigma,
  IoLogoGitlab,
  IoLogoJavascript,
  IoLogoLinkedin,
  IoLogoNodejs,
  IoLogoPython,
  IoLogoReact,
  IoLogoTwitter,
  IoLogoVimeo,
  IoLogoVue,
} from "react-icons/io5"
import type { IconType } from "react-icons/lib"

interface Item {
  icon: IconType
  color: string
}

const items: Item[] = [
  { icon: IoLogoBehance, color: "#1769ff" },
  { icon: IoLogoFigma, color: "#F24E1E" },
  { icon: IoLogoTwitter, color: "#1da1f2" },
  { icon: IoLogoLinkedin, color: "#0077b5" },
  { icon: IoLogoReact, color: "#61dafb" },
  { icon: IoLogoNodejs, color: "#339933" },
  { icon: IoLogoPython, color: "#3776ab" },
  { icon: IoLogoAngular, color: "#dd0031" },
  { icon: IoLogoAmazon, color: "#FF9900" },
  { icon: IoLogoGitlab, color: "#fc6d26" },
  { icon: IoLogoVimeo, color: "#1ab7ea" },
  { icon: IoLogoVue, color: "#42b883" },
  { icon: IoLogoJavascript, color: "#f7df1e" },
  { icon: IoLogoAndroid, color: "#3ddc84" },
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
    <Marquee.Root reverse={reverse}>
      <Marquee.Viewport>
        <Marquee.Content>
          {items.map((item, i) => (
            <Marquee.Item key={i} style={{ padding: "0 2rem" }}>
              <item.icon size="3rem" color={item.color} />
            </Marquee.Item>
          ))}
        </Marquee.Content>
      </Marquee.Viewport>
    </Marquee.Root>
  )
}
