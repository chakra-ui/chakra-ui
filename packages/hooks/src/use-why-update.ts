import * as React from "react"

export function useWhyDidYouUpdate(name: string, props: any) {
  const previousProps = React.useRef<any>()

  React.useEffect(() => {
    if (previousProps.current) {
      const allKeys = Object.keys({ ...previousProps.current, ...props })
      const changesObj = {}
      allKeys.forEach((key) => {
        if (previousProps.current[key] !== props[key]) {
          changesObj[key] = {
            from: previousProps.current[key],
            to: props[key],
          }
        }
      })

      if (Object.keys(changesObj).length) {
        console.log("[why-did-you-update]", name, changesObj)
      }
    }

    previousProps.current = props
  })
}
