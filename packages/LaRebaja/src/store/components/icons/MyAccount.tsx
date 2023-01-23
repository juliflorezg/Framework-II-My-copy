import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const MyAccount = (props: SvgProps) => {
    return (
      <Svg
      width={20}
      height={22}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M19 21v-2.333a4.756 4.756 0 0 0-1.318-3.3A4.42 4.42 0 0 0 14.5 14h-9a4.42 4.42 0 0 0-3.182 1.367A4.756 4.756 0 0 0 1 18.667V21M10.5 10a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
    );
};

export default MyAccount;

