import React from "react";
import Svg, { SvgProps,G, Defs, Path,ClipPath } from "react-native-svg";

const OffersVariant2Icon = (props: SvgProps) => {
    return (
      <Svg
 
      width={16}
      height={16}
      fill="none"
      {...props}
    >
      <G
        clipPath="url(#a)"
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path
          d="M12.224 13.455h-1.543c-.32 0-.628.125-.857.347l-.967.94a1.23 1.23 0 0 1-1.714 0l-.967-.94a1.231 1.231 0 0 0-.857-.347H3.775c-.679 0-1.23-.551-1.23-1.23V10.68c0-.32-.125-.627-.347-.857l-.94-.967a1.23 1.23 0 0 1 0-1.714l.94-.967c.222-.23.347-.537.347-.857V3.776c0-.68.551-1.23 1.23-1.23H5.32c.32 0 .627-.125.857-.348l.967-.94a1.23 1.23 0 0 1 1.714 0l.967.94c.23.223.536.348.857.348h1.543c.68 0 1.23.55 1.23 1.23v1.543c0 .32.125.628.348.857l.939.967a1.23 1.23 0 0 1 0 1.714l-.94.967c-.222.23-.347.537-.347.857v1.544c0 .679-.55 1.23-1.23 1.23Z"
          fill="#390052"
          stroke="#390052"
        />
        <Path
          d="m11.273 4.727-6.545 6.546M5.818 6.909a1.09 1.09 0 1 0 0-2.182 1.09 1.09 0 0 0 0 2.182ZM10.181 11.273a1.091 1.091 0 1 0 0-2.182 1.091 1.091 0 0 0 0 2.182Z"
          stroke="#fff"
        />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill="#fff" d="M0 0h16v16H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
 

};

export default OffersVariant2Icon;
