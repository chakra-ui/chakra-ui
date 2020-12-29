export type PropsPath<T extends object> = {
  [P in keyof T]: T[P] extends object
    ? `${string & P}` | `${string & P}.${PropsPath<T[P]>}`
    : `${string & P}`
}[T extends any[] ? number & keyof T : keyof T]
