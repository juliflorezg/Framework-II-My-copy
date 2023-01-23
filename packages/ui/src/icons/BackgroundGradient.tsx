import React from "react";
import { Defs, LinearGradient, Rect, Stop, SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";
import { StyleSheet } from 'react-native'

const FROM_COLOR = 'rgb(221, 30, 47)';
const TO_COLOR = 'rgb(121,19,18)';


const BackgroundGradient = (props: SvgProps) => {
    return (
        <Svg height="100%" width="100%" style={StyleSheet.absoluteFillObject} {...props}>
            <Defs>
                <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <Stop offset="0" stopColor={FROM_COLOR} />
                    <Stop offset="1" stopColor={TO_COLOR} />
                </LinearGradient>
            </Defs>
            <Rect width="100%" height="100%" fill="url(#grad)" />
        </Svg>
    );
};



export default BackgroundGradient;
