import * as React from "react";
import { storiesOf } from "@storybook/react";
import setup from "../story.setup";
import ScaleFade from "./ScaleFade";
import { useTransitionStyle } from "./Transition.context";
import SlideFade from "./SlideFade";
import Fade from "./Fade";
import Slide from "./Slide";

const stories = storiesOf("Transition", module);
stories.addDecorator(setup);

const modalStyles: React.CSSProperties = {
  position: "fixed",
  top: "50%",
  left: "50%",
  width: "50%",
  maxWidth: "630px",
  minWidth: "320px",
  height: "auto",
  backfaceVisibility: "hidden",
  transform: `translateX(-50%) translateY(-50%)`,
};

function Modal(props: any) {
  const styles = useTransitionStyle();

  const allStyle: React.CSSProperties = {
    background: "red",
    minHeight: 300,
    ...modalStyles,
    ...styles,
    transform: styles.transform
      ? `${modalStyles.transform} ${styles.transform}`
      : `${modalStyles.transform}`,
  };

  return <div {...props} style={allStyle} children="Animate me" />;
}

function ScaleFadeExample() {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <>
      <button onClick={() => setIsOpen(p => !p)}>Click Me</button>
      <ScaleFade in={isOpen}>
        <Modal />
      </ScaleFade>
    </>
  );
}

stories.add("scale fade", () => <ScaleFadeExample />);

function SlideFadeExample() {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <>
      <button onClick={() => setIsOpen(p => !p)}>Click Me</button>
      <SlideFade in={isOpen}>
        <Modal />
      </SlideFade>
    </>
  );
}

stories.add("slide fade", () => <SlideFadeExample />);

function FadeExample() {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <>
      <button onClick={() => setIsOpen(p => !p)}>Click Me</button>
      <Fade in={isOpen}>
        <Modal />
      </Fade>
    </>
  );
}

stories.add("fade", () => <FadeExample />);

function Drawer(props: any) {
  const styles = useTransitionStyle();

  const allStyle: React.CSSProperties = {
    background: "red",
    position: "fixed",
    ...styles,
  };

  return <div {...props} style={allStyle} children="Animate me" />;
}

function SlideExample() {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <>
      <button onClick={() => setIsOpen(p => !p)}>Click Me</button>
      <Slide placement="bottom" in={isOpen}>
        <Drawer />
      </Slide>
    </>
  );
}

stories.add("slide", () => <SlideExample />);
