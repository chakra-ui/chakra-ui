import * as React from "react";
import { useEditable } from "./Editable.hook";

export function Editable(props: any) {
  const hook = useEditable(props);
  return <div>This is a Editable component</div>;
}

export default Editable;
