import { css } from "../styled-system/css"
import { center, hstack, vstack } from "../styled-system/patterns"
import { avatar, badge, button, card, heading } from "../styled-system/recipes"

function MyAvatar(props: { src: string }) {
  const classes = avatar({ size: "2xl" })
  return (
    <div className={classes.root}>
      <img
        src={props.src}
        alt="Random placeholder image"
        className={classes.image}
      />
    </div>
  )
}

function MyCard(props: { children: React.ReactNode }) {
  const classes = card({ size: "lg", variant: "outline" })
  return (
    <div className={classes.root}>
      <div className={classes.body}>{props.children}</div>
    </div>
  )
}

function App() {
  return (
    <div
      className={center({ padding: "4", colorPalette: "pink", minH: "dvh" })}
    >
      <div className={vstack({ gap: "4" })}>
        <MyAvatar src="https://i.pravatar.cc/300?u=8" />
        <h1 className={heading({ size: "3xl" })}>Panda 🐼 + Chakra UI ⚡️</h1>
        <div className={css({ textStyle: "sm", color: "fg.muted" })}>
          This is a panda preset for Chakra UI{" "}
          <span className={badge({ variant: "solid" })}>New</span>
        </div>
        <div className={hstack()}>
          <button className={button({ variant: "solid" })}>Click me</button>
          <button className={button({ variant: "subtle" })}>Click me</button>
        </div>

        <MyCard>This is a card</MyCard>
      </div>
    </div>
  )
}

export default App
