import * as React from "react"
import Svg, { Circle, Path, SvgProps } from "react-native-svg"

const IconMyAccountContact = (props:SvgProps) => (
  <Svg
    width={32}
    height={32}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx={16} cy={16} r={15.5} stroke="#DD1E2F" />
    <Path
      d="m24.48 19.487-1.65-1.65a2.64 2.64 0 0 0-3.703-.016 1.613 1.613 0 0 1-2.046.2 11.27 11.27 0 0 1-3.106-3.1 1.636 1.636 0 0 1 .213-2.054 2.64 2.64 0 0 0-.023-3.692l-1.65-1.65a2.636 2.636 0 0 0-3.721 0l-.475.476c-2.475 2.475-2.29 7.678 2.86 12.825 3.105 3.105 6.23 4.406 8.764 4.406a5.625 5.625 0 0 0 4.064-1.546l.475-.476a2.635 2.635 0 0 0-.001-3.723Zm-1.06 2.663-.475.476c-1.95 1.95-6.254 1.593-10.707-2.86-4.453-4.454-4.81-8.761-2.86-10.711l.472-.475a1.133 1.133 0 0 1 1.6 0l1.65 1.65a1.133 1.133 0 0 1 .015 1.583 3.136 3.136 0 0 0-.398 3.929 12.757 12.757 0 0 0 3.535 3.53 3.134 3.134 0 0 0 3.923-.388 1.134 1.134 0 0 1 1.589.01l1.65 1.65a1.133 1.133 0 0 1 .006 1.606Z"
      fill="#DD1E2F"
    />
  </Svg>
)

export default IconMyAccountContact