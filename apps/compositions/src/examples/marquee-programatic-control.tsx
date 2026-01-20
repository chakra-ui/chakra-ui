import { Marquee, useMarquee } from "@chakra-ui/react"

const items = [
  "Apple",
  "Banana",
  "Cherry",
  "Date",
  "Elderberry",
  "Fig",
  "Grape",
]

export const MarqueeProgrammaticControl = () => {
  const marquee = useMarquee()

  return (
    <>
      <Marquee.RootProvider value={marquee}>
        <Marquee.Viewport>
          <Marquee.Content>
            {items.map((item, i) => (
              <Marquee.Item key={i} style={{ padding: "0 2rem" }}>
                {item}
              </Marquee.Item>
            ))}
          </Marquee.Content>
        </Marquee.Viewport>
      </Marquee.RootProvider>

      <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
        <button onClick={() => marquee.pause()}>Pause</button>
        <button onClick={() => marquee.resume()}>Resume</button>
      </div>
    </>
  )
}
