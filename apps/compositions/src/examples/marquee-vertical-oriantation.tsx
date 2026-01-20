import { Marquee } from "@chakra-ui/react"

const items = [
  "Apple",
  "Banana",
  "Cherry",
  "Date",
  "Elderberry",
  "Fig",
  "Grape",
]

export const MarqueeVertical = () => (
  <Marquee.Root side="bottom">
    <Marquee.Viewport style={{ height: "300px" }}>
      <Marquee.Content>
        {items.map((item, i) => (
          <Marquee.Item key={i} style={{ padding: "1rem 0" }}>
            {item}
          </Marquee.Item>
        ))}
      </Marquee.Content>
    </Marquee.Viewport>
  </Marquee.Root>
)
