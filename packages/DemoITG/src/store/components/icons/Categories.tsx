import React from "react";
import Svg, { SvgProps, Path} from "react-native-svg";

const CategoriesIcon = (props: SvgProps) => {
    return (
      <Svg
      width={24}
      height={20}
      fill="none"
      {...props}
    >
      <Path
        d="m19.379 13.848 3.316 3.568-1.096 1.179-3.315-3.57c-1.233 1.065-2.768 1.644-4.348 1.642-3.847 0-6.968-3.36-6.968-7.5 0-4.14 3.121-7.5 6.967-7.5 3.847 0 6.968 3.36 6.968 7.5a7.833 7.833 0 0 1-1.524 4.68Zm-1.553-.619c.982-1.087 1.531-2.545 1.529-4.062 0-3.224-2.426-5.834-5.42-5.834-2.994 0-5.419 2.61-5.419 5.834 0 3.222 2.425 5.833 5.42 5.833 1.409.002 2.763-.588 3.774-1.646l.116-.125Z"
        fill={props?.color}
      />
      <Path d="M6.194 5.417H0M3.871 8.75H0M6.194 12.083H0" stroke={props?.color} />
    </Svg>
)

};

export default CategoriesIcon;
