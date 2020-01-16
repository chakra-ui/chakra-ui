import * as React from "react";
import { storiesOf } from "@storybook/react";
import { forwardRef } from "@chakra-ui/system";
import chakra from "../chakra";
import { ChakraComponent, PropsOf } from "../types";
import setup from "../../../story.setup";

const stories = storiesOf("component", module);

stories.addDecorator(setup);

const Box = chakra.div;
type BoxProps = PropsOf<typeof Box>;

const Flex = forwardRef(
  (props: Omit<BoxProps, "ref">, ref: BoxProps["ref"]) => (
    <Box ref={ref} display="flex" {...props} />
  ),
) as ChakraComponent<"div">;

stories.add("default", () => (
  <Flex>
    <Box
      color="red.300"
      flex="1"
      sx={{
        margin: 20,
        fontSize: "40px",
      }}
    >
      Div 1
    </Box>
    <Box>Div 2</Box>
  </Flex>
));
