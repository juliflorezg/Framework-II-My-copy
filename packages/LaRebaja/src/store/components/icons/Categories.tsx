import React from "react";
import Svg, { SvgProps,Rect } from "react-native-svg";

const CategoriesIcon = (props: SvgProps) => {
    return (
      <Svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect
        x={1}
        y={1}
        width={8.588}
        height={8.588}
        rx={1}
        strokeWidth={2}
      />
      <Rect
        x={14.412}
        y={1}
        width={8.588}
        height={8.588}
        rx={1}
        strokeWidth={2}
      />
      <Rect
        x={14.412}
        y={14.412}
        width={8.588}
        height={8.588}
        rx={1}
        strokeWidth={2}
      />
      <Rect
        x={1}
        y={14.412}
        width={8.588}
        height={8.588}
        rx={1}
        strokeWidth={2}
      />
    </Svg>
)

};

export default CategoriesIcon;
