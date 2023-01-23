import React from "react";
import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

const ExclamationIcon = (props: SvgProps) => {
  return (
    <Svg
    width="4"
    height="14"
    viewBox="0 0 4 14"
    fill="none"
    {...props}
  >
   <Path
      d="M2 10c.553 0 1-.447 1-.972V1a1 1 0 1 0-2 0v7.972C1 9.553 1.447 10 2 10Zm0 1.5c-.69 0-1.25.56-1.25 1.25s.56 1.222 1.25 1.222 1.25-.56 1.25-1.222c0-.662-.56-1.25-1.25-1.25Z"
      fill="#DD1E2F"
    />
  </Svg>
  );
};

export default ExclamationIcon;
