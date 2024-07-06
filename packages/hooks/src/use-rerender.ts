"use client"

import { useCallback, useState } from "react"

export const useRerender = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setState] = useState({})
  return useCallback(() => setState({}), [])
}
