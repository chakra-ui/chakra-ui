import React from "react"
import { userEvent, render, fireEvent } from "@chakra-ui/test-utils"
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from "../Accordion"

test("Button renders correctly", () => {
  const { asFragment } = render(
    <Accordion>
      <AccordionItem>
        <AccordionButton>Section 1 title</AccordionButton>
        <AccordionPanel>Panel 1</AccordionPanel>
      </AccordionItem>
    </Accordion>,
  )
  expect(asFragment()).toMatchSnapshot()
})

test("uncontrolled: It opens the accordion panel", () => {
  const { getByTestId } = render(
    <Accordion defaultIndex={0}>
      <AccordionItem>
        <AccordionButton data-testid="button">Section 1 title</AccordionButton>
        <AccordionPanel data-testid="panel">Panel 1</AccordionPanel>
      </AccordionItem>
    </Accordion>,
  )

  const button = getByTestId("button")
  expect(button).toHaveAttribute("aria-expanded", "true")
})

test("uncontrolled: toggles the accordion on click", () => {
  const { getByText } = render(
    <Accordion>
      <AccordionItem>
        <AccordionButton>Trigger</AccordionButton>
        <AccordionPanel>Panel</AccordionPanel>
      </AccordionItem>
    </Accordion>,
  )

  const trigger = getByText("Trigger")

  userEvent.click(trigger)
  expect(trigger).toHaveAttribute("aria-expanded", "true")

  // you can't toggle an accordion without passing `allowToggle`
  userEvent.click(trigger)
  expect(trigger).toHaveAttribute("aria-expanded", "true")
})

// test that arrow up & down moves focus to next/previous accordion
test("arrow up & down moves focus to next/previous accordion", () => {
  const { getByText } = render(
    <Accordion>
      <AccordionItem>
        <AccordionButton>Section 1 title</AccordionButton>
        <AccordionPanel>Panel 1</AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <AccordionButton>Section 2 title</AccordionButton>
        <AccordionPanel>Panel 2</AccordionPanel>
      </AccordionItem>
    </Accordion>,
  )
  const first = getByText("Section 1 title")
  const second = getByText("Section 2 title")

  fireEvent.keyDown(first, { key: "ArrowDown", keyCode: 40 })
  expect(second).toHaveFocus()

  fireEvent.keyDown(second, { key: "ArrowUp", keyCode: 38 })
  expect(first).toHaveFocus()
})

// test that home & end keys moves focus to first/last accordion
test("home & end keys moves focus to first/last accordion", () => {
  const { getByText } = render(
    <Accordion>
      <AccordionItem>
        <AccordionButton>First section</AccordionButton>
        <AccordionPanel>Panel 1</AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <AccordionButton>Second section</AccordionButton>
        <AccordionPanel>Panel 1</AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <AccordionButton>Last section</AccordionButton>
        <AccordionPanel>Panel 2</AccordionPanel>
      </AccordionItem>
    </Accordion>,
  )
  const first = getByText("First section")
  const last = getByText("Last section")

  fireEvent.keyDown(first, { key: "Home", keyCode: 36 })
  expect(first).toHaveFocus()

  fireEvent.keyDown(first, { key: "End", keyCode: 35 })
  expect(last).toHaveFocus()
})

// test the only one accordion can be visible + is not togglable
test("only one accordion can be visible + is not togglable", () => {
  const { getByText } = render(
    <Accordion>
      <AccordionItem>
        <AccordionButton>First section</AccordionButton>
        <AccordionPanel>Panel 1</AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <AccordionButton>Second section</AccordionButton>
        <AccordionPanel>Panel 1</AccordionPanel>
      </AccordionItem>
    </Accordion>,
  )

  const firstAccordion = getByText("First section")

  userEvent.click(firstAccordion)
  expect(firstAccordion).toHaveAttribute("aria-expanded", "true")

  userEvent.click(firstAccordion)
  expect(firstAccordion).toHaveAttribute("aria-expanded", "true")
})
// test the only one accordion can be visible + is togglable
test("only one accordion can be visible + is togglable", () => {
  const { getByText } = render(
    <Accordion allowToggle>
      <AccordionItem>
        <AccordionButton>First section</AccordionButton>
        <AccordionPanel>Panel 1</AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <AccordionButton>Second section</AccordionButton>
        <AccordionPanel>Panel 1</AccordionPanel>
      </AccordionItem>
    </Accordion>,
  )

  const firstAccordion = getByText("First section")

  userEvent.click(firstAccordion)
  expect(firstAccordion).toHaveAttribute("aria-expanded", "true")

  userEvent.click(firstAccordion)
  expect(firstAccordion).toHaveAttribute("aria-expanded", "false")
})

