import * as React from "react"
import Svg, { Circle, Path, SvgProps } from "react-native-svg"

const BagIcon = (props:SvgProps) => (
  <Svg
    width={40}
    height={40}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx={20} cy={20} r={19.5} fill="#DD1E2F" stroke="#DD1E2F" />
    <Path
      d="m14 10-3 4v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V14l-3-4H14Z"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M24 18a4 4 0 1 1-8 0M11 14h18"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default BagIcon
