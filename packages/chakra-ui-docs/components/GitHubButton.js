/** @jsx jsx */
import { Box } from "@chakra-ui/core";
import { jsx } from "@emotion/core";

const GitHubButton = () => (
  <Box
    as="a"
    className="github-button"
    href="https://github.com/chakra-ui/chakra-ui"
    data-icon="octicon-star"
    data-size="large"
    data-show-count="true"
    aria-label="Star chakra-ui/chakra-ui on GitHub"
  >
    Star
  </Box>
);

export default GitHubButton;
