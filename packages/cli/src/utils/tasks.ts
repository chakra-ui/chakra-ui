import { spinner } from "@clack/prompts"

type MaybePromise<T> = T | Promise<T>

type MessageFn = (message: string) => void

interface Task {
  title: string
  task: (message: MessageFn) => MaybePromise<string | void>
  enabled?: boolean
}

export const tasks = async (tasks: Task[]) => {
  for (const task of tasks) {
    if (task.enabled === false) continue

    const s = spinner()
    s.start(task.title)
    try {
      const result = await task.task(s.message)
      s.stop(result || task.title)
    } catch (error) {
      s.stop(`${task.title}\n` + String(error))
      throw error
    }
  }
}
