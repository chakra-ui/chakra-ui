import { chakra, useColorModeValue, useTheme } from "@chakra-ui/core"
import { useEffect, useRef } from "react"
import { loadScript } from "utils/load-script"

export function CarbonAd(): JSX.Element {
  const ref = useRef<HTMLSpanElement | null>(null)

  const {
    colors: { gray },
  } = useTheme()
  const bg = useColorModeValue("gray.50", "rgba(36, 70, 93, 0.32)")

  const carbonAd = {
    ".carbon-img": {
      img: {
        display: "block",
      },
      marginRight: "16px",
    },
    ".carbon-poweredby": {
      bottom: "16px",
      color: `${gray[500] as string} !important`,
      display: "block",
      fontSize: "10px",
      fontWeight: "semibold",
      left: "162px",
      letterSpacing: "0.2px",
      lineHeight: 1,
      position: "absolute",
      textTransform: "uppercase",
    },
    ".carbon-text": {
      fontSize: "0.8rem",
      lineHeight: 1.4,
    },
    ".carbon-wrap": {
      display: "flex",
      padding: "16px",
    },
    "@media (max-width: 480px)": {
      fontSize: "0.875em",
    },
    a: {
      "&:hover": {
        textDecoration: "underline",
      },
      color: "inherit",
      textDecoration: "none",
    },
    bg,
    borderRadius: "4px",
    color: "inherit",
    display: "block",
    margin: "32px 0",
    maxWidth: "480px",
    minHeight: "132px",
    position: "relative",
  }

  useEffect(() => {
    const scriptEl = document.querySelector("#_carbonads_js")

    if (!ref.current || !!scriptEl) {
      return
    }

    const script = loadScript(
      "https://cdn.carbonads.com/carbon.js?serve=CE7DKK7L&placement=chakra-uicom",
      ref.current,
    )
    script.id = "_carbonads_js"
  }, [])

  return <chakra.span ref={ref} sx={carbonAd} />
}
