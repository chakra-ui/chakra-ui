export interface UseActiveBreakpointReturn {
    breakpointIndex: number;
  }
  
  /**
   * useActiveBreakpoint is a hook which returns the index of the currently active theme breakpoint, or -1 if only the baseline is active.
   */
  declare function useActiveBreakpoint(): UseActiveBreakpointReturn;
  
  export default useActiveBreakpoint;
  