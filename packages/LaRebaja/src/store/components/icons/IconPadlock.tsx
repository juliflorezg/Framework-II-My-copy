import * as React from "react"
import Svg, { G, Path, Defs, ClipPath,SvgProps } from "react-native-svg"
import { StyleSheet } from 'react-native'

const IconPadlock = (props:SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={StyleSheet.absoluteFillObject}
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2ZM8.9 6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H8.9V6ZM16 16h-3v3h-2v-3H8v-2h3v-3h2v3h3v2Z"
        fill="#888"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default IconPadlock