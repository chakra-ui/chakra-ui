# Collapse

The Collapse component is used to create regions of content that can
expand/collapse with a simple animation. It helps to hide content that's not
immediately relevant to the user.

## Installation

```sh
yarn add @chakra-ui/collapse

# or

npm i @chakra-ui/collapse
```

## Import component

```jsx
import { Collapse } from "@chakra-ui/collapse"
```

## Usage

```jsx
function SampleSpring() {
  const { isOpen, onToggle } = useDisclosure()
  return (
    <>
      <Button onClick={onToggle}>Click</Button>
      <Collapse isOpen={isOpen}>
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
      <Collapse startingHeight={20} isOpen={show}>
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
