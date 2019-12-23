import { pseudo, system, truncate } from "../system";
import styled from "./styled";
import { As, CreateChakraOptions } from "./types";

function createChakra<T extends As, H>(
  Comp: T,
  options?: CreateChakraOptions<H>,
) {
  return styled(Comp, options)(system, pseudo, truncate);
}

export default createChakra;
