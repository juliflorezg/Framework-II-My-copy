import React, {
    FC,
    useEffect,
} from 'react';
import {
    useWindowDimensions,
    View,
} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    useAnimatedRef
} from 'react-native-reanimated';

const PLPActionSheet: FC<any> = ({
    displayActionSheet,
    closeActionSheet,
    actionSheetContent,
}) => {
    const bodyRef = useAnimatedRef<Animated.View>();
    const { height } = useWindowDimensions();
    // const { displayActionSheet, closeActionSheet, actionSheetContent } = useUI();

    const startingPosition = height;
    const y = useSharedValue(startingPosition);
    const style = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: y.value }],
        };
    }, [y]);

    useEffect(() => {
        if (displayActionSheet) {
            // @ts-ignore
            bodyRef?.current?.measure((x, yT, w, h) => {
                y.value = withTiming(-h - 80, { duration: 500 });
            });
        } else {
            if (y.value !== startingPosition) {
                y.value = withTiming(startingPosition, { duration: 500 });
            }
        }
    }, [bodyRef, displayActionSheet, startingPosition]);

    return (
        <>
            {displayActionSheet && (
                <View
                    onTouchEnd={() => closeActionSheet(false)}
                    style={{
                        zIndex: 1,
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#000',
                        opacity: 0.5,
                    }}
                />
            )}

            <Animated.View
                ref={bodyRef}
                renderToHardwareTextureAndroid={true}
                style={[
                    {
                        zIndex: 1,
                        width: '100%',
                        top: height,
                        position: 'absolute',
                        backgroundColor: 'white',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                        paddingVertical: 20,
                    },
                    style,
                ]}>
                {actionSheetContent}
            </Animated.View>
        </>
    );
};

export default PLPActionSheet