export { walkObject, mapObject } from "@chakra-ui/styled-system/helpers"

export type MappedObject<T, K> = {
  [Prop in keyof T]: T[Prop] extends Array<any>
    ? MappedObject<T[Prop][number], K>[]
    : T[Prop] extends Record<string, unknown>
      ? MappedObject<T[Prop], K>
      : K
}

export type WalkObjectStopFn = (value: any, path: string[]) => boolean

export interface WalkObjectOptions {
  stop?: WalkObjectStopFn | undefined
  getKey?(prop: string, value: any): string
}
