import React from "react";
import Svg, { SvgProps,G, Defs, Path,ClipPath } from "react-native-svg";

const OffersIcon = (props: SvgProps) => {
    return (
      <Svg
      width={24}
      height={24}
      fill="none"
  
    >
      <G
        clipPath="url(#a)"
        stroke="#1C1C1C"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M18.337 20.182H16.02c-.48 0-.94.187-1.285.521l-1.45 1.41a1.845 1.845 0 0 1-2.572 0l-1.45-1.41a1.847 1.847 0 0 0-1.286-.521H5.663a1.845 1.845 0 0 1-1.845-1.845v-2.315c0-.48-.187-.941-.521-1.286l-1.41-1.45a1.845 1.845 0 0 1 0-2.571l1.41-1.45c.334-.345.52-.806.52-1.286V5.663c0-1.018.827-1.845 1.846-1.845h2.315c.48 0 .941-.187 1.286-.52l1.45-1.41a1.845 1.845 0 0 1 2.571 0l1.45 1.41c.345.333.806.52 1.286.52h2.316c1.018 0 1.845.827 1.845 1.845V7.98c0 .48.187.94.52 1.285l1.41 1.45a1.845 1.845 0 0 1 0 2.572l-1.41 1.45a1.847 1.847 0 0 0-.52 1.286v2.315a1.845 1.845 0 0 1-1.845 1.845ZM16.909 7.09 7.091 16.91" />
        <Path d="M8.727 10.364a1.636 1.636 0 1 0 0-3.273 1.636 1.636 0 0 0 0 3.272ZM15.272 16.91a1.636 1.636 0 1 0 0-3.273 1.636 1.636 0 0 0 0 3.272Z" />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill="#1C1C1C" d="M0 0h24v24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
)

};

export default OffersIcon;
