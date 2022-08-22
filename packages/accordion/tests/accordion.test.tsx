import * as React from "react"
import { focus, render, testA11y, screen } from "@chakra-ui/test-utils"
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from "../src"

test("passes a11y test", async () => {
  await testA11y(
    <Accordion>
      <AccordionItem>
        <h2>
          <AccordionButton>Section 1 title</AccordionButton>
        </h2>
        <AccordionPanel>Panel 1</AccordionPanel>
      </AccordionItem>
    </Accordion>,
  )
})

test("uncontrolled: It opens the accordion panel", async () => {
  render(
    <Accordion defaultIndex={0}>
      <AccordionItem>
        <h2>
          <AccordionButton data-testid="button">
            Section 1 title
          </AccordionButton>
        </h2>
        <AccordionPanel data-testid="panel">Panel 1</AccordionPanel>
      </AccordionItem>
    </Accordion>,
  )

  expect(screen.getByTestId("button")).toHaveAttribute("aria-expanded", "true")
})

test("uncontrolled: toggles the accordion on click", async () => {
  const { user } = render(
    <Accordion>
      <AccordionItem>
        <h2>
          <AccordionButton>Trigger</AccordionButton>
        </h2>
        <AccordionPanel>Panel</AccordionPanel>
      </AccordionItem>
    </Accordion>,
  )

  const trigger = screen.getByText("Trigger")

  await user.click(trigger)
  expect(trigger).toHaveAttribute("aria-expanded", "true")

  // you can't toggle an accordion without passing `allowToggle`
  await user.click(trigger)
  expect(trigger).toHaveAttribute("aria-expanded", "true")
})

// test that arrow up & down moves focus to next/previous accordion
test("arrow up & down moves focus to next/previous accordion", async () => {
  const { user } = render(
    <Accordion>
      <AccordionItem>
        <h2>
          <AccordionButton>Section 1 title</AccordionButton>
        </h2>
        <AccordionPanel>Panel 1</AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <AccordionButton>Section 2 title</AccordionButton>
        <AccordionPanel>Panel 2</AccordionPanel>
      </AccordionItem>
    </Accordion>,
  )
  const first = screen.getByText("Section 1 title")
  const second = screen.getByText("Section 2 title")

  focus(first)

  await user.keyboard("[ArrowDown]")
  expect(second).toHaveFocus()

  await user.keyboard("[ArrowUp]")
  expect(first).toHaveFocus()
})

// test that home & end keys moves focus to first/last accordion
test("home & end keys moves focus to first/last accordion", async () => {
  const { user } = render(
    <Accordion>
      <AccordionItem>
        <h2>
          <AccordionButton>First section</AccordionButton>
        </h2>
        <AccordionPanel>Panel 1</AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton>Second section</AccordionButton>
        </h2>
        <AccordionPanel>Panel 1</AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton>Last section</AccordionButton>
        </h2>
        <AccordionPanel>Panel 2</AccordionPanel>
      </AccordionItem>
    </Accordion>,
  )
  const first = screen.getByText("First section")
  const last = screen.getByText("Last section")

  focus(first)

  await user.keyboard("[Home]")
  expect(first).toHaveFocus()

  await user.keyboard("[End]")
  expect(last).toHaveFocus()
})

// test the only one accordion can be visible + is not toggleable
test("only one accordion can be visible + is not toggleable", async () => {
  const { user } = render(
    <Accordion>
      <AccordionItem>
        <h2>
          <AccordionButton>First section</AccordionButton>
        </h2>
        <AccordionPanel>Panel 1</AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton>Second section</AccordionButton>
        </h2>
        <AccordionPanel>Panel 1</AccordionPanel>
      </AccordionItem>
    </Accordion>,
  )

  const first = screen.getByText("First section")

  await user.click(first)
  expect(first).toHaveAttribute("aria-expanded", "true")

  await user.click(first)
  expect(first).toHaveAttribute("aria-expanded", "true")
})
// test the only one accordion can be visible + is toggleable
test("only one accordion can be visible + is toggleable", async () => {
  const { user } = render(
    <Accordion allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton>First section</AccordionButton>
        </h2>
        <AccordionPanel>Panel 1</AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton>Second section</AccordionButton>
        </h2>
        <AccordionPanel>Panel 1</AccordionPanel>
      </AccordionItem>
    </Accordion>,
  )

  const firstAccordion = screen.getByText("First section")

  await user.click(firstAccordion)
  expect(firstAccordion).toHaveAttribute("aria-expanded", "true")

  await user.click(firstAccordion)
  expect(firstAccordion).toHaveAttribute("aria-expanded", "false")
})

