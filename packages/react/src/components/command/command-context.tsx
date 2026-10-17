"use client"

import { createContext } from "../../create-context"
import type { CommandSource, UseCommandReturn } from "./use-command"

export interface UseCommandContext extends UseCommandReturn {}

export const [CommandContextProvider, useCommandContext] =
  createContext<UseCommandContext>({
    name: "CommandContext",
    hookName: "useCommandContext",
    providerName: "<Command.Root />",
  })

export const [CommandSourceProvider, useCommandSourceContext] = createContext<
  CommandSource<any> | undefined
>({
  name: "CommandSourceContext",
  strict: false,
})
