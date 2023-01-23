import * as React from "react"
import Svg, { Circle, G, Path, Defs, ClipPath, SvgProps } from "react-native-svg"

const IconMyAccountInformation = (props:SvgProps) => (
  <Svg
    width={32}
    height={32}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx={16} cy={16} r={15.5} stroke="#DD1E2F" />
    <G clipPath="url(#a)">
      <Path
        d="M21.334 10.333H10.667c-.733 0-1.333.6-1.333 1.334v12L12 21h9.334c.733 0 1.333-.6 1.333-1.333v-8c0-.734-.6-1.334-1.334-1.334Zm0 9.334H12L10.667 21v-9.333h10.667v8ZM12.667 15H14v1.333h-1.333V15Zm2.667 0h1.333v1.333h-1.334V15ZM18 15h1.334v1.333H18V15Z"
        fill="#DD1E2F"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" transform="translate(8 9)" d="M0 0h16v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default IconMyAccountInformation