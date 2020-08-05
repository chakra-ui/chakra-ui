import * as React from "react"
import {
  userEvent,
  render,
  fireEvent,
  testA11y,
  screen,
} from "@chakra-ui/test-utils"
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from "../src"

jest.mock("@chakra-ui/collapse", () => {
  const Collapse = jest.fn(({ children, isOpen }) => (
    <div id="collapse-mock" hidden={!isOpen}>
      {children}
    </div>
  ))
  return { Collapse }
})

describe("<Accordion />", () => {
  test("accordion renders correctly", () => {
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

  it("passes a11y test", async () => {
    await testA11y(
      <Accordion>
        <AccordionItem>
          <AccordionButton>Section 1 title</AccordionButton>
          <AccordionPanel>Panel 1</AccordionPanel>
        </AccordionItem>
      </Accordion>,
    )
  })

  test("uncontrolled: It opens the accordion panel", () => {
    render(
      <Accordion defaultIndex={0}>
        <AccordionItem>
          <AccordionButton data-testid="button">
            Section 1 title
          </AccordionButton>
          <AccordionPanel data-testid="panel">Panel 1</AccordionPanel>
        </AccordionItem>
      </Accordion>,
    )

    expect(screen.getByTestId("button")).toHaveAttribute(
      "aria-expanded",
      "true",
    )
  })

  test("uncontrolled: toggles the accordion on click", async () => {
    render(
      <Accordion>
        <AccordionItem>
          <AccordionButton>Trigger</AccordionButton>
          <AccordionPanel>Panel</AccordionPanel>
        </AccordionItem>
      </Accordion>,
    )

    const trigger = screen.getByText("Trigger")

    userEvent.click(trigger)
    expect(trigger).toHaveAttribute("aria-expanded", "true")

    // you can't toggle an accordion without passing `allowToggle`
    userEvent.click(trigger)
    expect(trigger).toHaveAttribute("aria-expanded", "true")
  })

  // test that arrow up & down moves focus to next/previous accordion
  test("arrow up & down moves focus to next/previous accordion", () => {
    render(
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
    const first = screen.getByText("Section 1 title")
    const second = screen.getByText("Section 2 title")

    fireEvent.keyDown(first, { key: "ArrowDown", keyCode: 40 })
    expect(second).toHaveFocus()

    fireEvent.keyDown(second, { key: "ArrowUp", keyCode: 38 })
    expect(first).toHaveFocus()
  })

  // test that home & end keys moves focus to first/last accordion
  test("home & end keys moves focus to first/last accordion", () => {
    render(
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
    const first = screen.getByText("First section")
    const last = screen.getByText("Last section")

    fireEvent.keyDown(first, { key: "Home", keyCode: 36 })
    expect(first).toHaveFocus()

    fireEvent.keyDown(first, { key: "End", keyCode: 35 })
    expect(last).toHaveFocus()
  })

  // test the only one accordion can be visible + is not togglable
  test("only one accordion can be visible + is not togglable", () => {
    render(
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

    const firstAccordion = screen.getByText("First section")

    userEvent.click(firstAccordion)
    expect(firstAccordion).toHaveAttribute("aria-expanded", "true")

    userEvent.click(firstAccordion)
    expect(firstAccordion).toHaveAttribute("aria-expanded", "true")
  })
  // test the only one accordion can be visible + is togglable
  test("only one accordion can be visible + is togglable", () => {
    render(
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

    const firstAccordion = screen.getByText("First section")

    userEvent.click(firstAccordion)
    expect(firstAccordion).toHaveAttribute("aria-expanded", "true")

    userEvent.click(firstAccordion)
    expect(firstAccordion).toHaveAttribute("aria-expanded", "false")
  })

  // test that multiple accordions can be opened + is togglable
  test("multiple accordions can be opened + is togglable", () => {
    render(
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

    const firstAccordion = screen.getByText("First section")
    const secondAccordion = screen.getByText("Second section")

    userEvent.click(firstAccordion)
    expect(firstAccordion).toHaveAttribute("aria-expanded", "true")

    userEvent.click(secondAccordion)
    expect(firstAccordion).toHaveAttribute("aria-expanded", "true")
  })

  // it has the proper aria attributes
  test("has the proper aria attributes", () => {
    render(
      <Accordion>
        <AccordionItem>
          <AccordionButton>Section 1 title</AccordionButton>
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
  test("tab moves focus to the next focusable element", () => {
    render(
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
    const first = screen.getByText("First section")
    const second = screen.getByText("Second section")
    const last = screen.getByText("Last section")

    userEvent.tab()
    expect(first).toHaveFocus()

    userEvent.tab()
    expect(second).toHaveFocus()

    userEvent.tab()
    expect(last).toHaveFocus()
  })

  // test that aria-contols for button is same as id for panel
  test("aria-contols for button is same as id for panel", () => {
    render(
      <Accordion>
        <AccordionItem>
          <AccordionButton>Section 1 title</AccordionButton>
          <AccordionPanel>Panel 1</AccordionPanel>
        </AccordionItem>
      </Accordion>,
    )
    const button = screen.getByText("Section 1 title")
    const panel = screen.getByText("Panel 1")
    expect(button.getAttribute("aria-controls")).toEqual(
      panel.getAttribute("id"),
    )
  })

  // test that aria-expanded is true/false when accordion is open/closed
  test("aria-expanded is true/false when accordion is open/closed", () => {
    render(
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

    const button = screen.getByText("Section 1 title")
    expect(button).toHaveAttribute("aria-expanded", "true")
  })

  // test that panel has role=region and aria-labelledby
  test("panel has role=region and aria-labelledby", () => {
    render(
      <Accordion>
        <AccordionItem>
          <AccordionButton>Section 1 title</AccordionButton>
          <AccordionPanel>Panel 1</AccordionPanel>
        </AccordionItem>
      </Accordion>,
    )
    const panel = screen.getByText("Panel 1")

    expect(panel).toHaveAttribute("aria-labelledby")
    expect(panel).toHaveAttribute("role", "region")
  })
})
