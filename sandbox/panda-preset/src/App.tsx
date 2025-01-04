import { css } from "../styled-system/css"
import { center, hstack, vstack } from "../styled-system/patterns"
import { badge, button, heading } from "../styled-system/recipes"

function App() {
  return (
    <div
      className={center({ padding: "4", colorPalette: "pink", minH: "dvh" })}
    >
      <div className={vstack({ gap: "4" })}>
        <h1 className={heading({ size: "3xl" })}>Panda 🐼 + Chakra UI ⚡️</h1>
        <div className={css({ textStyle: "sm", color: "fg.muted" })}>
          This is a panda preset for Chakra UI{" "}
          <span className={badge({ variant: "solid" })}>New</span>
        </div>
        <div className={hstack()}>
          <button className={button({ variant: "solid" })}>Click me</button>
          <button className={button({ variant: "subtle" })}>Click me</button>
        </div>
      </div>
    </div>
  )
}

export default App
