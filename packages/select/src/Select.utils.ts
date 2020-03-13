const rootOptions = [
  "m",
  "mt",
  "mr",
  "mb",
  "ml",
  "mx",
  "my",
  "margin",
  "marginTop",
  "marginBottom",
  "marginLeft",
  "marginRight",
  "marginY",
  "marginX",
  "flex",
  "flexBasis",
  "width",
  "minWidth",
  "maxWidth",
  "maxW",
  "minW",
  "w",
  "zIndex",
  "top",
  "right",
  "bottom",
  "left",
  "position",
  "pos",
]

export function splitProps(props: Record<string, any>) {
  const rootProps: Record<string, any> = {}
  const selectProps: Record<string, any> = {}

  for (const key in props) {
    if (rootOptions.includes(key)) {
      rootProps[key] = props[key]
    } else {
      selectProps[key] = props[key]
    }
  }

  return [rootProps, selectProps]
}
