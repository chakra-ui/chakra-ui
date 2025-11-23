import { RichTextEditor } from "@chakra-ui/tiptap-editor"
import TaskItem from "@tiptap/extension-task-item"
import TaskList from "@tiptap/extension-task-list"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

export function RichTextEditorTask() {
  const editor = useEditor({
    content: `
      <ul data-type="taskList">
        <li data-type="taskItem" data-checked="false">Write introduction</li>
        <li data-type="taskItem" data-checked="true">Set up editor</li>
        <li data-type="taskItem" data-checked="false">Add toolbar controls</li>
      </ul>
    `,
    shouldRerenderOnTransaction: true,
    extensions: [StarterKit, TaskList, TaskItem.configure({ nested: true })],
  })

  return (
    <RichTextEditor.Root editor={editor}>
      <RichTextEditor.Toolbar>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.TaskList />
          <RichTextEditor.IndentTask />
          <RichTextEditor.OutdentTask />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>
      <RichTextEditor.Content />
    </RichTextEditor.Root>
  )
}
