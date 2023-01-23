import * as React from "react"
import Svg, { Ellipse, Path, SvgProps } from "react-native-svg"


const IconArrowRight = (props:SvgProps) => (
  <Svg
    width={19}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Ellipse cx={9.578} cy={9} rx={9.422} ry={9} fill="#DD1E2F" />
    <Path
      d="M8.066 13a.631.631 0 0 1-.411-.147.451.451 0 0 1 0-.707l3.66-3.145-3.66-3.148a.451.451 0 0 1 0-.706.65.65 0 0 1 .822 0l4.071 3.5a.451.451 0 0 1 0 .706l-4.07 3.5a.631.631 0 0 1-.412.147Z"
      fill="#fff"
    />
  </Svg>
)

export default IconArrowRight
