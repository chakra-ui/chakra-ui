import { Tabs, useTabs } from "@chakra-ui/react"
import * as React from "react"
import { render } from "./core/render"

describe("Tabs", () => {
  it("does not dispatch a click on link triggers when the value changes programmatically", async () => {
    const clicks: unknown[] = []

    function Demo() {
      const [value, setValue] = React.useState("a")
      const ref = React.useRef<HTMLAnchorElement>(null)

      React.useEffect(() => {
        const el = ref.current
        if (!el) return
        // native listener catches even non-bubbling synthetic events
        const onClick = (event: MouseEvent) => clicks.push(event)
        el.addEventListener("click", onClick)
        return () => el.removeEventListener("click", onClick)
      }, [])

      return (
        <>
          <button data-testid="switch" onClick={() => setValue("b")}>
            Switch
          </button>
          <Tabs.Root value={value} onValueChange={(e) => setValue(e.value)}>
            <Tabs.List>
              <Tabs.Trigger value="a">A</Tabs.Trigger>
              <Tabs.Trigger asChild value="b">
                <a ref={ref} href="/b" data-testid="trigger-b">
                  B
                </a>
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="a">Content A</Tabs.Content>
            <Tabs.Content value="b">Content B</Tabs.Content>
          </Tabs.Root>
        </>
      )
    }

    const { getByTestId, user } = render(<Demo />)

    await user.click(getByTestId("switch"))
    // give the machine's microtask-queued click a chance to run
    await new Promise((resolve) => setTimeout(resolve, 0))

    expect(getByTestId("trigger-b")).toHaveAttribute("aria-selected", "true")
    expect(clicks).toHaveLength(0)
  })

  it("fires onClick on an asChild trigger and updates the selection", async () => {
    const onClick = vi.fn()

    const { getByTestId, user } = render(
      <Tabs.Root defaultValue="a">
        <Tabs.List>
          <Tabs.Trigger value="a">A</Tabs.Trigger>
          <Tabs.Trigger asChild value="b">
            <a href="/b" data-testid="trigger-b" onClick={onClick}>
              B
            </a>
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="a">Content A</Tabs.Content>
        <Tabs.Content value="b">Content B</Tabs.Content>
      </Tabs.Root>,
    )

    await user.click(getByTestId("trigger-b"))

    expect(onClick).toHaveBeenCalledTimes(1)
    expect(getByTestId("trigger-b")).toHaveAttribute("aria-selected", "true")
  })

  it("still invokes a user-provided navigate prop", async () => {
    const navigate = vi.fn()

    const { getByTestId, user } = render(
      <Tabs.Root defaultValue="a" navigate={navigate}>
        <Tabs.List>
          <Tabs.Trigger value="a">A</Tabs.Trigger>
          <Tabs.Trigger asChild value="b">
            <a href="/b" data-testid="trigger-b">
              B
            </a>
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="a">Content A</Tabs.Content>
        <Tabs.Content value="b">Content B</Tabs.Content>
      </Tabs.Root>,
    )

    await user.click(getByTestId("trigger-b"))
    await new Promise((resolve) => setTimeout(resolve, 0))

    expect(navigate).toHaveBeenCalled()
  })

  it("does not dispatch a click on link triggers when the value changes programmatically via the store", async () => {
    const clicks: unknown[] = []

    function Demo() {
      const tabs = useTabs({ defaultValue: "a" })
      const ref = React.useRef<HTMLAnchorElement>(null)

      React.useEffect(() => {
        const el = ref.current
        if (!el) return
        // native listener catches even non-bubbling synthetic events
        const onClick = (event: MouseEvent) => clicks.push(event)
        el.addEventListener("click", onClick)
        return () => el.removeEventListener("click", onClick)
      }, [])

      return (
        <>
          <button data-testid="switch" onClick={() => tabs.setValue("b")}>
            Switch
          </button>
          <Tabs.RootProvider value={tabs}>
            <Tabs.List>
              <Tabs.Trigger value="a">A</Tabs.Trigger>
              <Tabs.Trigger asChild value="b">
                <a ref={ref} href="/b" data-testid="trigger-b">
                  B
                </a>
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="a">Content A</Tabs.Content>
            <Tabs.Content value="b">Content B</Tabs.Content>
          </Tabs.RootProvider>
        </>
      )
    }

    const { getByTestId, user } = render(<Demo />)

    await user.click(getByTestId("switch"))
    // give the machine's microtask-queued click a chance to run
    await new Promise((resolve) => setTimeout(resolve, 0))

    expect(getByTestId("trigger-b")).toHaveAttribute("aria-selected", "true")
    expect(clicks).toHaveLength(0)
  })

  it("still invokes a user-provided navigate prop via the store", async () => {
    const navigate = vi.fn()

    function Demo() {
      const tabs = useTabs({ defaultValue: "a", navigate })

      return (
        <Tabs.RootProvider value={tabs}>
          <Tabs.List>
            <Tabs.Trigger value="a">A</Tabs.Trigger>
            <Tabs.Trigger asChild value="b">
              <a href="/b" data-testid="trigger-b">
                B
              </a>
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="a">Content A</Tabs.Content>
          <Tabs.Content value="b">Content B</Tabs.Content>
        </Tabs.RootProvider>
      )
    }

    const { getByTestId, user } = render(<Demo />)

    await user.click(getByTestId("trigger-b"))
    await new Promise((resolve) => setTimeout(resolve, 0))

    expect(navigate).toHaveBeenCalled()
  })
})
