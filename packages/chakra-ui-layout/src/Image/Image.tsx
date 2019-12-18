import { chakra, PropsOf } from "@chakra-ui/system";

export type ImageProps = PropsOf<typeof chakra.img>;
const Image = chakra.img;
export default Image;
