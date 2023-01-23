import * as React from "react"
import Svg, { G, Path, Circle, Defs, ClipPath, SvgProps } from "react-native-svg"

const IconMyAccount = (props:SvgProps) => (
  <Svg
    width={32}
    height={32}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="M16 15c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4Z"
        fill="#DD1E2F"
      />
    </G>
    <Circle cx={16} cy={16} r={15.5} stroke="#DD1E2F" />
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" transform="translate(4 3)" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default IconMyAccount
