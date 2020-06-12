import { chakra, useColorModeValue, useTheme } from "@chakra-ui/core"
import * as React from "react"

function loadScript(src, container) {
  const script = document.createElement("script")
  script.setAttribute("async", "")
  script.src = src
  container.appendChild(script)
  return script
}

function CarbonAd() {
  const ref = React.useRef(null)

  const theme = useTheme()
  const bg = useColorModeValue("gray.50", "rgba(36, 70, 93, 0.32)")

  const carbonAd = {
    display: "block",
    position: "relative",
    margin: "32px 0",
    maxWidth: "480px",
    minHeight: "132px",
    borderRadius: "4px",
    bg,
    color: "inherit",
    "@media (max-width: 480px)": {
      fontSize: "0.875em",
    },
    a: {
      textDecoration: "none",
      color: "inherit",
      "&:hover": {
        textDecoration: "underline",
      },
    },
    ".carbon-wrap": {
      display: "flex",
      padding: "16px",
    },
    ".carbon-img": {
      marginRight: "16px",
      img: {
        display: "block",
      },
    },
    ".carbon-text": {
      fontSize: "0.8rem",
      lineHeight: 1.4,
    },
    ".carbon-poweredby": {
      position: "absolute",
      bottom: "16px",
      left: "162px",
      color: `${theme.colors.gray[500]} !important`,
      display: "block",
      fontSize: "10px",
      fontWeight: "semibold",
      textTransform: "uppercase",
      lineHeight: 1,
      letterSpacing: "0.2px",
    },
  }

  React.useEffect(() => {
    const scriptEl = document.getElementById("_carbonads_js")

    if (!ref.current || !!scriptEl) return

    const script = loadScript(
      "https://cdn.carbonads.com/carbon.js?serve=CE7DKK7L&placement=chakra-uicom",
      ref.current,
    )
    script.id = "_carbonads_js"
  }, [])

  return <chakra.span ref={ref} cx={carbonAd} />
}

export default CarbonAd
