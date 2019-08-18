import { Box } from "@chakra-ui/core";
import React from "react";

export const DownloadIcon = props => (
  <Box
    as="svg"
    xmlns="http://www.w3.org/2000/svg"
    size="5"
    viewBox="0 0 24 24"
    {...props}
  >
    <Box
      as="path"
      fill="gray.400"
      d="M.964 4.941a.251.251 0 0 0 .047.213.248.248 0 0 0 .2.1h9.777A.251.251 0 0 0 11.235 5L11.164.246a.249.249 0 0 0-.25-.246H4.653a2.588 2.588 0 0 0-2.286 1.526L1.192 4.2a5.731 5.731 0 0 0-.228.741z"
    ></Box>
    <Box
      as="path"
      fill="current"
      color="gray.400"
      d="M12.985 5.25h9.807a.248.248 0 0 0 .2-.1.251.251 0 0 0 .047-.213 5.731 5.731 0 0 0-.228-.741 1.1 1.1 0 0 0-.039-.085l-1.316-2.56A2.6 2.6 0 0 0 19.153 0h-6.238a.249.249 0 0 0-.25.253L12.735 5a.251.251 0 0 0 .25.25z"
    ></Box>
    <Box
      as="path"
      fill="current"
      color="gray.700"
      d="M.75 7v15a2 2 0 0 0 2 2h18.5a2 2 0 0 0 2-2V7a.25.25 0 0 0-.25-.25H1A.25.25 0 0 0 .75 7zm5.793 8.048A.5.5 0 0 1 7 14.75h1.75A.25.25 0 0 0 9 14.5V9.75a.5.5 0 0 1 .5-.5h4.75a.5.5 0 0 1 .5.5v4.75a.25.25 0 0 0 .25.25h1.75a.5.5 0 0 1 .378.827l-4.75 5.5a.5.5 0 0 1-.372.173H12a.5.5 0 0 1-.37-.164l-5-5.5a.5.5 0 0 1-.087-.538z"
    ></Box>
  </Box>
);

export const ResponsiveIcon = props => (
  <Box
    as="svg"
    size="5"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    {...props}
  >
    <Box
      as="path"
      fill="current"
      color="gray.700"
      d="M21,8h-6c-1.103,0-2,0.897-2,2v12c0,1.103,0.897,2,2,2h6c1.103,0,2-0.897,2-2V10 C23,8.897,22.103,8,21,8z M20,20h-4c-0.552,0-1-0.448-1-1v-8c0-0.552,0.448-1,1-1h4c0.552,0,1,0.448,1,1v8 C21,19.552,20.552,20,20,20z"
    ></Box>
    <Box
      as="path"
      color="gray.400"
      fill="current"
      d="M11,17H4c-0.552,0-1-0.448-1-1V3c0-0.552,0.448-1,1-1h12c0.552,0,1,0.448,1,1v3h2V2c0-1.105-0.895-2-2-2H3 C1.895,0,1,0.895,1,2v18c0,1.105,0.895,2,2,2h8V17z"
    ></Box>
  </Box>
);

export const BookIcon = props => (
  <Box
    as="svg"
    size="6"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    {...props}
  >
    <Box
      as="path"
      fill="current"
      color="gray.400"
      d="M12 21a2 2 0 0 1-1.41-.59l-.83-.82A2 2 0 0 0 8.34 19H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4a5 5 0 0 1 4 2v16z"
    ></Box>

    <Box
      as="path"
      fill="current"
      color="gray.700"
      d="M12 21V5a5 5 0 0 1 4-2h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4.34a2 2 0 0 0-1.42.59l-.83.82A2 2 0 0 1 12 21z"
    ></Box>
  </Box>
);

export const ThemeIcon = props => (
  <Box
    as="svg"
    size="6"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    {...props}
  >
    <Box
      as="path"
      fill="current"
      color="gray.400"
      d="M9 22c.19-.14.37-.3.54-.46L17.07 14H20a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H9zM4 2h4a2 2 0 0 1 2 2v14a4 4 0 1 1-8 0V4c0-1.1.9-2 2-2zm2 17.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
    ></Box>
    <Box
      as="path"
      fill="current"
      color="gray.700"
      d="M11 18.66V7.34l2.07-2.07a2 2 0 0 1 2.83 0l2.83 2.83a2 2 0 0 1 0 2.83L11 18.66z"
    ></Box>
  </Box>
);
