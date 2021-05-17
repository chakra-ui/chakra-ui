const runIfFn = (value: any, ...args: any[]) =>
  typeof value === "function" ? value(...args) : value

type AssignObject<T extends (...args: any[]) => any> = {
  [P in keyof Parameters<T>[0]]?:
    | undefined
    | ((context: Parameters<T>[0], event: any) => Parameters<T>[0][P])
    | Parameters<T>[0][P]
}

type AssignFunction<T extends (...args: any[]) => any> = (
  context: Parameters<T>[0],
  event: any,
) => Partial<Parameters<T>[0]>

type ActionFn = (context: any, event: any) => any
type Action = string | ActionFn

type AssignArgs<T extends ActionFn> = AssignObject<T> | AssignFunction<T>

type Flat<T extends Action | Action[]> = T extends any[] ? T[0] : T

export function assign<T extends Action | Action[]>(
  objectOrFunction: AssignArgs<Exclude<Flat<T>, string>>,
) {
  const fn = (ctx: any, evt: any) => {
    const values = runIfFn(objectOrFunction, ctx, evt)
    for (const key in values) {
      ctx[key] = runIfFn(values[key], ctx, evt)
    }
  }
  return fn as Exclude<Flat<T>, string>
}
