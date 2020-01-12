import * as React from "react";
import { storiesOf } from "@storybook/react";
import setup from "../story.setup";
import { useSlider } from "./Slider.hook";
import { useLogger } from "@chakra-ui/hooks";

const stories = storiesOf("Slider", module);
stories.addDecorator(setup);

stories.add("default", () => <div>Component goes here</div>);

export function VerticalSlider() {
  const slider = useSlider({
    defaultValue: 40,
    orientation: "vertical",
    isReversed: false,
    max: 100,
    min: 10,
    step: 1,
  });

  useLogger("Slider", slider);

  return (
    <>
      <div
        {...slider.track}
        style={{
          ...slider.track.style,
          height: 400,
          width: 50,
          background: "red",
          // maxWidth: 400,
        }}
      >
        <div
          tabIndex={0}
          {...slider.thumb}
          style={{
            ...slider.thumb.style,
            width: "100%",
            height: 20,
            background: "pink",
          }}
        />
      </div>
    </>
  );
}

export function HorizontalSlider() {
  const slider = useSlider({
    defaultValue: 40,
    orientation: "horizontal",
    isReversed: false,
    max: 100,
    min: 10,
    step: 1,
  });

  useLogger("Slider", slider);

  return (
    <>
      <div
        {...slider.track}
        style={{
          ...slider.track.style,
          height: 50,
          width: 400,
          background: "blue",
          // maxWidth: 400,
        }}
      >
        <div
          tabIndex={0}
          {...slider.thumb}
          style={{
            ...slider.thumb.style,
            width: 20,
            height: "100%",
            background: "pink",
          }}
        />
      </div>
    </>
  );
}

stories.add("Vertical Slider", () => <VerticalSlider />);
stories.add("Horizontal Slider", () => <HorizontalSlider />);
