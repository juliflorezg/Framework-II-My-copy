import * as React from "react"
import Svg, { G, Path, Circle, Defs, ClipPath, SvgProps } from "react-native-svg"

const IconMyAccountCompany = (props:SvgProps) => (
  <Svg
    width={32}
    height={32}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#a)" fill="#DD1E2F">
      <Path d="M9.5 13.5a2.25 2.25 0 1 0 .001-4.499A2.25 2.25 0 0 0 9.5 13.5Zm0 1.125c-1.502 0-4.5.754-4.5 2.25V18h9v-1.125c0-1.496-2.998-2.25-4.5-2.25ZM22.5 13.5a2.25 2.25 0 1 0 .001-4.499A2.25 2.25 0 0 0 22.5 13.5Zm0 1.125c-1.502 0-4.5.754-4.5 2.25V18h9v-1.125c0-1.496-2.998-2.25-4.5-2.25Z" />
      <Path d="M16 16a3 3 0 1 0 0-6 3 3 0 1 0 0 6Zm0 1.5c-2.002 0-6 1.005-6 3V22h12v-1.5c0-1.995-3.997-3-6-3Z" />
    </G>
    <Circle cx={16} cy={16} r={15.5} stroke="#DD1E2F" />
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" transform="translate(4 3)" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default IconMyAccountCompany