import React, { useState } from "react";
import { cleanup, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "../../../../tests/utils";
import { Box } from "@chakra-ui/layout";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  AccordionIcon,
} from "../Accordion";

afterEach(cleanup);

const renderComponent = (props = {}) => {
  const _props = {
    allowToggle: false,
    allowMultiple: false,
    ...props,
  };

  return render(
    <Accordion {..._props}>
      <AccordionItem>
        <AccordionHeader>header1</AccordionHeader>
        <AccordionPanel>panel1</AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader>header2</AccordionHeader>
        <AccordionPanel>panel2</AccordionPanel>
      </AccordionItem>
    </Accordion>,
  );
};

it("should render", () => {
  renderComponent();
});

it("should expand only the first item by default", () => {
  const { getByText } = renderComponent();
  const header = getByText("header1");
  const panel = getByText("panel1");
  const header2 = getByText("header2");
  const panel2 = getByText("panel2");

  expect(header).toHaveAttribute("aria-expanded", "true");
  expect(panel).toHaveAttribute("aria-hidden", "false");

  expect(header2).toHaveAttribute("aria-expanded", "false");
  expect(panel2).toHaveAttribute("aria-hidden", "true");
});

it("should prevent collapsing by default", () => {
  const { getByText, debug } = renderComponent();
  const header = getByText("header1");

  fireEvent.click(header);

  expect(header).toHaveAttribute("aria-expanded", "true");
});

it('should allow collapsing if "allowToggle" is true', () => {
  const { getByText, debug } = renderComponent({ allowToggle: true });
  const header = getByText("header1");

  fireEvent.click(header);

  expect(header).toHaveAttribute("aria-expanded", "false");
});

it('should display multiple items if "allowMultiple" is true', () => {
  const { getByText, debug } = renderComponent({ allowMultiple: true });
  const header = getByText("header1");
  const header2 = getByText("header2");

  fireEvent.click(header2);

  expect(header).toHaveAttribute("aria-expanded", "true");
  expect(header2).toHaveAttribute("aria-expanded", "true");
});

it("should support render prop for AccordionItem", () => {
  const { getByText } = render(
    <Accordion>
      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <AccordionHeader>
              {isExpanded ? "expanded header" : "header"}
            </AccordionHeader>
            <AccordionPanel>
              {isExpanded ? "expanded panel" : "panel"}
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>,
  );

  expect(getByText("expanded header")).toBeInTheDocument();
  expect(getByText("expanded panel")).toBeInTheDocument();
});

it('should set expanded item based on "index" prop', () => {
  const spy = jest.fn();
  const { getByText } = renderComponent({ index: 1, onChange: spy });

  expect(getByText("header2")).toHaveAttribute("aria-expanded", "true");

  fireEvent.click(getByText("header1"));

  expect(spy).toHaveBeenCalledWith(0);
});

it('should invoke "onChange" prop with new index when an item is expanded/collapsed', () => {
  const spy = jest.fn();
  const { getByText } = renderComponent({ index: 1, onChange: spy });

  fireEvent.click(getByText("header1"));

  expect(spy).toHaveBeenCalledWith(0);
});

it('should set default expanded item based on "defaultIndex" prop', () => {
  const { getByText } = renderComponent({ defaultIndex: 1 });

  expect(getByText("header2")).toHaveAttribute("aria-expanded", "true");
});

it("should handle index managment from outside", () => {
  let changeIndex = () => {};

  const Component = () => {
    const [index, setIndex] = useState(0);

    changeIndex = () => setIndex(1);

    return (
      <Accordion index={index}>
        <AccordionItem>
          <AccordionHeader>header1</AccordionHeader>
          <AccordionPanel>panel1</AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader>header2</AccordionHeader>
          <AccordionPanel>panel2</AccordionPanel>
        </AccordionItem>
      </Accordion>
    );
  };

  const { getByText } = render(<Component />);

  expect(getByText("header1")).toHaveAttribute("aria-expanded", "true");

  act(() => {
    changeIndex();
  });

  expect(getByText("header2")).toHaveAttribute("aria-expanded", "true");
});

it("should should render a disabled item", () => {
  const { getByText } = render(
    <Accordion>
      <AccordionItem isDisabled>
        <AccordionHeader>header</AccordionHeader>
        <AccordionPanel>panel</AccordionPanel>
      </AccordionItem>
    </Accordion>,
  );

  expect(getByText("header")).toHaveAttribute("disabled");
});

it("should display header icon", () => {
  const { getByTestId } = render(
    <Accordion>
      <AccordionItem>
        <AccordionHeader>
          <Box>header</Box>
          <AccordionIcon data-testid="icon" />
        </AccordionHeader>
        <AccordionPanel>panel</AccordionPanel>
      </AccordionItem>
    </Accordion>,
  );

  expect(getByTestId("icon")).toBeInTheDocument();
});
