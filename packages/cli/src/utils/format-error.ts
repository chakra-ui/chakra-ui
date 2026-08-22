export function formatCliError(error: unknown): string {
  if (error instanceof Error) return error.message
  return String(error)
}
