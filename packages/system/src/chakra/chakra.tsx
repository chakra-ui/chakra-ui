import { pseudo, system, truncate } from "../system";
import styled from "./styled";
import htmlElements from "./supported-elements";
import { As, HTMLChakraComponents } from "./types";

function createComponent<T extends As>(tag: T) {
  return styled(tag)(system, pseudo, truncate);
}

//@ts-ignore
const chakra: HTMLChakraComponents = {};
htmlElements.forEach(tag => {
  //@ts-ignore
  chakra[tag] = createComponent(tag);
});

export default chakra;
