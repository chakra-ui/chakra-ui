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

export interface CommandProviderContext {
  /**
   * The value passed to `Command.Provider`.
   */
  value: CommandSource<any>
  /**
   * The id that labels the command, e.g. the dialog title.
   */
  labelId: string
}

export const [CommandProviderContextProvider, useCommandProviderContext] =
  createContext<CommandProviderContext | undefined>({
    name: "CommandProviderContext",
    strict: false,
  })
