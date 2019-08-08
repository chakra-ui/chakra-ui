import React from "react";
import { MDXProvider } from "@mdx-js/react";
import styled from "@emotion/styled";

const Code = styled.code`
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier,
    monospace;
  line-height: normal;
  background: rgba(135, 131, 120, 0.15);
  color: #eb5757;
  border-radius: 3px;
  font-size: 85%;
  padding: 0.2em 0.4em;
`;

const Pre = styled.pre`
  flex-grow: 1;
  flex-shrink: 1;
  text-align: left;
  font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, Courier,
    monospace;
  font-size: 85%;
  tab-size: 2;
  padding: 30px 16px 30px 20px;
  min-height: 1em;
  color: rgb(55, 53, 47);
  white-space: pre;
  border-radius: 3px;
  position: relative;
  background: rgb(247, 246, 243);
`;

const mdComponents = {
  // eslint-disable-next-line jsx-a11y/heading-has-content
  h1: props => <h1 style={{ color: "tomato" }} {...props} />,
  code: Code,
  inlineCode: Code,
  pre: Pre
};

export default ({ Component, pageProps }) => (
  <MDXProvider components={mdComponents}>
    <Component {...pageProps} />
  </MDXProvider>
);
