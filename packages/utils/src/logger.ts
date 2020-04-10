import { __DEV__ } from "./assertion"

export function warn(options: { condition: boolean; message: string }) {
  if (options.condition && __DEV__) {
    console.warn(options.message)
  }
}

export function error(options: { condition: boolean; message: string }) {
  if (options.condition && __DEV__) {
    console.error(options.message)
  }
}
