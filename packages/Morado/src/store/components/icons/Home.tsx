import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const HomeIcon = (props: SvgProps) => {
    return (
        <Svg
            width={24}
            height={19}
            fill="none"
            {...props}
        >
            <Path
                d="M1.38 7.125h21.24c.761 0 1.38-.612 1.38-1.366 0-.27-.082-.534-.233-.757L20.933.794A1.796 1.796 0 0 0 19.436 0H4.564c-.6 0-1.163.297-1.497.794L.232 5c-.15.226-.232.49-.232.757 0 .757.619 1.369 1.38 1.369ZM2.4 8.313v8.906c0 .983.806 1.781 1.8 1.781h8.4c.994 0 1.8-.798 1.8-1.781V8.312H12v8.313H4.8V8.312H2.4Zm16.8 0v9.5c0 .656.536 1.187 1.2 1.187.664 0 1.2-.53 1.2-1.188v-9.5h-2.4Z"
                fill={props?.fill || "#000"}
            />
        </Svg>
    );
};

export default HomeIcon;
