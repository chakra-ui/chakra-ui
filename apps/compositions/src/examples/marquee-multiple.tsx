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

const items = [
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
      <MarqueeRow items={items.slice(0, 7)} />
      <MarqueeRow items={items.slice(7)} reverse />
    </Stack>
  )
}

const MarqueeRow = ({
  items,
  reverse = false,
}: {
  items: any[]
  reverse?: boolean
}) => {
  return (
    <Marquee.Root
      style={reverse ? ({ "--marquee-direction": "reverse" } as any) : {}}
    >
      <Marquee.Viewport>
        <Marquee.Content
          style={{ animationDirection: reverse ? "reverse" : "normal" }}
        >
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
