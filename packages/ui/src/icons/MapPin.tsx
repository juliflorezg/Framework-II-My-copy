import React from "react";
import Svg, { Circle, Path, SvgProps } from "react-native-svg";

const MapPin = (props: SvgProps) => {
  return (
    <Svg
      width={20}
      height={28}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M10 .667C4.847.667.667 4.847.667 10 .667 17 10 27.333 10 27.333S19.334 17 19.334 10c0-5.154-4.18-9.333-9.334-9.333Zm0 12.666a3.335 3.335 0 0 1 0-6.667A3.335 3.335 0 0 1 13.334 10 3.335 3.335 0 0 1 10 13.333Z"
        fill="#F96F88"
      />
    </Svg>
  );
};

export default MapPin;
