import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const ExitIcon = (props: SvgProps) => {
    return (
        <Svg
            width={14}
            height={14}
            fill="none"
            {...props}
        >
            <Path
                d="M13.07 12.181a.625.625 0 1 1-.882.882L7.001 7.88 1.819 13.07a.625.625 0 0 1-.88-.882L6.118 7 .932 1.819A.628.628 0 1 1 1.819.93L7.001 6.12 12.18.937a.625.625 0 0 1 .882.882L7.882 7l5.187 5.181Z"
                fill="#390052"
            />
        </Svg>
    );
};

export default ExitIcon;
