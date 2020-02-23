import "@testing-library/jest-dom/extend-expect"
import userEvent from "@testing-library/user-event"
import React from "react"
import { render, fireEvent } from "../../../test/utils"
import {
  BaseAccordion,
  BaseAccordionButton,
  BaseAccordionItem,
  BaseAccordionPanel,
} from "../src/Accordion.base"

test("Button renders correctly", () => {
  const { asFragment } = render(
    <BaseAccordion>
      <BaseAccordionItem>
        <BaseAccordionButton>Section 1 title</BaseAccordionButton>
        <BaseAccordionPanel>Panel 1</BaseAccordionPanel>
      </BaseAccordionItem>
    </BaseAccordion>,
  )
  expect(asFragment()).toMatchSnapshot()
})

test("uncontrolled: It opens the accordion panel", () => {
  const { getByTestId } = render(
    <BaseAccordion defaultIndex={0}>
      <BaseAccordionItem>
        <BaseAccordionButton data-testid="button">
          Section 1 title
        </BaseAccordionButton>
        <BaseAccordionPanel data-testid="panel">Panel 1</BaseAccordionPanel>
      </BaseAccordionItem>
    </BaseAccordion>,
  )

  const button = getByTestId("button")
  expect(button).toHaveAttribute("aria-expanded", "true")
})

test("uncontrolled: toggles the accordion on click", () => {
  const { getByText } = render(
    <BaseAccordion>
      <BaseAccordionItem>
        <BaseAccordionButton>Trigger</BaseAccordionButton>
        <BaseAccordionPanel>Panel</BaseAccordionPanel>
      </BaseAccordionItem>
    </BaseAccordion>,
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
  const { getByText, getByTestId } = render(
    <BaseAccordion data-testid="accordion">
      <BaseAccordionItem>
        <BaseAccordionButton>Section 1 title</BaseAccordionButton>
        <BaseAccordionPanel>Panel 1</BaseAccordionPanel>
      </BaseAccordionItem>

      <BaseAccordionItem>
        <BaseAccordionButton>Section 2 title</BaseAccordionButton>
        <BaseAccordionPanel>Panel 2</BaseAccordionPanel>
      </BaseAccordionItem>
    </BaseAccordion>,
  )

  const accordion = getByTestId("accordion")
  const accordionItemOne = getByText("Section 1 title")
  const accordionItemTwo = getByText("Section 2 title")

  fireEvent.keyDown(accordion, { key: "ArrowDown", keyCode: 40 })
  expect(accordionItemOne).toHaveFocus()

  fireEvent.keyDown(accordion, { key: "ArrowUp", keyCode: 38 })
  expect(accordionItemTwo).toHaveFocus()
})

// test that home & end keys moves focus to first/last accordion
test("home & end keys moves focus to first/last accordion", () => {
  const { getByText, getByTestId } = render(
    <BaseAccordion data-testid="accordion">
      <BaseAccordionItem>
        <BaseAccordionButton>First section</BaseAccordionButton>
        <BaseAccordionPanel>Panel 1</BaseAccordionPanel>
      </BaseAccordionItem>

      <BaseAccordionItem>
        <BaseAccordionButton>Second section</BaseAccordionButton>
        <BaseAccordionPanel>Panel 1</BaseAccordionPanel>
      </BaseAccordionItem>

      <BaseAccordionItem>
        <BaseAccordionButton>Last section</BaseAccordionButton>
        <BaseAccordionPanel>Panel 2</BaseAccordionPanel>
      </BaseAccordionItem>
    </BaseAccordion>,
  )
  const accordion = getByTestId("accordion")
  const first = getByText("First section")
  const last = getByText("Last section")

  fireEvent.keyDown(accordion, { key: "Home", keyCode: 36 })
  expect(first).toHaveFocus()

  fireEvent.keyDown(accordion, { key: "End", keyCode: 35 })
  expect(last).toHaveFocus()
})
// test the only one accordion can be visible + is not togglable
// test the only one accordion can be visible + is togglable
// test that multiple accordions can be opened + is togglable
// it has the proper aria attributes
// test that enter and space can toggle the visiblity
// test that tab moves focus to the next focusable element;
// test that aria-contols for button is same as id for panel
// test that aria-expanded is true/false when accordion is open/closed
// test that panel has role=region and aria-labelledby
