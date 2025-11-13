"use client"

import {
  Box,
  Button,
  Flex,
  HStack,
  Splitter,
  Text,
  VStack,
  useSplitter,
} from "@chakra-ui/react"
import { type JSX } from "react"
import {
  LuLayoutDashboard,
  LuLayoutGrid,
  LuLayoutList,
  LuMaximize2,
} from "react-icons/lu"
import { useLocalStorage } from "react-use"

type LayoutType = "single" | "vertical" | "horizontal" | "grid"

type SplitterPrefs = {
  layout: LayoutType
  sizes: number[]
}

const CONTENT = {
  code: {
    title: "Code",
    filename: "counter.tsx",
    content: `// Counter Example`,
  },
  preview: {
    title: "Preview",
    filename: "preview.html",
    content: `<div>Preview</div>`,
  },
  frontend: {
    title: "Frontend",
    filename: "app.jsx",
    content: `function App() {}`,
  },
  backend: { title: "Backend", filename: "api.js", content: `app.get('/api')` },
  styles: { title: "Styles", filename: "style.css", content: `.container {}` },
  config: {
    title: "Config",
    filename: "next.config.js",
    content: `module.exports = {}`,
  },
}

export const SplitterComposition = () => {
  const [prefsRaw, setPrefsRaw] =
    useLocalStorage<SplitterPrefs>("splitter-prefs")

  const prefs: SplitterPrefs = prefsRaw ?? {
    layout: "vertical",
    sizes: [50, 50],
  }

  const layoutIcons: Record<LayoutType, JSX.Element> = {
    single: <LuMaximize2 />,
    vertical: <LuLayoutList />,
    horizontal: <LuLayoutDashboard />,
    grid: <LuLayoutGrid />,
  }

  const splitter = useSplitter({
    defaultSize: prefs.layout === "single" ? [100, 0] : prefs.sizes,
    panels: [{ id: "a" }, { id: "b" }],
    orientation: prefs.layout === "vertical" ? "horizontal" : "vertical",
    onResizeEnd: (details) =>
      setPrefsRaw({ layout: prefs.layout, sizes: details.size }),
  })

  return (
    <VStack gap={3} h="100vh" w="100%" p={3}>
      <HStack gap={2} justify="flex-end" w="full">
        {(Object.keys(layoutIcons) as LayoutType[]).map((l) => (
          <Button
            key={l}
            size="sm"
            variant={prefs.layout === l ? "solid" : "outline"}
            onClick={() => setPrefsRaw({ layout: l, sizes: prefs.sizes })}
          >
            <HStack gap={1}>
              {layoutIcons[l]}
              <Text>{l.toUpperCase()}</Text>
            </HStack>
          </Button>
        ))}
      </HStack>

      <Box flex="1" w="100%" minH="0">
        {prefs.layout === "grid" ? (
          <GridLayout />
        ) : (
          <Splitter.RootProvider value={splitter}>
            <Splitter.Panel id="a">
              <EditorPanel {...CONTENT.code} />
            </Splitter.Panel>

            {prefs.layout !== "single" && (
              <Splitter.ResizeTrigger id="a:b" aria-label="Resize panels" />
            )}

            <Splitter.Panel id="b">
              {prefs.layout === "single" ? null : (
                <EditorPanel {...CONTENT.preview} />
              )}
            </Splitter.Panel>
          </Splitter.RootProvider>
        )}
      </Box>

      <HStack justify="space-between" w="100%" px={2}>
        <Text fontSize="sm" color="fg.muted">
          Drag panels to resize | Layout:{" "}
          <Text as="span" color="fg.default">
            {prefs.layout.toUpperCase()}
          </Text>
        </Text>
      </HStack>
    </VStack>
  )
}

const EditorPanel = ({
  title,
  filename,
  content,
}: {
  title: string
  filename: string
  content: string
}) => (
  <VStack
    h="100%"
    borderRadius="md"
    shadow="sm"
    align="stretch"
    bg="bg.subtle"
    border="1px solid"
    borderColor="border"
  >
    <VStack px="3" py="2" align="stretch">
      <Text fontSize="sm" fontWeight="bold" color="fg.default">
        {title}
      </Text>
      <Text fontSize="xs" color="fg.muted">
        {filename}
      </Text>
    </VStack>

    <Box
      flex="1"
      overflow="auto"
      p="3"
      fontFamily="mono"
      fontSize="xs"
      color="fg.default"
      bg="bg.surface"
    >
      <pre>{content}</pre>
    </Box>

    <HStack
      px="3"
      py="1"
      fontSize="xs"
      color="fg.muted"
      justify="space-between"
    >
      <span>{content.split("\n").length} lines</span>
      <span>●</span>
    </HStack>
  </VStack>
)

const GridLayout = () => (
  <Flex wrap="wrap" gap={3} h="100%">
    {["frontend", "backend", "styles", "config"].map((key) => (
      <Box flex="1" minW="45%" key={key}>
        <EditorPanel {...CONTENT[key as keyof typeof CONTENT]} />
      </Box>
    ))}
  </Flex>
)
