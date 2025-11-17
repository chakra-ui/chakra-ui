# @chakra-ui/tiptap-editor

A customizable and accessible rich text editor for Chakra UI, built on top of
[Tiptap](https://www.tiptap.dev/).

## Features

- **Rich text editing** with support for headings, lists, bold, italic, and more
- **Accessible** UI components built with Chakra UI
- **Customizable** toolbar with individual components
- **Type-safe** with full TypeScript support
- **Easy to use** with sensible defaults

## Installation

```bash
npm install @chakra-ui/tiptap-editor @tiptap/react @tiptap/starter-kit
```

## Usage

### Basic Example

```tsx
import { Box } from "@chakra-ui/react"
import {
  EditorProvider,
  EditorRoot,
  TextFormatToolbar,
  ToolbarRoot,
  useEditor,
} from "@chakra-ui/tiptap-editor"

function MyEditor() {
  const editor = useEditor({
    content: "<h1>Hello World</h1>",
  })

  return (
    <EditorProvider editor={editor}>
      <Box>
        <ToolbarRoot>
          <TextFormatToolbar />
        </ToolbarRoot>
        <EditorRoot />
      </Box>
    </EditorProvider>
  )
}
```

### Available Toolbar Components

- `TextFormatToolbar` - Bold, Italic, Underline, Strikethrough
- `HeadingToolbar` - Heading levels 1-3
- `ListToolbar` - Bullet and ordered lists
- `BlockquoteToolbar` - Blockquote toggle
- `CodeToolbar` - Inline code and code blocks
- `UndoRedoToolbar` - Undo and redo actions
- `ToolbarSeparator` - Visual separator between toolbar groups

### Custom Toolbar

```tsx
import { Box } from "@chakra-ui/react"
import {
  EditorProvider,
  EditorRoot,
  HeadingToolbar,
  TextFormatToolbar,
  ToolbarRoot,
  ToolbarSeparator,
  useEditor,
} from "@chakra-ui/tiptap-editor"

function CustomEditor() {
  const editor = useEditor()

  return (
    <EditorProvider editor={editor}>
      <Box>
        <ToolbarRoot
          gap={1}
          p={2}
          borderBottom="1px solid"
          borderColor="gray.200"
        >
          <TextFormatToolbar />
          <ToolbarSeparator />
          <HeadingToolbar />
        </ToolbarRoot>
        <EditorRoot p={4} minH="200px" />
      </Box>
    </EditorProvider>
  )
}
```

## API

### `useEditor`

Hook for creating and managing a Tiptap editor instance.

```tsx
const editor = useEditor({
  content: '<p>Hello</p>',
  extensions: [...], // optional custom extensions
})
```

### `EditorProvider`

Context provider that makes the editor available to all child components.

```tsx
<EditorProvider editor={editor}>
  {/* Editor and toolbar components */}
</EditorProvider>
```

### `EditorRoot`

Main editor component that renders the editable content. Uses context
automatically.

```tsx
<EditorRoot p={4} minH="200px" />
```

### `ToolbarRoot`

Container for toolbar components. Uses context automatically.

```tsx
<ToolbarRoot gap={1} p={2}>
  {/* toolbar components */}
</ToolbarRoot>
```

### `useEditorContext`

Hook to access the editor instance from any component within `EditorProvider`.

```tsx
function CustomComponent() {
  const { editor } = useEditorContext()
  // Use editor instance
}
```

## License

MIT
