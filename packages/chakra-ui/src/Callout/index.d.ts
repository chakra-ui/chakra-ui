import * as React from "react";
import { IAlert } from "../Alert";
import { BoxProps } from "../Box";

interface ICallout {
  /**
   * The status of the callout
   */
  status?: IAlert["status"];
  /**
   * The variant of the callout
   */
  variant?: IAlert["variant"];
}

type CalloutProps = BoxProps & ICallout;

/**
 * A react component used to alert users of a particular screen area that needs user action
 */
declare const Callout: React.FC<CalloutProps>;

export default Callout;
