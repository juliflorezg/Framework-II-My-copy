import * as React from 'react';
import Svg, {Circle, SvgProps} from 'react-native-svg';

const Eclipse = (props: SvgProps) => (
  <Svg
    width={17}
    height={17}
    {...props}>
    <Circle cx={8} cy={8} r={8} fill={props.fill} />
  </Svg>
);

export default Eclipse;
