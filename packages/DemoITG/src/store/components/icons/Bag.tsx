import React from "react";
import Svg, { SvgProps,Path } from "react-native-svg";

const BagIcon = (props: SvgProps) => {
  console.log("props", props)
    return (
      <Svg
    width={18}
    height={21}
    fill="none"
    {...props}
  >
    <Path
      d="M4 7V5a5 5 0 1 1 10 0v2h3a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h3Zm0 2H2v10h14V9h-2v2h-2V9H6v2H4V9Zm2-2h6V5a3 3 0 0 0-6 0v2Z"
      fill="#142032"
    />
  </Svg>
)

};

export default BagIcon;
