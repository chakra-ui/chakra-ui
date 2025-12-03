"use client"

import TaskItem from "@tiptap/extension-task-item"
import TaskList from "@tiptap/extension-task-list"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import {
  RichTextEditorButtonGroup,
  RichTextEditorContent,
  RichTextEditorRoot,
  createButtonControl,
} from "compositions/ui/rich-text-editor"
import { LuArrowLeft, LuArrowRight, LuListChecks } from "react-icons/lu"

export function RichTextEditorTask() {
  const editor = useEditor({
    extensions: [StarterKit, TaskList, TaskItem.configure({ nested: true })],
    content: `
      <ul data-type="taskList">
        <li data-type="taskItem" data-checked="false">Write introduction</li>
        <li data-type="taskItem" data-checked="true">Set up editor</li>
        <li data-type="taskItem" data-checked="false">Add toolbar controls</li>
      </ul>
    `,
  })

  if (!editor) return null

  return (
    <RichTextEditorRoot editor={editor}>
      <RichTextEditorButtonGroup>
        <TaskListButton />
        <IndentTaskButton />
        <OutdentTaskButton />
      </RichTextEditorButtonGroup>
      <RichTextEditorContent />
    </RichTextEditorRoot>
  )
}

const TaskListButton = createButtonControl({
  label: "Toggle Task List",
  icon: LuListChecks,
  command: (editor) => editor.chain().focus().toggleTaskList().run(),
})

const IndentTaskButton = createButtonControl({
  label: "Indent Task",
  icon: LuArrowRight,
  command: (editor) => editor.chain().focus().sinkListItem("taskItem").run(),
})

const OutdentTaskButton = createButtonControl({
  label: "Outdent Task",
  icon: LuArrowLeft,
  command: (editor) => editor.chain().focus().liftListItem("taskItem").run(),
})
