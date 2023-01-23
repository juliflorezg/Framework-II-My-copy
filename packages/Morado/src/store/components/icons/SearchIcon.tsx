import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const SearchIcon = (props: SvgProps) => {
  return (
    <Svg
      width={20}
      height={20}
      fill="none"

      {...props}
    >
      <Path
        d="M18.449 19.63a.752.752 0 0 1-.533-.221l-4.353-4.354a.75.75 0 1 1 1.06-1.061l4.355 4.357a.75.75 0 0 1-.53 1.279Z"
        fill="#F96F88"
      />
      <Path
        d="M8.013 14.789a7.21 7.21 0 1 1 7.207-7.212 7.223 7.223 0 0 1-7.207 7.212Zm0-12.919a5.711 5.711 0 1 0-.008 11.422A5.711 5.711 0 0 0 8.013 1.87Z"
        fill="#390052"
      />
    </Svg>
  );
};

export default SearchIcon;
