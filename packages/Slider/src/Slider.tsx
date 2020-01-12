import * as React from "react";
import { useSlider } from "./Slider.hook";

export function Slider(props: any) {
  const hook = useSlider(props);
  return <div>This is a Slider component</div>;
}

export default Slider;
