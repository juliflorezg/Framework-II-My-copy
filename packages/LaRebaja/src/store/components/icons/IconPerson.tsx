import * as React from "react"
import Svg, { G, Path, Defs, ClipPath,SvgProps } from "react-native-svg"
import { StyleSheet } from 'react-native'

const IconPerson = (props:SvgProps) => (
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
        d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4Z"
        fill="#212428"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default IconPerson
