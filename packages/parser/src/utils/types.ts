export type Nil = null | undefined

type ArrayProp<T> = Array<T | null>

interface ObjectProp<T> {
  [breakpoint: string]: T
}

type ResponsiveProp<T> = ArrayProp<T> | ObjectProp<T>

export type Prop<T> = T | ResponsiveProp<T> | Nil

export type Length = string | 0 | number
