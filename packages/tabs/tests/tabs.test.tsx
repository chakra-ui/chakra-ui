import { axe, fireEvent, render } from "@chakra-ui/test-utils"
import * as React from "react"
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "../src"

test("should no accessibility issues", async () => {
  const { container } = render(
    <Tabs>
      <TabList>
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab>Tab 3</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <p>Panel 1</p>
        </TabPanel>
        <TabPanel>
          <p>Panel 2</p>
        </TabPanel>
        <TabPanel>
          <p>Panel 3</p>
        </TabPanel>
      </TabPanels>
    </Tabs>,
  )

  const result = await axe(container)

  expect(result).toHaveNoViolations()
})

test("selects the correct tab with keyboard navigation", () => {
  const { getByText, getByRole } = render(
    <Tabs>
      <TabList>
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab>Tab 3</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <p>Panel 1</p>
        </TabPanel>
        <TabPanel>
          <p>Panel 2</p>
        </TabPanel>
        <TabPanel>
          <p>Panel 3</p>
        </TabPanel>
      </TabPanels>
    </Tabs>,
  )

  const tabList = getByRole("tablist")

  const tab1 = getByText("Tab 1")
  const panel1 = getByText("Panel 1")

  const tab2 = getByText("Tab 2")
  const panel2 = getByText("Panel 2")

  const tab3 = getByText("Tab 3")
  const panel3 = getByText("Panel 3")

  fireEvent.click(tab1)
  fireEvent.keyDown(tabList, { key: "ArrowRight", code: 39 })

  expect(tab2).toHaveFocus()
  expect(tab2).toHaveAttribute("aria-selected", "true")

  expect(panel2).toBeVisible()
  expect(panel1).not.toBeVisible()

  fireEvent.keyDown(tabList, { key: "ArrowRight", code: 39 })

  expect(getByText("Tab 3")).toHaveFocus()
  expect(tab3).toHaveAttribute("aria-selected", "true")

  expect(getByText("Panel 3")).toBeVisible()
  expect(getByText("Panel 2")).not.toBeVisible()

  fireEvent.keyDown(tabList, { key: "ArrowRight", code: 39 })
  expect(tab1).toHaveFocus()

  fireEvent.keyDown(tabList, { key: "ArrowLeft", code: 37 })
  expect(getByText("Tab 3")).toHaveFocus()

  fireEvent.keyDown(tabList, { key: "ArrowLeft", code: 37 })
  fireEvent.keyDown(tabList, { key: "ArrowLeft", code: 37 })
  expect(tab1).toHaveFocus()

  fireEvent.keyDown(tabList, { key: "End", code: 35 })
  expect(getByText("Tab 3")).toHaveFocus()

  fireEvent.keyDown(tabList, { key: "Home", code: 36 })
  expect(tab1).toHaveFocus()
})

test("focuses the correct tab with manual keyboard navigation", async () => {
  const { getByRole, getByText } = render(
    <Tabs isManual>
      <TabList>
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab>Tab 3</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <p>Panel 1</p>
        </TabPanel>
        <TabPanel>
          <p>Panel 2</p>
        </TabPanel>
        <TabPanel>
          <p>Panel 3</p>
        </TabPanel>
      </TabPanels>
    </Tabs>,
  )

  const tabList = getByRole("tablist")

  const tab1 = getByText("Tab 1")
  const panel1 = getByText("Panel 1")

  const tab2 = getByText("Tab 2")
  const panel2 = getByText("Panel 2")

  expect(tabList).toBeInTheDocument()

  fireEvent.click(tab1)
  expect(panel1).toBeVisible()

  fireEvent.keyDown(tabList, { key: "ArrowRight", code: 39 })

  // selection doesn't follow focus, so the tab is not selected
  // even if it's focused
  expect(tab2).toHaveFocus()
  expect(tab2).not.toHaveAttribute("aria-selected")
  expect(panel2).not.toBeVisible()
})
