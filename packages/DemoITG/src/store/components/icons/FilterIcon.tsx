import React from "react";
import Svg, { SvgProps,Path } from "react-native-svg";

const FilterIcon = (props: SvgProps) => {
  console.log("props", props)
    return (
      <Svg
      width={20}
      height={22}
      fill="none"
      {...props}
    >
      <Path
        d="M4.17 17a3 3 0 0 1 5.66 0H20v2H9.83a3 3 0 0 1-5.66 0H0v-2h4.17Zm6-7a3 3 0 0 1 5.66 0H20v2h-4.17a3 3 0 0 1-5.66 0H0v-2h10.17Zm-6-7a3.001 3.001 0 0 1 5.66 0H20v2H9.83a3.001 3.001 0 0 1-5.66 0H0V3h4.17ZM7 5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm6 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm-6 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
        fill="#000"
      />
    </Svg>
)

};

export default FilterIcon;
