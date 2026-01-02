"use client"

import { Extension } from "@tiptap/core"
import Subscript from "@tiptap/extension-subscript"
import Superscript from "@tiptap/extension-superscript"
import TextAlign from "@tiptap/extension-text-align"
import { TextStyle } from "@tiptap/extension-text-style"
import { PluginKey } from "@tiptap/pm/state"
import { ReactRenderer, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Suggestion } from "@tiptap/suggestion"
import { Control, RichTextEditor } from "compositions/ui/rich-text-editor"
import {
  type FloatingMenuProps,
  SuggestionMenu,
} from "compositions/ui/rich-text-editor-menu"
import { LuCode, LuHash, LuList, LuListOrdered, LuQuote } from "react-icons/lu"

export const RichTextEditorWithSlashCommands = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Subscript,
      Superscript,
      TextAlign.configure({ types: ["paragraph", "heading"] }),
      TextStyle,
      SlashCommandsExtension,
    ],
    content: `<h1>Slash Commands Editor</h1><p>Type <strong>/</strong> to see commands</p>`,
    shouldRerenderOnTransaction: true,
  })

  if (!editor) return null

  return (
    <RichTextEditor.Root editor={editor} borderWidth="1px" rounded="sm">
      <RichTextEditor.Toolbar>
        <RichTextEditor.ControlGroup>
          <Control.Bold />
          <Control.Italic />
          <Control.Strikethrough />
          <Control.Code />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <Control.H1 />
          <Control.H2 />
          <Control.H3 />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <Control.BulletList />
          <Control.OrderedList />
          <Control.Blockquote />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <Control.Undo />
          <Control.Redo />
        </RichTextEditor.ControlGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor.Root>
  )
}

interface SlashCommand {
  id: string
  label: string
  description: string
  icon: any
  command: (props: { editor: any; range: any }) => void
}

const SLASH_COMMANDS: SlashCommand[] = [
  {
    id: "heading1",
    label: "Heading 1",
    description: "Large section heading",
    icon: LuHash,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 1 })
        .run()
    },
  },
  {
    id: "heading2",
    label: "Heading 2",
    description: "Medium section heading",
    icon: LuHash,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 2 })
        .run()
    },
  },
  {
    id: "heading3",
    label: "Heading 3",
    description: "Small section heading",
    icon: LuHash,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 3 })
        .run()
    },
  },
  {
    id: "bullet",
    label: "Bullet List",
    description: "Create a bullet list",
    icon: LuList,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run()
    },
  },
  {
    id: "numbered",
    label: "Numbered List",
    description: "Create a numbered list",
    icon: LuListOrdered,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run()
    },
  },
  {
    id: "quote",
    label: "Quote",
    description: "Add a blockquote",
    icon: LuQuote,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBlockquote().run()
    },
  },
  {
    id: "code",
    label: "Code Block",
    description: "Add a code block",
    icon: LuCode,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleCodeBlock().run()
    },
  },
]

const SlashCommandsExtension = Extension.create({
  name: "slashCommands",

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        char: "/",
        pluginKey: new PluginKey("slashCommands"),

        command: ({
          editor,
          range,
          props,
        }: {
          editor: any
          range: any
          props: SlashCommand
        }) => {
          props.command({ editor, range })
        },

        items: ({ query }: { query: string }) =>
          SLASH_COMMANDS.filter((command) =>
            command.label.toLowerCase().includes(query.toLowerCase()),
          ),

        render: () => {
          let component: ReactRenderer<
            HTMLDivElement,
            FloatingMenuProps
          > | null = null
          let container: HTMLDivElement | null = null
          let selectedIndex = 0

          return {
            onStart(props) {
              selectedIndex = 0
              container = document.createElement("div")
              document.body.appendChild(container)

              component = new ReactRenderer(SuggestionMenu, {
                props: {
                  items: props.items,
                  selectedIndex,
                  onSelect: (item: SlashCommand) => props.command(item),
                  clientRect: props.clientRect,
                },
                editor: props.editor,
              })

              container.appendChild(component.element)
            },

            onUpdate(props) {
              if (!component) return
              component.updateProps({
                items: props.items,
                selectedIndex,
                onSelect: (item: SlashCommand) => props.command(item),
                clientRect: props.clientRect,
              })
            },

            onKeyDown({ event }) {
              if (!component) return false

              if (event.key === "ArrowUp") {
                selectedIndex =
                  (selectedIndex - 1 + component.props.items.length) %
                  component.props.items.length
                component.updateProps({ ...component.props, selectedIndex })
                return true
              }

              if (event.key === "ArrowDown") {
                selectedIndex =
                  (selectedIndex + 1) % component.props.items.length
                component.updateProps({ ...component.props, selectedIndex })
                return true
              }

              if (event.key === "Enter") {
                const item = component.props.items[selectedIndex]
                if (item) component.props.onSelect(item)
                return true
              }

              if (event.key === "Escape") return true

              return false
            },

            onExit() {
              if (container) container.remove()
              container = null
              if (component) component.destroy()
              component = null
            },
          }
        },
      }),
    ]
  },
})
