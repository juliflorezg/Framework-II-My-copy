import * as React from "react"
import Svg, { Circle, Path, SvgProps } from "react-native-svg"

const LocationIcon = (props:SvgProps) => (
  <Svg
    width={40}
    height={40}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx={20} cy={20} r={20} fill="#DD1E2F" />
    <Path
      d="M20 18.898a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Zm-.799 7.774a1.125 1.125 0 0 0 1.598 0l4.601-4.613a7.639 7.639 0 1 0-10.8 0l4.601 4.613ZM14.634 16.13a5.41 5.41 0 0 1 2.396-3.993 5.412 5.412 0 0 1 5.94 0 5.424 5.424 0 0 1 .844 8.336L20 24.287l-3.814-3.814a5.368 5.368 0 0 1-1.552-4.343Zm13.241 13.118h-15.75a1.125 1.125 0 1 0 0 2.25h15.75a1.125 1.125 0 1 0 0-2.25Z"
      fill="#fff"
    />
  </Svg>
)

export default LocationIcon