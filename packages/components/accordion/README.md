# @chakra-ui/accordion

An accordion is a vertically stacked set of interactive headings that each
contain a title or content snippet representing a section of content.

The headings function as controls that enable users to reveal or hide their
associated sections of content.

## Installation

```sh
yarn add @chakra-ui/accordion

# or

npm i @chakra-ui/accordion
```

## Import Components

```jsx
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@chakra-ui/accordion"
```

## Component:

- `Accordion`: manages the global state of all opened accordion items via
  context.
- `AccordionItem`: manages the state for a single accordion item.
- `AccordionButton`: the trigger to open/close an accordion item.
- `AccordionPanel`: the main content area for the accordion item.

## Usage

By default, only one accordion can be visible at a time, and it can't be
toggled.

**Note 🚨**: Each accordion button must be wrapped in a heading tag, that is
appropriate for the information architecture of the page.

```jsx
<Accordion>
  <AccordionItem>
    <h2>
      <AccordionButton>Section 1 title</AccordionButton>
    </h2>
    <AccordionPanel>Panel 1</AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton>Section 2 title</AccordionButton>
    </h2>
    <AccordionPanel>Panel 2</AccordionPanel>
  </AccordionItem>
</Accordion>
```

To make each accordion toggle (expand/collapse) on click, pass the `allowToggle`
prop.

```jsx
<Accordion allowToggle>
  <AccordionItem>
    <AccordionButton>
      <chakra.div flex="1" textAlign="left">
        Section 1 title
      </chakra.div>
      <AccordionIcon />
    </AccordionButton>
    <AccordionPanel pb={4}>Panel 1</AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <AccordionButton>
      <chakra.div flex="1" textAlign="left">
        Section 2 title
      </chakra.div>
      <AccordionIcon />
    </AccordionButton>
    <AccordionPanel pb={4}>Panel 2</AccordionPanel>
  </AccordionItem>
</Accordion>
```

To allow multiple accordions to be visible at a time, pass the `allowMultiple`
prop.

```jsx
<Accordion allowMultiple>
  <AccordionItem>
    <AccordionButton>
      <chakra.div flex="1" textAlign="left">
        Section 1 title
      </chakra.div>
      <AccordionIcon />
    </AccordionButton>
    <AccordionPanel pb={4}>Panel 1</AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <AccordionButton>
      <chakra.div flex="1" textAlign="left">
        Section 2 title
      </chakra.div>
      <AccordionIcon />
    </AccordionButton>
    <AccordionPanel pb={4}>Panel 2</AccordionPanel>
  </AccordionItem>
</Accordion>
```

## References:

https://www.w3.org/TR/wai-aria-practices/examples/accordion/accordion.html
https://inclusive-components.design/collapsible-sections/
https://github.com/stereobooster/react-accessible-accordion
https://jqueryui.com/accordion/