// test that multiple accordions can be opened + is togglable
test("multiple accordions can be opened + is togglable", () => {
  const { getByText } = render(
    <Accordion allowMultiple>
      <AccordionItem>
        <AccordionButton>First section</AccordionButton>
        <AccordionPanel>Panel 1</AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <AccordionButton>Second section</AccordionButton>
        <AccordionPanel>Panel 1</AccordionPanel>
      </AccordionItem>
    </Accordion>,
  )

  const firstAccordion = getByText("First section")
  const secondAccordion = getByText("Second section")

  userEvent.click(firstAccordion)
  expect(firstAccordion).toHaveAttribute("aria-expanded", "true")

  userEvent.click(secondAccordion)
  expect(firstAccordion).toHaveAttribute("aria-expanded", "true")
})

// it has the proper aria attributes
test("has the proper aria attributes", () => {
  const { getByText } = render(
    <Accordion>
      <AccordionItem>
        <AccordionButton>Section 1 title</AccordionButton>
        <AccordionPanel>Panel 1</AccordionPanel>
      </AccordionItem>
    </Accordion>,
  )
  const button = getByText("Section 1 title")
  const panel = getByText("Panel 1")

  expect(button).toHaveAttribute("aria-controls")
  expect(button).toHaveAttribute("aria-expanded")
  expect(panel).toHaveAttribute("aria-labelledby")
})

// test that enter and space can toggle the visiblity
// Issue with keyDown from testing library
// test("enter and space can toggle the visiblity", () => {
//   const { getByText } = render(
//     <Accordion allowToggle>
//       <AccordionItem>
//         <AccordionButton>Section 1 title</AccordionButton>
//         <AccordionPanel>Panel 1</AccordionPanel>
//       </AccordionItem>

//       <AccordionItem>
//         <AccordionButton>Section 2 title</AccordionButton>
//         <AccordionPanel>Panel 2</AccordionPanel>
//       </AccordionItem>
//     </Accordion>,
//   )

//   const button = getByText("Section 1 title")

//   button.focus()

//   fireEvent.keyDown(button, {
//     keyCode: 13,
//     key: "enter",
//   })

//   fireEvent.keyUp(button, {
//     keyCode: 13,
//     key: "enter",
//   })

//   expect(button).toHaveFocus()
//   expect(button).toHaveAttribute("aria-expanded", "true")
// })

// test that tab moves focus to the next focusable element
test("tab moves focus to the next focusable element", () => {
  const { getByText } = render(
    <Accordion>
      <AccordionItem>
        <AccordionButton>First section</AccordionButton>
        <AccordionPanel>Panel 1</AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <AccordionButton>Second section</AccordionButton>
        <AccordionPanel>Panel 1</AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <AccordionButton>Last section</AccordionButton>
        <AccordionPanel>Panel 2</AccordionPanel>
      </AccordionItem>
    </Accordion>,
  )
  const first = getByText("First section")
  const second = getByText("Second section")
  const last = getByText("Last section")

  userEvent.tab()
  expect(first).toHaveFocus()

  userEvent.tab()
  expect(second).toHaveFocus()

  userEvent.tab()
  expect(last).toHaveFocus()
})

// test that aria-contols for button is same as id for panel
test("aria-contols for button is same as id for panel", () => {
  const { getByText } = render(
    <Accordion>
      <AccordionItem>
        <AccordionButton>Section 1 title</AccordionButton>
        <AccordionPanel>Panel 1</AccordionPanel>
      </AccordionItem>
    </Accordion>,
  )
  const button = getByText("Section 1 title")
  const panel = getByText("Panel 1")
  expect(button.getAttribute("aria-controls")).toEqual(panel.getAttribute("id"))
})

// test that aria-expanded is true/false when accordion is open/closed
test("aria-expanded is true/false when accordion is open/closed", () => {
  const { getByText } = render(
    <Accordion defaultIndex={0}>
      <AccordionItem>
        <AccordionButton>Section 1 title</AccordionButton>
        <AccordionPanel>Panel 1</AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionButton>Section 2 title</AccordionButton>
        <AccordionPanel>Panel 2</AccordionPanel>
      </AccordionItem>
    </Accordion>,
  )

  const button = getByText("Section 1 title")
  expect(button).toHaveAttribute("aria-expanded", "true")
})

// test that panel has role=region and aria-labelledby
test("panel has role=region and aria-labelledby", () => {
  const { getByText } = render(
    <Accordion>
      <AccordionItem>
        <AccordionButton>Section 1 title</AccordionButton>
        <AccordionPanel>Panel 1</AccordionPanel>
      </AccordionItem>
    </Accordion>,
  )
  const panel = getByText("Panel 1")

  expect(panel).toHaveAttribute("aria-labelledby")
  expect(panel).toHaveAttribute("role", "region")
})
