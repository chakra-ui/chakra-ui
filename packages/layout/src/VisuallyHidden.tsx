import {
  createChakra,
  CreateChakraComponent,
  forwardRef,
  PropsOf,
} from "@chakra-ui/system";
import * as React from "react";

const visuallyHiddenStyles: React.CSSProperties = {
  border: "0px",
  clip: "rect(0px, 0px, 0px, 0px)",
  height: "1px",
  width: "1px",
  margin: "-1px",
  padding: "0px",
  overflow: "hidden",
  whiteSpace: "nowrap",
  position: "absolute",
};

const Hidden = createChakra("div");

const VisuallyHidden = forwardRef(
  (props: PropsOf<typeof Hidden>, ref: React.Ref<any>) => (
    <Hidden ref={ref} style={visuallyHiddenStyles} {...props} />
  ),
) as CreateChakraComponent<"div">;

type InputProps = PropsOf<"input">;

const Example = () => {
  <VisuallyHidden<InputProps>
    as="input"
    ref={node => {
      console.log(node);
    }}
    onChange={event => {
      console.log(event);
    }}
  />;
};

export default VisuallyHidden;
