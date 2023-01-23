import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

const IconCart = (props:SvgProps) => (
  <Svg
    width={30}
    height={28}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M18.723 15.75a2.42 2.42 0 0 0 2.134-1.287l4.367-8.113c.45-.825-.134-1.85-1.061-1.85H6.11L4.964 2H.976v2.5h2.44l4.39 9.488-1.646 3.05c-.89 1.674.28 3.712 2.134 3.712h14.637v-2.5H8.294l1.342-2.5h9.087ZM7.27 7h14.819l-3.366 6.25H10.16L7.27 7Zm1.024 15c-1.341 0-2.427 1.125-2.427 2.5S6.953 27 8.294 27c1.342 0 2.44-1.125 2.44-2.5S9.636 22 8.294 22Zm12.197 0c-1.341 0-2.427 1.125-2.427 2.5S19.15 27 20.491 27c1.342 0 2.44-1.125 2.44-2.5S21.833 22 20.49 22Z"
      fill="#F5F5F5"
    />
  </Svg>
)

export default IconCart
