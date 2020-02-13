import * as React from "react";
import { storiesOf } from "@storybook/react";
import {
  useSlider,
  useSliderThumb,
  useSliderTrack,
  SliderProvider,
  useSliderLabel,
  SliderHookProps,
} from "./Slider.hook";
import { chakra } from "@chakra-ui/system";

const stories = storiesOf("Slider", module);

stories.addDecorator(story => (
  <chakra.div maxWidth="800px" mx="auto" mt="40px">
    {story()}
  </chakra.div>
));

function SliderThumb(props: any) {
  const thumbProps = useSliderThumb(props);
  return <div data-chakra-slider-thumb="" {...thumbProps} />;
}

function SliderTrack(props: any) {
  const trackProps = useSliderTrack(props);
  return <div data-chakra-slider-track="" {...trackProps} />;
}

function SliderLabel(props: any) {
  const labelProps = useSliderLabel(props);
  return <label data-chakra-slider-label="" {...labelProps} />;
}

function Slider(props: SliderHookProps & { children?: React.ReactNode }) {
  const slider = useSlider(props);
  return (
    <SliderProvider value={slider}>
      <div
        data-chakra-slider=""
        aria-disabled={slider.isDisabled || undefined}
        style={{ position: "relative" }}
      >
        {props.children}
        <input type="hidden" value={slider.value} id={slider.id} />
      </div>
    </SliderProvider>
  );
}

function HorizontalSlider() {
  return (
    <Slider defaultValue={40} step={5}>
      <SliderLabel>Select the value: </SliderLabel>
      <br /> <br />
      <SliderTrack
        style={{
          height: 4,
          width: "100%",
          background: "#e2e2e2",
          borderRadius: 4,
        }}
      >
        <SliderThumb
          style={{
            width: 24,
            height: 24,
            borderRadius: 4,
            background: "white",
            boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 4px",
            transform: "translateY(-50%)",
            top: "50%",
          }}
        />
      </SliderTrack>
    </Slider>
  );
}

// export function VerticalSlider() {
//   const slider = useSlider({
//     defaultValue: 40,
//     orientation: "vertical",
//     isReversed: false,
//     max: 100,
//     min: 10,
//     step: 1,
//   });

//   useLogger("Slider", slider);

//   return (
//     <>
//       <div
//         {...slider.track}
//         style={{
//           ...slider.track.style,
//           height: 400,
//           width: 50,
//           background: "red",
//           // maxWidth: 400,
//         }}
//       >
//         <div
//           tabIndex={0}
//           {...slider.thumb}
//           style={{
//             ...slider.thumb.style,
//             width: "100%",
//             height: 20,
//             background: "pink",
//           }}
//         />
//       </div>
//     </>
//   );
// }

// export function HorizontalSlider() {
//   const slider = useSlider({
//     defaultValue: 40,
//     orientation: "horizontal",
//     isReversed: false,
//     max: 100,
//     min: 10,
//     step: 1,
//   });

//   useLogger("Slider", slider);

//   return (
//     <>
//       <div
//         {...slider.track}
//         style={{
//           ...slider.track.style,
//           height: 50,
//           width: 400,
//           background: "blue",
//           // maxWidth: 400,
//         }}
//       >
//         <div
//           tabIndex={0}
//           {...slider.thumb}
//           style={{
//             ...slider.thumb.style,
//             width: 20,
//             height: "100%",
//             background: "pink",
//           }}
//         />
//       </div>
//     </>
//   );
// }

stories.add("horizontal", () => <HorizontalSlider />);
// stories.add("Horizontal Slider", () => <HorizontalSlider />);
