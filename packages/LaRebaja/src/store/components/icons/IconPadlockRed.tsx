import * as React from "react"
import Svg, { G, Path, Defs, ClipPath,SvgProps } from "react-native-svg"
import { StyleSheet } from 'react-native'

const IconPadlockRed = (props:SvgProps) => (
  <Svg
    width={24}
    height={25}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={StyleSheet.absoluteFillObject}
    {...props}
  >
    <Path
      d="M18 8.5h-1v-2c0-2.76-2.24-5-5-5s-5 2.24-5 5v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-10c0-1.1-.9-2-2-2Zm-9.1-2c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H8.9v-2Zm7.1 10h-3v3h-2v-3H8v-2h3v-3h2v3h3v2Z"
      fill="#DD1E2F"
    />
  </Svg>
)

export default IconPadlockRed
