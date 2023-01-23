import * as React from "react"
import Svg, { Rect, Path, SvgProps } from "react-native-svg"

const IconMyAccountOrders = (props:SvgProps) => (
  <Svg
    width={32}
    height={32}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect x={0.5} y={0.5} width={31} height={31} rx={15.5} stroke="#DD1E2F" />
    <Path
      d="M22.868 10.743A1.946 1.946 0 0 0 20.93 8.8h-2.906v1.943h2.906v2.574l-3.37 4.226h-3.41v-4.857h-3.875A3.88 3.88 0 0 0 6.4 16.57v2.915h1.937a2.906 2.906 0 1 0 5.812 0h4.34l4.379-5.489v-3.254Zm-14.53 6.8v-.972c0-1.068.871-1.942 1.937-1.942h1.937v2.914H8.337Zm2.905 2.914a.973.973 0 0 1-.968-.971h1.937a.973.973 0 0 1-.969.971Z"
      fill="#DD1E2F"
    />
    <Path
      d="M14.15 9.771H9.305v1.943h4.843V9.771ZM22.867 16.572a2.906 2.906 0 0 0-2.906 2.914 2.906 2.906 0 1 0 5.813 0 2.906 2.906 0 0 0-2.907-2.915Zm0 3.885a.973.973 0 0 1-.968-.971c0-.535.436-.972.968-.972a.973.973 0 0 1 0 1.943Z"
      fill="#DD1E2F"
    />
  </Svg>
)

export default IconMyAccountOrders