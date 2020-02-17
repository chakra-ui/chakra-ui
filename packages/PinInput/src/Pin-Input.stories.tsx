import * as React from "react";
import { usePinInput, usePinInputState } from "./Pin-Input.hook";

export default {
  title: "PinInput",
};

export function Basic() {
  const context = usePinInputState({ autoFocus: true });
  const input1 = usePinInput({ context });
  const input2 = usePinInput({ context });
  const input3 = usePinInput({ context });
  const input4 = usePinInput({ context });

  const style: React.CSSProperties = {
    width: 40,
    height: 40,
    textAlign: "center",
    color: "black",
    margin: 4,
  };

  return (
    <div>
      <input style={style} {...input1} />
      <input style={style} {...input2} />
      <input style={style} {...input3} />
      <input style={style} {...input4} />
    </div>
  );
}
