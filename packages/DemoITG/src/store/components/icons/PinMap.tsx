import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath, SvgProps} from 'react-native-svg';

const PinMap = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <G clipPath="url(#a)">
      <Path
        d="m12 23.728-6.364-6.364a9 9 0 1 1 12.728 0L12 23.728Zm4.95-7.778a7 7 0 1 0-9.9 0L12 20.9l4.95-4.95ZM12 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"
        fill="#1C1C1C"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default PinMap;
