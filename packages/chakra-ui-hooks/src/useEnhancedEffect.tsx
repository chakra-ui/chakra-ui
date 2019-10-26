import * as React from "react";
import { canUseDOM } from "exenv";

const useEnhancedEffect = canUseDOM ? React.useEffect : React.useLayoutEffect;

export default useEnhancedEffect;
