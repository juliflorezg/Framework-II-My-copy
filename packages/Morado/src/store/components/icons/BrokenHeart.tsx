import React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const BrokenHeartIcon = (props: SvgProps) => {
  return (
    <Svg width={40} height={40} fill="none" {...props}>
      <Path
        d="m17.188 23.675 3.125-5.731-4.063-5.1.875-3.669A8.75 8.75 0 0 0 4.82 10.269C1.72 13.963 3.207 20 6.25 23.75 9.294 27.5 16.344 32 18.607 33.375c.23.139.503.19.768.144l1.25-5.306-3.437-4.538ZM35.394 10.206A8.75 8.75 0 0 0 23.08 9.131l-1.5 3.463 3.125 5.731-4.081 5.1 2.587 5.075-2.168 5c.219.01.436-.044.625-.156 2.231-1.4 9.287-5.844 12.325-9.65 3.037-3.806 4.506-9.794 1.4-13.488Z"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default BrokenHeartIcon;
