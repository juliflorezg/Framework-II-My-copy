import * as React from "react"
import Svg, { Circle, G, Path, Defs, ClipPath, SvgProps } from "react-native-svg"

const IconMyAccountAdress = (props:SvgProps) => (
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
        d="M16 14.318a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6Zm-.64 6.22a.901.901 0 0 0 1.279 0l3.68-3.69a6.112 6.112 0 1 0-8.64 0l3.682 3.69Zm-3.653-8.434a4.328 4.328 0 0 1 1.917-3.195 4.33 4.33 0 0 1 4.752 0 4.339 4.339 0 0 1 .675 6.67L16 18.628l-3.051-3.05a4.294 4.294 0 0 1-1.242-3.475ZM22.3 22.598H9.7a.9.9 0 1 0 0 1.8h12.6a.9.9 0 0 0 0-1.8Z"
        fill="#DD1E2F"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M6.4 5.6h19.2v19.2H6.4z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default IconMyAccountAdress
