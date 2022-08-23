# @chakra-ui/transition

## Installation

```sh
yarn add @chakra-ui/transition
# or
npm i @chakra-ui/transition
```

## Collapse

The Collapse component is used to create regions of content that can
expand/collapse with a simple animation. It helps to hide content that's not
immediately relevant to the user.

## Import component

```jsx
import { Collapse } from "@chakra-ui/transition"
```

## Usage

```jsx
function SampleSpring() {
  const { isOpen, onToggle } = useDisclosure()
  return (
    <>
      <Button onClick={onToggle}>Click</Button>
      <Collapse in={isOpen}>
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
        terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
        labore wes anderson cred nesciunt sapiente ea proident.
      </Collapse>
    </>
  )
}
```

## Changing the starting height

```jsx
function Example() {
  const [show, setShow] = React.useState(false)

  const handleToggle = () => setShow(!show)

  return (
    <>
      <Collapse startingHeight={20} in={show}>
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
        terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
        labore wes anderson cred nesciunt sapiente ea proident.
      </Collapse>
      <Button size="sm" onClick={handleToggle} mt="1rem">
        Show {show ? "Less" : "More"}
      </Button>
    </>
  )
}
```

// TODO: Explain the `framer-motion` part and how to customize the motion
variants
