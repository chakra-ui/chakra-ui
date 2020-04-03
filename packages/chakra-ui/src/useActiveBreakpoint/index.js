import { useEffect, useState, useRef, useCallback } from 'react';
import { useTheme } from '../ThemeProvider';
import { generateMediaQueries, findActiveQueries, isEqualish } from './utils';

export default function useActiveBreakpoint(){
    const { breakpoints } = useTheme();
    const firstRender = useRef(true);
    const currentBreakpoints = useRef([...breakpoints]);
    const [mediaQueries, setMediaQueries] = useState(generateMediaQueries(breakpoints));
    const [activeBreakpoint, setActiveBreakpoint] = useState(findActiveQueries(mediaQueries));

    const onResize = useCallback(e => {
        setActiveBreakpoint(findActiveQueries(mediaQueries));
    }, [mediaQueries]);

    const removeListeners = useCallback(fn => {
        for(const mq of mediaQueries){
            mq.removeListener(fn);
        }
    }, [mediaQueries]);

    const addListeners = useCallback(fn => {
        for(const mq of mediaQueries){
            mq.addListener(fn);
        }
    }, [mediaQueries]);

    useEffect(() => {
        if(!isEqualish(currentBreakpoints.current, breakpoints)) {
            currentBreakpoints.current = [...breakpoints];
            removeListeners(onResize);
            setMediaQueries(generateMediaQueries(breakpoints));
            addListeners(onResize);
            return () => removeListeners(onResize);
        }
    }, [breakpoints, onResize, addListeners, removeListeners]);

    if(firstRender.current === true) {
        firstRender.current = false;
        addListeners(onResize);
    }

    return activeBreakpoint;
}