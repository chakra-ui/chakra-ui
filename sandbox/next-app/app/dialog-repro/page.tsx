"use client"

import {
  Box,
  Button,
  Dialog,
  Drawer,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react"
import { useCallback, useEffect, useState } from "react"

/** Delay between each open/close toggle during spam tests */
const SPAM_INTERVAL_MS = 400

/**
 * Repro for GH #10769: inherited `--z-index` on html could make
 * `z-index: var(--z-index)` on the backdrop exceed the shell stack.
 * Tests Dialog and Drawer with the same stacking rules, including a drawer
 * opened from inside a dialog (layer-index / z-index stacking).
 */
export default function DialogReproPage() {
  const [pollute, setPollute] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [dialogSpamming, setDialogSpamming] = useState(false)
  const [drawerSpamming, setDrawerSpamming] = useState(false)
  const [nestedDialogOpen, setNestedDialogOpen] = useState(false)
  const [nestedDrawerOpen, setNestedDrawerOpen] = useState(false)

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--z-index",
      pollute ? "99999" : "",
    )
    return () => {
      document.documentElement.style.removeProperty("--z-index")
    }
  }, [pollute])

  const spamDialogToggle = useCallback(() => {
    setDialogSpamming(true)
    let n = 0
    const id = window.setInterval(() => {
      setDialogOpen((o) => !o)
      n += 1
      if (n >= 48) {
        window.clearInterval(id)
        setDialogSpamming(false)
        setDialogOpen(false)
      }
    }, SPAM_INTERVAL_MS)
  }, [])

  const spamDrawerToggle = useCallback(() => {
    setDrawerSpamming(true)
    let n = 0
    const id = window.setInterval(() => {
      setDrawerOpen((o) => !o)
      n += 1
      if (n >= 48) {
        window.clearInterval(id)
        setDrawerSpamming(false)
        setDrawerOpen(false)
      }
    }, SPAM_INTERVAL_MS)
  }, [])

  return (
    <Box p="8" maxW="lg" mx="auto">
      <VStack align="stretch" gap="8">
        <Heading size="lg">Dialog &amp; Drawer z-index repro (#10769)</Heading>
        <Text color="fg.muted">
          With &quot;Pollute --z-index&quot; on, the document sets{" "}
          <code>html &#123; --z-index: 99999 &#125;</code>. Panels should stay
          above the dim layer for both components; spam toggles stress presence.
          Use the nested section to confirm the drawer sits above the dialog
          backdrop.
        </Text>

        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input
            type="checkbox"
            checked={pollute}
            onChange={(e) => setPollute(e.target.checked)}
          />
          Pollute <code>--z-index</code> on &lt;html&gt;
        </label>

        <VStack align="stretch" gap="4">
          <Heading size="md">Dialog</Heading>
          <Dialog.Root
            lazyMount
            unmountOnExit
            open={dialogOpen}
            onOpenChange={(e) => setDialogOpen(e.open)}
          >
            <Dialog.Trigger asChild>
              <Button>Open dialog</Button>
            </Dialog.Trigger>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Modal</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <Text>
                    If the panel ever appears <strong>behind</strong> the dim
                    overlay, stacking is wrong.
                  </Text>
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button variant="outline">Close</Button>
                  </Dialog.ActionTrigger>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Positioner>
          </Dialog.Root>

          <Button
            variant="surface"
            onClick={spamDialogToggle}
            disabled={dialogSpamming}
          >
            {dialogSpamming
              ? "Spamming…"
              : "Spam dialog open/close (48 toggles)"}
          </Button>
        </VStack>

        <VStack align="stretch" gap="4">
          <Heading size="md">Nested: drawer inside dialog</Heading>
          <Text color="fg.muted" fontSize="sm">
            Open the dialog, then open the drawer from inside it. The drawer
            sheet and its dim layer should stack above the dialog&apos;s dim
            layer.
          </Text>
          <Dialog.Root
            lazyMount
            unmountOnExit
            open={nestedDialogOpen}
            onOpenChange={(e) => {
              setNestedDialogOpen(e.open)
              if (!e.open) setNestedDrawerOpen(false)
            }}
          >
            <Dialog.Trigger asChild>
              <Button variant="outline">Open dialog (nested test)</Button>
            </Dialog.Trigger>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Outer dialog</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <VStack align="stretch" gap="4">
                    <Text>
                      This dialog is the lower layer. Use the button below to
                      open a drawer on top.
                    </Text>
                    <Drawer.Root
                      lazyMount
                      unmountOnExit
                      open={nestedDrawerOpen}
                      onOpenChange={(e) => setNestedDrawerOpen(e.open)}
                    >
                      <Drawer.Trigger asChild>
                        <Button colorPalette="blue">
                          Open drawer from dialog
                        </Button>
                      </Drawer.Trigger>
                      <Drawer.Backdrop />
                      <Drawer.Positioner>
                        <Drawer.Content>
                          <Drawer.Header>
                            <Drawer.Title>Inner drawer</Drawer.Title>
                          </Drawer.Header>
                          <Drawer.Body>
                            <Text>
                              If this panel or its backdrop appears{" "}
                              <strong>under</strong> the dialog dim layer,
                              nested stacking is wrong.
                            </Text>
                          </Drawer.Body>
                          <Drawer.Footer>
                            <Drawer.ActionTrigger asChild>
                              <Button variant="outline">Close drawer</Button>
                            </Drawer.ActionTrigger>
                          </Drawer.Footer>
                        </Drawer.Content>
                      </Drawer.Positioner>
                    </Drawer.Root>
                  </VStack>
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button variant="outline">Close dialog</Button>
                  </Dialog.ActionTrigger>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Positioner>
          </Dialog.Root>
        </VStack>

        <VStack align="stretch" gap="4">
          <Heading size="md">Drawer</Heading>
          <Drawer.Root
            lazyMount
            unmountOnExit
            open={drawerOpen}
            onOpenChange={(e) => setDrawerOpen(e.open)}
          >
            <Drawer.Trigger asChild>
              <Button>Open drawer</Button>
            </Drawer.Trigger>
            <Drawer.Backdrop />
            <Drawer.Positioner>
              <Drawer.Content>
                <Drawer.Header>
                  <Drawer.Title>Drawer</Drawer.Title>
                </Drawer.Header>
                <Drawer.Body>
                  <Text>
                    Same stacking rule as dialog: sheet should stay{" "}
                    <strong>above</strong> the dim overlay.
                  </Text>
                </Drawer.Body>
                <Drawer.Footer>
                  <Drawer.ActionTrigger asChild>
                    <Button variant="outline">Close</Button>
                  </Drawer.ActionTrigger>
                </Drawer.Footer>
              </Drawer.Content>
            </Drawer.Positioner>
          </Drawer.Root>

          <Button
            variant="surface"
            onClick={spamDrawerToggle}
            disabled={drawerSpamming}
          >
            {drawerSpamming
              ? "Spamming…"
              : "Spam drawer open/close (48 toggles)"}
          </Button>
        </VStack>
      </VStack>
    </Box>
  )
}
