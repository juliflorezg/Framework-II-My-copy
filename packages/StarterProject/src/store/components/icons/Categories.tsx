import React from "react";
import Svg, { SvgProps,Rect } from "react-native-svg";

const CategoriesIcon = (props: SvgProps) => {
    return (
        <Svg
    width={24}
    height={24}
    fill="none"
  >
    <Rect
      x={0.75}
      y={0.75}
      width={9.088}
      height={9.088}
      rx={3.25}
      stroke={props?.color}
      strokeWidth={1.5}
    />
    <Rect
      x={14.162}
      y={0.75}
      width={9.088}
      height={9.088}
      rx={3.25}
      stroke={props?.color}
      strokeWidth={1.5}
    />
    <Rect
      x={14.162}
      y={14.162}
      width={9.088}
      height={9.088}
      rx={3.25}
      stroke={props?.color}
      strokeWidth={1.5}
    />
    <Rect
      x={0.75}
      y={14.162}
      width={9.088}
      height={9.088}
      rx={3.25}
      stroke={props?.color}
      strokeWidth={1.5}
    />
  </Svg>
)

};

export default CategoriesIcon;
