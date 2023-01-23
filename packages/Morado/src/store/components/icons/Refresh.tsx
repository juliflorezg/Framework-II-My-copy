import React from "react";
import Svg, { Path,SvgProps, G, ClipPath, Defs} from "react-native-svg";

const Refresh = (props: SvgProps) => {
  return (
    <Svg
    width={18}
    height={20}
    fill="none"
    {...props}
  >
    <G
      clipPath="url(#a)"
      stroke="#1A1919"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M4.646 3.453a8 8 0 1 1-3.288 4.626" />
      <Path
        d="m4.645 3.451 1.114 1.664-1.802.005H2.153l.69-1.664.69-1.665 1.112 1.66Z"
        fill="#1A1919"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" transform="rotate(-90 10 10)" d="M0 0h20v18H0z" />
      </ClipPath>
    </Defs>
  </Svg>
 
  );
};

export default Refresh;