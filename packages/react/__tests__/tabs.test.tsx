import { fireEvent, render, screen, testA11y } from "@chakra-ui/test-utils"
import { Tabs } from "../src/components/tabs"

test("should no accessibility issues", async () => {
  await testA11y(
    <Tabs.Root defaultValue="1">
      <Tabs.List>
        <Tabs.Trigger value="1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="2">Tab 2</Tabs.Trigger>
        <Tabs.Trigger value="3">Tab 3</Tabs.Trigger>
      </Tabs.List>
      <Tabs.ContentGroup>
        <Tabs.Content value="1">
          <p>Panel 1</p>
        </Tabs.Content>
        <Tabs.Content value="2">
          <p>Panel 2</p>
        </Tabs.Content>
        <Tabs.Content value="3">
          <p>Panel 3</p>
        </Tabs.Content>
      </Tabs.ContentGroup>
    </Tabs.Root>,
  )
})

test("selects the correct tab with keyboard navigation", async () => {
  const { user } = render(
    <Tabs.Root defaultValue="1">
      <Tabs.List>
        <Tabs.Trigger value="1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="2">Tab 2</Tabs.Trigger>
        <Tabs.Trigger value="3">Tab 3</Tabs.Trigger>
      </Tabs.List>
      <Tabs.ContentGroup>
        <Tabs.Content value="1">
          <p>Panel 1</p>
        </Tabs.Content>
        <Tabs.Content value="2">
          <p>Panel 2</p>
        </Tabs.Content>
        <Tabs.Content value="3">
          <p>Panel 3</p>
        </Tabs.Content>
      </Tabs.ContentGroup>
    </Tabs.Root>,
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
    <Tabs.Root defaultValue="1" isManual>
      <Tabs.List>
        <Tabs.Trigger value="1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="2">Tab 2</Tabs.Trigger>
        <Tabs.Trigger value="3">Tab 3</Tabs.Trigger>
      </Tabs.List>
      <Tabs.ContentGroup>
        <Tabs.Content value="1">
          <p>Panel 1</p>
        </Tabs.Content>
        <Tabs.Content value="2">
          <p>Panel 2</p>
        </Tabs.Content>
        <Tabs.Content value="3">
          <p>Panel 3</p>
        </Tabs.Content>
      </Tabs.ContentGroup>
    </Tabs.Root>,
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
    <Tabs.Root defaultValue="1" isLazy>
      <Tabs.List>
        <Tabs.Trigger value="1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="2">Tab 2</Tabs.Trigger>
      </Tabs.List>
      <Tabs.ContentGroup>
        <Tabs.Content value="1">
          <p>Panel 1</p>
        </Tabs.Content>
        <Tabs.Content value="2">
          <p>Panel 2</p>
        </Tabs.Content>
      </Tabs.ContentGroup>
    </Tabs.Root>,
  )

  expect(screen.getByText("Panel 1")).toBeInTheDocument()
  expect(screen.queryByText("Panel 2")).not.toBeInTheDocument()

  await user.click(screen.getByText("Tab 2"))

  expect(screen.queryByText("Panel 1")).not.toBeInTheDocument()
  expect(screen.getByText("Panel 2")).toBeInTheDocument()
})

test("renders the currently active tab panel and previously-selected tabs if isLazy and lazy behavior is keepMounted", async () => {
  const { user } = render(
    <Tabs.Root defaultValue="1" isLazy lazyBehavior="keepMounted">
      <Tabs.List>
        <Tabs.Trigger value="1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="2">Tab 2</Tabs.Trigger>
      </Tabs.List>
      <Tabs.ContentGroup>
        <Tabs.Content value="1">
          <p>Panel 1</p>
        </Tabs.Content>
        <Tabs.Content value="2">
          <p>Panel 2</p>
        </Tabs.Content>
      </Tabs.ContentGroup>
    </Tabs.Root>,
  )

  expect(screen.getByText("Panel 1")).toBeInTheDocument()
  expect(screen.queryByText("Panel 2")).not.toBeInTheDocument()

  await user.click(screen.getByText("Tab 2"))

  expect(screen.queryByText("Panel 1")).toBeInTheDocument()
  expect(screen.getByText("Panel 2")).toBeInTheDocument()
})
