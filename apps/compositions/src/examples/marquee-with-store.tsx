"use client"

import {
  Button,
  ButtonGroup,
  Marquee,
  Stack,
  useMarquee,
} from "@chakra-ui/react"
import {
  IoLogoFigma,
  IoLogoGitlab,
  IoLogoJavascript,
  IoLogoLinkedin,
  IoLogoTwitter,
  IoLogoVimeo,
} from "react-icons/io5"
import { LuPause, LuPlay } from "react-icons/lu"

export const MarqueeWithStore = () => {
  const marquee = useMarquee()

  return (
    <Stack gap="8">
      <Marquee.RootProvider value={marquee}>
        <Marquee.Viewport>
          <Marquee.Content>
            {items.map((item, i) => (
              <Marquee.Item key={i} px="2rem">
                {item.icon && (
                  <item.icon
                    size="3rem"
                    aria-label={item.label}
                    color={item.color}
                  />
                )}
              </Marquee.Item>
            ))}
          </Marquee.Content>
        </Marquee.Viewport>
      </Marquee.RootProvider>

      <ButtonGroup size="sm" variant="outline">
        <Button hidden={marquee.paused} onClick={() => marquee.pause()}>
          <LuPause /> Pause
        </Button>
        <Button hidden={!marquee.paused} onClick={() => marquee.resume()}>
          <LuPlay />
          Resume
        </Button>
      </ButtonGroup>
    </Stack>
  )
}

const items = [
  { icon: IoLogoFigma, label: "Figma", color: "#F24E1E" },
  { icon: IoLogoTwitter, label: "Twitter", color: "#1da1f2" },
  { icon: IoLogoLinkedin, label: "LinkedIn", color: "#0077b5" },
  { icon: IoLogoGitlab, label: "GitLab", color: "#fc6d26" },
  { icon: IoLogoVimeo, label: "Vimeo", color: "#1ab7ea" },
  { icon: IoLogoJavascript, label: "JavaScript", color: "#f7df1e" },
]
