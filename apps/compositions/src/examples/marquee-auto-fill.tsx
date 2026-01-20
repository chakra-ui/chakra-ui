import { Marquee } from "@chakra-ui/react"
import { IoLogoMarkdown } from "react-icons/io5"

const items = [
  <IoLogoMarkdown size="3rem" color="red" />,
  <IoLogoMarkdown size="3rem" color="blue" />,
  <IoLogoMarkdown size="3rem" color="black" />,
  <IoLogoMarkdown size="3rem" color="green" />,
]

export const MarqueeAutoFill = () => (
  <Marquee.Root autoFill spacing="2rem">
    <Marquee.Viewport>
      <Marquee.Content>
        {items.map((item, i) => (
          <Marquee.Item key={i} style={{ padding: "0 2rem" }}>
            {item}
          </Marquee.Item>
        ))}
      </Marquee.Content>
    </Marquee.Viewport>
  </Marquee.Root>
)
