import { useTheme } from "../system"

const getBreakpoint = (theme: Record<string, any>, value: any) => {
  return theme?.breakpoints?.[value] ?? value
}

export interface UseQueryProps {
  breakpoint?: string
  below?: string
  above?: string
}

export function useQuery(props: UseQueryProps) {
  const { breakpoint = "", below, above } = props

  const theme = useTheme()
  const bpBelow = getBreakpoint(theme, below)
  const bpAbove = getBreakpoint(theme, above)

  let query = breakpoint

  if (bpBelow) {
    query = `(max-width: ${bpBelow})`
  } else if (bpAbove) {
    query = `(min-width: ${bpAbove})`
  }

  return query
}
