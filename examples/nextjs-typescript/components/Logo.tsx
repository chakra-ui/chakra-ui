import {
  keyframes,
  IconProps,
  chakra,
  usePrefersReducedMotion,
} from "@chakra-ui/react"

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

export const Logo = (props: IconProps) => {
  const prefersReducedMotion = usePrefersReducedMotion()

  const animation = prefersReducedMotion
    ? undefined
    : `${spin} infinite 20s linear`

  return (
    <chakra.svg
      width="582"
      height="582"
      viewBox="0 0 582 582"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animation={animation}
      {...props}
    >
      <rect width="582" height="582" rx="291" fill="url(#paint0_linear)" />
      <path
        d="M157.521 303.421l198.36-196.995c3.706-3.68 9.669.799 7.168 5.383L289.22 247.123c-1.647 3.018.538 6.698 3.976 6.698h127.586c4.11 0 6.095 5.036 3.09 7.84L200.293 470.326c-4.009 3.741-9.976-1.53-6.757-5.97l105.837-146.005c2.17-2.994.031-7.187-3.667-7.187H160.713c-4.043 0-6.06-4.894-3.192-7.743z"
        fill="#fff"
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="291"
          y1="0"
          x2="291"
          y2="582"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7BCBD4" />
          <stop offset="1" stop-color="#29C6B7" />
        </linearGradient>
      </defs>
    </chakra.svg>
  )
}
