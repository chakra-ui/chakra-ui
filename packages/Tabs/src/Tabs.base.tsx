import { useMergeRefs } from "@chakra-ui/hooks";
import { PropsOf } from "@chakra-ui/system";
import { SafeMerge } from "@chakra-ui/utils";
import * as React from "react";
import {
  useTab,
  useTabIndicator,
  useTabList,
  useTabPanel,
  useTabPanels,
  TabHookProps,
  TabListHookProps,
} from "./Tabs.hook";

export const BaseTab = React.forwardRef(
  (
    props: SafeMerge<TabHookProps, PropsOf<"button">>,
    ref: React.Ref<HTMLButtonElement>,
  ) => {
    const tabProps = useTab({ ...props, ref });
    return <button {...tabProps} />;
  },
);

export const BaseTabList = React.forwardRef(
  (
    props: SafeMerge<TabListHookProps, PropsOf<"div">>,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    const tablistProps = useTabList(props);
    const tablistRef = useMergeRefs(tablistProps.ref, ref);
    return <div ref={tablistRef} {...tablistProps} />;
  },
);

export const BaseTabPanel = React.forwardRef(
  (props: PropsOf<"div">, ref: React.Ref<HTMLDivElement>) => {
    const tabpanelProps = useTabPanel({});
    return <div ref={ref} {...props} {...tabpanelProps} />;
  },
);

export function BaseTabPanels({ children, ...props }: PropsOf<"div">) {
  const enhancedChildren = useTabPanels({ children });
  return <div {...props}>{enhancedChildren}</div>;
}

export function BaseTabIndicator(props: PropsOf<"div">) {
  const styles = useTabIndicator();
  return <div style={{ ...styles, height: 2, background: "red" }} {...props} />;
}
