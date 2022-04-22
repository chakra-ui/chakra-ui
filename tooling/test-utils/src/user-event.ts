import $userEvent from "@testing-library/user-event"
import { act } from "@testing-library/react"
import { press } from "./press"
import { sleep } from "./utils"

type Writeable<T> = { -readonly [P in keyof T]: T[P] }

type PatchResult = Omit<Writeable<typeof $userEvent>, "setup"> & {
  press: typeof press
  setup: (...args: any[]) => PatchResult
}

function patch($value: any) {
  const result = Object.entries($value).reduce((acc, [key, value]) => {
    if (key === "setup") {
      //@ts-expect-error
      acc[key] = (...args: any[]) => ({ ...patch(value(...args)), press })
    } else {
      acc[key] = async (...args: any[]) => {
        act(() => {
          //@ts-expect-error
          value(...args)
        })
        await sleep()
      }
    }

    return acc
  }, {} as any)

  return result as PatchResult
}

const userEvent = { ...patch($userEvent), press }

export { userEvent }
