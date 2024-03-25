import { useBoolean } from "@chakra-ui/hooks"
import { SlideFade, SlideFadeProps } from "../src/components/transition"

export default {
  title: "Transition / Slide Fade",
}

const Example = (props: SlideFadeProps) => {
  const [open, { toggle }] = useBoolean(false)
  return (
    <>
      <button onClick={toggle}>Toggle Slide</button>
      <SlideFade
        in={open}
        {...props}
        style={{
          maxWidth: 400,
          background: "red",
          padding: 30,
          ...props.style,
        }}
      >
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </SlideFade>
    </>
  )
}

export const Basic = () => <Example />

export const WithCustomTransition = () => (
  <Example transition={{ enter: { duration: 0.3 }, exit: { duration: 0.5 } }} />
)

export const WithTransitionEnd = () => (
  <Example
    style={{ display: "block" }}
    transitionEnd={{ exit: { display: "none" } }}
  />
)

export const WithoutReverseProp = () => (
  <Example
    reverse={false}
    style={{ display: "block" }}
    transitionEnd={{ exit: { display: "none" } }}
  />
)
