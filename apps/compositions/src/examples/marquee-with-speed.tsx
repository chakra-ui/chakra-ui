"use client"

import { For, Marquee, Span, Stack } from "@chakra-ui/react"
import {
  IoLogoFigma,
  IoLogoGitlab,
  IoLogoJavascript,
  IoLogoLinkedin,
  IoLogoTwitter,
  IoLogoVimeo,
} from "react-icons/io5"

const speeds = [
  { value: 25, label: "Slow (25px/s)" },
  { value: 50, label: "Normal (50px/s)" },
  { value: 100, label: "Fast (100px/s)" },
]

export const MarqueeWithSpeed = () => (
  <Stack gap="12">
    <For each={speeds}>
      {(speed) => (
        <Stack key={speed.value} gap="4">
          <Span fontWeight="medium" textStyle="sm">
            {speed.label}
          </Span>
          <Marquee.Root speed={speed.value}>
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
          </Marquee.Root>
        </Stack>
      )}
    </For>
  </Stack>
)

const items = [
  { icon: IoLogoFigma, label: "Figma", color: "#F24E1E" },
  { icon: IoLogoTwitter, label: "Twitter", color: "#1da1f2" },
  { icon: IoLogoLinkedin, label: "LinkedIn", color: "#0077b5" },
  { icon: IoLogoGitlab, label: "GitLab", color: "#fc6d26" },
  { icon: IoLogoVimeo, label: "Vimeo", color: "#1ab7ea" },
  { icon: IoLogoJavascript, label: "JavaScript", color: "#f7df1e" },
]
