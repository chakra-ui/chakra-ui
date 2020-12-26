declare module "nano-memoize" {
  interface MemoizeOptions {
    maxArgs?: number
    callTimeout?: number
    maxAge?: number
    serializer?: function
    equals?: function
    vargs?: boolean
  }

  export default function memoize<T>(
    fn: T,
    options?: MemoizeOptions,
  ): T & { clear: () => void }
}
