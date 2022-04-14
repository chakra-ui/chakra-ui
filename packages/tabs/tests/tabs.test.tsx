import { testA11y, render, screen, fireEvent } from "@chakra-ui/test-utils"
import * as React from "react"
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "../src"

test("should no accessibility issues", async () => {
  await testA11y(
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
})

test("selects the correct tab with keyboard navigation", async () => {
  const { user } = render(
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

  const tabList = screen.getByRole("tablist")

  const tab1 = screen.getByText("Tab 1")
  const panel1 = screen.getByText("Panel 1")

  const tab2 = screen.getByText("Tab 2")
  const panel2 = screen.getByText("Panel 2")

  const tab3 = screen.getByText("Tab 3")

  await user.click(tab1)
  fireEvent.keyDown(tabList, { key: "ArrowRight", code: 39 })

  expect(tab2).toHaveFocus()
  expect(tab2).toHaveAttribute("aria-selected", "true")

  expect(panel2).toBeVisible()
  expect(panel1).not.toBeVisible()

  fireEvent.keyDown(tabList, { key: "ArrowRight", code: 39 })

  expect(screen.getByText("Tab 3")).toHaveFocus()
  expect(tab3).toHaveAttribute("aria-selected", "true")

  expect(screen.getByText("Panel 3")).toBeVisible()
  expect(screen.getByText("Panel 2")).not.toBeVisible()

  fireEvent.keyDown(tabList, { key: "ArrowRight", code: 39 })
  expect(tab1).toHaveFocus()

  fireEvent.keyDown(tabList, { key: "ArrowLeft", code: 37 })
  expect(screen.getByText("Tab 3")).toHaveFocus()

  fireEvent.keyDown(tabList, { key: "ArrowLeft", code: 37 })
  fireEvent.keyDown(tabList, { key: "ArrowLeft", code: 37 })
  expect(tab1).toHaveFocus()

  fireEvent.keyDown(tabList, { key: "End", code: 35 })
  expect(screen.getByText("Tab 3")).toHaveFocus()

  fireEvent.keyDown(tabList, { key: "Home", code: 36 })
  expect(tab1).toHaveFocus()
})

test("focuses the correct tab with manual keyboard navigation", async () => {
  const { user } = render(
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

  const tabList = screen.getByRole("tablist")

  const tab1 = screen.getByText("Tab 1")
  const panel1 = screen.getByText("Panel 1")

  const tab2 = screen.getByText("Tab 2")
  const panel2 = screen.getByText("Panel 2")

  expect(tabList).toBeInTheDocument()

  await user.click(tab1)
  expect(panel1).toBeVisible()

  fireEvent.keyDown(tabList, { key: "ArrowRight", code: 39 })

  // selection doesn't follow focus, so the tab is not selected
  // even if it is focused
  expect(tab2).toHaveFocus()
  expect(tab2).toHaveAttribute("aria-selected", "false")
  expect(panel2).not.toBeVisible()
})

test("renders only the currently active tab panel if isLazy", async () => {
  const { user } = render(
    <Tabs isLazy>
      <TabList>
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <p>Panel 1</p>
        </TabPanel>
        <TabPanel>
          <p>Panel 2</p>
        </TabPanel>
      </TabPanels>
    </Tabs>,
  )

  expect(screen.getByText("Panel 1")).toBeInTheDocument()
  expect(screen.queryByText("Panel 2")).not.toBeInTheDocument()

  await user.click(screen.getByText("Tab 2"))

  expect(screen.queryByText("Panel 1")).not.toBeInTheDocument()
  expect(screen.getByText("Panel 2")).toBeInTheDocument()
})

test("renders the currently active tab panel and previously-selected tabs if isLazy and lazy behavior is keepMounted", async () => {
  const { user } = render(
    <Tabs isLazy lazyBehavior="keepMounted">
      <TabList>
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <p>Panel 1</p>
        </TabPanel>
        <TabPanel>
          <p>Panel 2</p>
        </TabPanel>
      </TabPanels>
    </Tabs>,
  )

  expect(screen.getByText("Panel 1")).toBeInTheDocument()
  expect(screen.queryByText("Panel 2")).not.toBeInTheDocument()

  await user.click(screen.getByText("Tab 2"))

  expect(screen.queryByText("Panel 1")).toBeInTheDocument()
  expect(screen.getByText("Panel 2")).toBeInTheDocument()
})
