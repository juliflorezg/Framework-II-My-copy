import React from "react";
import Svg, { SvgProps,Path } from "react-native-svg";

const ShareIcon = (props: SvgProps) => {
    return (
      <Svg
      width={20}
      height={20}
      fill="none"
      {...props}
    >
      <Path
        d="M16 12c-1.43 0-2.674.755-3.382 1.883l-4.96-2.277A3.98 3.98 0 0 0 8 10c0-.572-.125-1.114-.341-1.606l4.96-2.277A3.987 3.987 0 0 0 16 8a4 4 0 1 0-4-4c0 .423.084.823.206 1.206L7.13 7.536A3.977 3.977 0 0 0 4 6a4 4 0 1 0 0 8 3.98 3.98 0 0 0 3.128-1.537l5.078 2.33A3.956 3.956 0 0 0 12 16a4 4 0 1 0 4-4Zm0-11a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM4 13a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm12 6a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"
        fill="#000"
      />
    </Svg>
)

};

export default ShareIcon;
