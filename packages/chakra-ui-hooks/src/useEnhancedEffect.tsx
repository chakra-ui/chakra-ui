import * as React from "react";
import { canUseDOM } from "@chakra-ui/utils";

const useEnhancedEffect = canUseDOM ? React.useEffect : React.useLayoutEffect;

export default useEnhancedEffect;
