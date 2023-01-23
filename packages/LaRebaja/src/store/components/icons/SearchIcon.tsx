import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const SearchIcon = (props: SvgProps) => {
  return (
    <Svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.35-4.35"
      stroke="#C1C1C1"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
  );
};

export default SearchIcon;
