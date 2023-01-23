import React from "react";
import Svg, { SvgProps,Path } from "react-native-svg";

const LocationIcon = (props: SvgProps) => {
  console.log("props", props)
    return (
      <Svg
      width={18}
      height={22}
      fill="none"
      {...props}
    >
      <Path
        d="m9 21.728-6.364-6.364a9 9 0 1 1 12.728 0L9 21.728Zm4.95-7.778a7 7 0 1 0-9.9 0L9 18.9l4.95-4.95ZM9 11a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"
        fill="#1C1C1C"
      />
    </Svg>
)

};

export default LocationIcon;
