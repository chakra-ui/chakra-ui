import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";

const PrismHighlight = ({
  code,
  theme,
  language = "jsx",
  preComponent: Pre,
}) => (
  <Highlight {...defaultProps} theme={theme} code={code} language={language}>
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <Pre className={className} style={style}>
        {tokens.map((line, i) => (
          <div {...getLineProps({ line, key: i })}>
            {line.map((token, key) => (
              <span {...getTokenProps({ token, key })} />
            ))}
          </div>
        ))}
      </Pre>
    )}
  </Highlight>
);

export default PrismHighlight;
