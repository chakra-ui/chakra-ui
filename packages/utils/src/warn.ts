export interface WarnOptions {
  condition: boolean
  message: string
}

export const warn = (options: WarnOptions) => {
  const { condition, message } = options
  if (condition && process.env.NODE_ENV !== "production") {
    console.warn(message)
  }
}
