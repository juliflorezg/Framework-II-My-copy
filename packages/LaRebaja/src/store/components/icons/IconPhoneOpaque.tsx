import * as React from "react"
import Svg, { G, Path, Defs, ClipPath,SvgProps } from "react-native-svg"
import { StyleSheet } from 'react-native'

const IconPhoneOpaque = (props:SvgProps) => (
  <Svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={StyleSheet.absoluteFillObject}
    {...props}
  >
    <Path
      d="m19.969 15.117-.909 3.937a1.214 1.214 0 0 1-1.19.946C8.017 20 0 11.984 0 2.129c0-.573.39-1.062.946-1.19L4.884.032A1.226 1.226 0 0 1 6.28.74l1.817 4.238c.213.5.07 1.081-.35 1.424L5.645 8.09a13.658 13.658 0 0 0 6.23 6.23l1.722-2.102c.34-.42.925-.566 1.425-.35l4.238 1.816c.51.269.842.862.709 1.433Z"
      fill="#888"
    />
  </Svg>
)

export default IconPhoneOpaque
