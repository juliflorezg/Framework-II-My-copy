import * as React from 'react';
import Svg, {Path, Mask, G, SvgProps} from 'react-native-svg';

const HomeIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Mask
      id="a"
      style={{
        maskType: 'luminance',
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={24}
      height={20}>
      <Path d="M24 0H0v20h24V0Z" fill="#fff" />
    </Mask>
    <G mask="url(#a)">
      <Path
        d="M22.957 10.652c-.261 0-.522-.087-.73-.239L12 2.087 1.774 10.413a1.22 1.22 0 0 1-1.487-.021c-.391-.348-.391-.892.026-1.24L11.27.24a1.213 1.213 0 0 1 1.46 0l10.957 8.913c.418.326.418.892.026 1.24a1.21 1.21 0 0 1-.756.26Zm-2.296 8.479v-8.5c0-.479-.47-.87-1.044-.87-.573 0-1.043.391-1.043.87v7.63h-3.26V13.61c0-.63-.627-1.152-1.383-1.152H10.07c-.757 0-1.383.521-1.383 1.152v4.652h-3.26v-7.63c0-.479-.47-.87-1.044-.87-.574 0-1.044.391-1.044.87v8.5c0 .478.47.87 1.044.87H9.73c.574 0 1.043-.392 1.043-.87v-4.935h2.478v4.935c0 .478.47.87 1.044.87h5.348c.574 0 1.017-.392 1.017-.87Z"
        fill={props.color}
      />
    </G>
  </Svg>
);

export default HomeIcon;