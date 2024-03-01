import { spinner } from "@clack/prompts"
import { format } from "prettier"

export function unionType(values: Iterable<any>) {
  return Array.from(values)
    .map((value) => JSON.stringify(value))
    .join(" | ")
}

export function pretty(value: any) {
  return format(value, { parser: "typescript" })
}

export function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export const isBooleanValue = (value: string) =>
  value === "true" || value === "false"

type Task = {
  /**
   * Task title
   */
  title: string
  /**
   * Task function
   */
  task: (
    message: (string: string) => void,
  ) => string | Promise<string> | void | Promise<void>

  /**
   * If enabled === false the task will be skipped
   */
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
