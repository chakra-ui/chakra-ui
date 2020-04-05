/**@jsx jsx */
import { jsx, css } from "@emotion/core";
import React from "react";
import { useTheme } from "@chakra-ui/core";

function loadScript(src, container) {
  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.src = src;
  container.appendChild(script);
  return script;
}

export const useEnhancedEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

function CarbonAd() {
  const ref = React.useRef(null);

  const theme = useTheme();

  const carbonAd = css`
    display: block;
    position: relative;
    margin: 32px 0;
    max-width: 480px;
    min-height: 132px;
    border-radius: ${theme.radii.sm};
    background-color: ${theme.colors.gray[50]};
    color: ${theme.colors.gray[800]};

    @media (max-width: 480px) {
      font-size: 0.875em;
    }

    a {
      text-decoration: none;
      color: inherit;
      &:hover {
        text-decoration: underline;
      }
    }

    .carbon-wrap {
      display: flex;
      padding: 16px;
    }

    .carbon-img {
      margin-right: 16px;
      img {
        display: block;
      }
    }

    .carbon-text {
      font-size: 0.8rem;
      line-height: 1.4;
    }

    .carbon-poweredby {
      position: absolute;
      bottom: 16px;
      left: 162px;
      color: ${theme.colors.gray[500]} !important;
      display: block;
      font-size: 10px;
      font-weight: ${theme.fontWeights.semibold};
      text-transform: uppercase;
      line-height: 1;
      letter-spacing: 0.2px;
    }
  `;

  useEnhancedEffect(() => {
    const scriptEl = document.getElementById("_carbonads_js");

    if (!ref.current || !!scriptEl) return;

    const script = loadScript(
      "https://cdn.carbonads.com/carbon.js?serve=CE7DKK7L&placement=chakra-uicom",
      ref.current,
    );
    script.id = "_carbonads_js";
  }, []);

  return <span ref={ref} css={carbonAd} />;
}

export default CarbonAd;
