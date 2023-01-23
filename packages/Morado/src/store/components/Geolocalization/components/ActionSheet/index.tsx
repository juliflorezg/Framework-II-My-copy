import React, { FC, useEffect, useState } from 'react';
import {
    StyleSheet,
    useWindowDimensions,
    KeyboardAvoidingView,
    View,
    LayoutRectangle
} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    useAnimatedRef,
} from 'react-native-reanimated';
import { BlockComponent } from '@my-app/app/src/framework/engine/types';
import { useCommons } from '@my-app/app/src/framework/omni-logic/kernel/utils/use-hook';
import { useGlobalState } from '@my-app/app/src/framework/state-machine';

const MachineConfig = {
    machineName: 'cartManager',
    pointer: 'products',
};

export const GeolocalizationActionSheet: FC<any> = ({ props, children }) => {
    const { height } = useWindowDimensions();
    const [expanded, setExpanded] = useState(false);
    const [contentHeight, setContentHeight] = useState(0)
    const heightPosition = contentHeight > 0 ? height / contentHeight : height / 2;
    const y = useSharedValue(heightPosition);
    const style = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: y.value }],
        };
    }, [y]);

    useEffect(() => {
        if (expanded) {
            // @ts-ignore
            y.value = withTiming(heightPosition - 100, { duration: 500 });
        } else {
            if (y.value !== heightPosition) {
                y.value = withTiming(heightPosition, { duration: 500 });
            }
        }
    }, [expanded, heightPosition]);
    
    const getDimensions = (layout: LayoutRectangle) => {
        const { x, y, width, height } = layout;
        setContentHeight(height)
    }

    return (

        <Animated.View
            onLayout={(event) => { getDimensions(event.nativeEvent.layout) }}
            style={[
                {
                    width: '100%',
                    bottom: 0,
                    position: 'absolute',
                    backgroundColor: 'white',
                    borderTopLeftRadius: 40,
                    borderTopRightRadius: 40,
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    padding: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                style,
            ]}>
            {children}
        </Animated.View>
    );
};

const defaultStyles = StyleSheet.create({
});
