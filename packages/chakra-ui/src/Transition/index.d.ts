import * as React from "react";
import { TransitionProps } from "react-spring/renderprops";
import { BoxProps } from "../Box";

interface ISlideIn {
  in: boolean;
  offset?: string;
  duration?: number;
  children: (styles: Object) => React.ReactNode;
}

type SlideInProps = ISlideIn & TransitionProps<boolean>;
export const SlideIn: React.FC<SlideInProps>;

interface IScale {
  in: boolean;
  initialScale?: number;
  duration?: number;
  children: (styles: Object) => React.ReactNode;
}

type ScaleProps = IScale & TransitionProps<boolean>;
export const Scale: React.FC<ScaleProps>;

interface ISlide {
  in: boolean;
  finalHeight?: BoxProps["height"];
  finalWidth?: BoxProps["maxWidth"];
  duration?: number;
  from: "bottom" | "top" | "left" | "right";
}

type SlideProps = ISlide & TransitionProps<boolean>;
export const Slide: React.FC<SlideProps>;
