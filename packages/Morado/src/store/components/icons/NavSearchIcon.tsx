import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

const NavSearchIcon = (props: SvgProps) => {
    console.log("Hi")
    return (
        <Svg
            width={25}
            height={24}
            fill="none"
            {...props}
        >
            <Path
                d="M11.293 19c4.535 0 8.212-3.582 8.212-8s-3.677-8-8.212-8C6.757 3 3.08 6.582 3.08 11s3.677 8 8.213 8ZM21.557 21l-4.465-4.35"
                stroke="#390052"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}


export default NavSearchIcon
