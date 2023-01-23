import React from "react";
import Svg, { SvgProps,Path } from "react-native-svg";

const BagIcon = (props: SvgProps) => {
  console.log("props", props)
    return (
      <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      d="M16.69 5.754A4.754 4.754 0 0 0 11.934 1a4.754 4.754 0 0 0-4.773 4.754m9.376 16.397H7.353c-3.374 0-5.963-1.219-5.227-6.124l.856-6.647c.453-2.448 2.014-3.384 3.384-3.384h11.2c1.39 0 2.86 1.007 3.384 3.384l.856 6.647c.624 4.351-1.894 6.124-5.268 6.124ZM15.198 10.71h-.05M8.783 10.71h-.05"
      stroke={props?.color || "#200E32"}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

};

export default BagIcon;
