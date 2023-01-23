import * as React from "react"
import Svg, { G, Path, Circle, Defs, ClipPath, SvgProps } from "react-native-svg"

const IconMyAccountClients = (props:SvgProps) => (
  <Svg
    width={32}
    height={32}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#a)" fill="#DD1E2F">
      <Path d="M11 12a2.5 2.5 0 1 0 .001-4.999A2.5 2.5 0 0 0 11 12Zm0 1.25c-1.669 0-5 .838-5 2.5V17h10v-1.25c0-1.662-3.331-2.5-5-2.5ZM19.5 15.5a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 1 0 0 6.5Zm0 1.625c-2.17 0-6.5 1.089-6.5 3.25V22h13v-1.625c0-2.161-4.33-3.25-6.5-3.25Z" />
    </G>
    <Circle cx={16} cy={16} r={15.5} stroke="#DD1E2F" />
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" transform="translate(4 3)" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default IconMyAccountClients
