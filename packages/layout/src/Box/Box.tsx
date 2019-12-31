import { createChakra, PropsOf } from "@chakra-ui/system";

const Box = createChakra("div");

export type BoxProps = PropsOf<typeof Box>;

export default Box;