// test that multiple accordions can be opened + is toggleable
test("multiple accordions can be opened + is toggleable", async () => {
  const { user } = render(
    <Accordion allowMultiple>
      <AccordionItem>
        <h2>
          <AccordionButton>First section</AccordionButton>
        </h2>
        <AccordionPanel>Panel 1</AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton>Second section</AccordionButton>
        </h2>
        <AccordionPanel>Panel 1</AccordionPanel>
      </AccordionItem>
    </Accordion>,
  )

  const first = screen.getByText("First section")
  const second = screen.getByText("Second section")

  await user.click(first)
  expect(first).toHaveAttribute("aria-expanded", "true")

  await user.click(second)
  expect(first).toHaveAttribute("aria-expanded", "true")
})

// it has the proper aria attributes
test("has the proper aria attributes", async () => {
  render(
    <Accordion>
      <AccordionItem>
        <h2>
          <AccordionButton>Section 1 title</AccordionButton>
        </h2>
        <AccordionPanel>Panel 1</AccordionPanel>
      </AccordionItem>
    </Accordion>,
  )
  const button = screen.getByText("Section 1 title")
  const panel = screen.getByText("Panel 1")

  expect(button).toHaveAttribute("aria-controls")
  expect(button).toHaveAttribute("aria-expanded")
  expect(panel).toHaveAttribute("aria-labelledby")
})

// test that tab moves focus to the next focusable element
test("tab moves focus to the next focusable element", async () => {
  const { user } = render(
    <Accordion>
      <AccordionItem>
        <h2>
          <AccordionButton>First section</AccordionButton>
        </h2>
        <AccordionPanel>Panel 1</AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton>Second section</AccordionButton>
        </h2>
        <AccordionPanel>Panel 1</AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton>Last section</AccordionButton>
        </h2>
        <AccordionPanel>Panel 2</AccordionPanel>
      </AccordionItem>
    </Accordion>,
  )
  const first = screen.getByText("First section")
  const second = screen.getByText("Second section")
  const last = screen.getByText("Last section")

  await user.keyboard("[Tab]")
  expect(first).toHaveFocus()

  await user.keyboard("[Tab]")
  expect(second).toHaveFocus()

  await user.keyboard("[Tab]")
  expect(last).toHaveFocus()
})

// test that aria-controls for button is same as id for panel
test("aria-controls for button is same as id for panel", async () => {
  render(
    <Accordion>
      <AccordionItem>
        <h2>
          <AccordionButton>Section 1 title</AccordionButton>
        </h2>
        <AccordionPanel>Panel 1</AccordionPanel>
      </AccordionItem>
    </Accordion>,
  )
  const button = screen.getByText("Section 1 title")
  const panel = screen.getByText("Panel 1")
  expect(button.getAttribute("aria-controls")).toEqual(panel.getAttribute("id"))
})

// test that aria-expanded is true/false when accordion is open/closed
test("aria-expanded is true/false when accordion is open/closed", async () => {
  render(
    <Accordion defaultIndex={0}>
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
    </Accordion>,
  )

  const button = screen.getByText("Section 1 title")
  expect(button).toHaveAttribute("aria-expanded", "true")
})

// test that panel has role=region and aria-labelledby
test("panel has role=region and aria-labelledby", async () => {
  render(
    <Accordion>
      <AccordionItem>
        <h2>
          <AccordionButton>Section 1 title</AccordionButton>
        </h2>
        <AccordionPanel>Panel 1</AccordionPanel>
      </AccordionItem>
    </Accordion>,
  )
  const panel = screen.getByText("Panel 1")

  expect(panel).toHaveAttribute("aria-labelledby")
  expect(panel).toHaveAttribute("role", "region")
})
