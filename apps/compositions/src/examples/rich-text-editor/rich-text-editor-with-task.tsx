"use client"

import { HStack } from "@chakra-ui/react"
import TaskItem from "@tiptap/extension-task-item"
import TaskList from "@tiptap/extension-task-list"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import {
  RichTextEditorContent,
  RichTextEditorControlGroup,
  RichTextEditorRoot,
  createBooleanControl,
} from "compositions/ui/rich-text-editor"
import { LuArrowLeft, LuArrowRight, LuListChecks, LuPlus } from "react-icons/lu"

export const RichTextEditorWithTask = () => {
  const editor = useEditor({
    extensions: [StarterKit, TaskList, TaskItem.configure({ nested: true })],
    content: `
      <h2>Project Tasks</h2>
      <p>Use the toolbar to manage your tasks:</p>
      <ul data-type="taskList">
        <li data-type="taskItem" data-checked="false">Write introduction</li>
        <li data-type="taskItem" data-checked="true">Set up editor</li>
        <li data-type="taskItem" data-checked="false">Add toolbar controls</li>
      </ul>
      <p>Keep adding tasks to track your progress!</p>
    `,
    shouldRerenderOnTransaction: true,
  })

  if (!editor) return null

  return (
    <RichTextEditorRoot
      editor={editor}
      border="1px solid"
      borderColor="border"
      rounded="md"
    >
      <HStack gap="2" p="2" borderBottom="1px solid" borderColor="border">
        <RichTextEditorControlGroup>
          <ToggleTaskList />
          <IndentTask />
          <OutdentTask />
          <AddTask />
        </RichTextEditorControlGroup>
      </HStack>
      <RichTextEditorContent />
    </RichTextEditorRoot>
  )
}

const ToggleTaskList = createBooleanControl({
  label: "Toggle Task List",
  icon: LuListChecks,
  command: (editor) => editor.chain().focus().toggleTaskList().run(),
})

const IndentTask = createBooleanControl({
  label: "Indent Task",
  icon: LuArrowRight,
  command: (editor) => editor.chain().focus().sinkListItem("taskItem").run(),
})

const OutdentTask = createBooleanControl({
  label: "Outdent Task",
  icon: LuArrowLeft,
  command: (editor) => editor.chain().focus().liftListItem("taskItem").run(),
})

const AddTask = createBooleanControl({
  label: "Add Task",
  icon: LuPlus,
  command: (editor) =>
    editor
      .chain()
      .focus()
      .insertContent(
        `<li data-type="taskItem" data-checked="false">New task</li>`,
      )
      .run(),
})
