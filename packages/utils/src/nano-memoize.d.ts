declare module "nano-memoize" {
  interface MemoizeOptions {
    maxArgs?: number
    callTimeout?: number
    maxAge?: number
    serializer?: Function
    equals?: Function
    vargs?: boolean
  }

  export default function memoize<T extends (...args: any[]) => any>(
    fn: T,
    options?: MemoizeOptions,
  ): T & { clear: () => void }
}
