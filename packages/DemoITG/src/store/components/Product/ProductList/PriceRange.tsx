import React, {
    FC,
    useEffect,
    useRef,
    useState,
} from 'react';
import {
    View,
    TextInput,
    ViewStyle,
    StyleSheet
} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withSpring,
    runOnJS,
    useAnimatedGestureHandler,
} from 'react-native-reanimated';
import Svg, { Line } from 'react-native-svg';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

import usePrice from '@vercel/commerce/product/use-price';

const { View: AView, createAnimatedComponent } = Animated;
const ALine = createAnimatedComponent(Line);
const AText = createAnimatedComponent(TextInput);

const clamp = (value, lowerBound, upperBound) => {
    'worklet';
    return Math.max(lowerBound, Math.min(value, upperBound));
};


const usePanGesture = (
    initialPosition: number,
    maxWidth: number,
    minPos: number,
    maxPos: number,
) => {
    const translateX = useSharedValue(initialPosition);
    const isSliding = useSharedValue(false);
    const [transX, setTransX] = useState(
        Math.round(minPos + (translateX.value / maxWidth) * (maxPos - minPos)),
    );

    const onGestureHandle = useAnimatedGestureHandler({
        onStart: (_e, ctx) => {
            ctx.offsetX = translateX.value;
        },
        onActive: ({ translationX }, ctx) => {
            translateX.value = clamp(translationX + ctx.offsetX, minPos, maxPos);
        },
        onEnd: ({ translationX }) => {
            isSliding.value = false;
            translateX.value = withTiming(
                translateX.value,
                {
                    duration: 500,
                },
                isFinished => {
                    translateX.value = withSpring(translateX.value);

                    runOnJS(setTransX)(
                        Math.round((translateX.value * (maxPos - minPos)) / 100),
                    );
                },
            );
        },
    });

    return { transX, onGestureHandle, translateX };
};

const usePanGestureComponent = (
    initialPosition: number,
    maxWidth: number,
    minPos: number,
    maxPos: number,
    styles?: {
        knob?: ViewStyle;
    },
) => {
    const { transX, onGestureHandle, translateX } = usePanGesture(
        initialPosition,
        maxWidth,
        minPos,
        maxPos,
    );

    const knobStyle = useAnimatedStyle(() => {
        return {
            // Animate translateX
            transform: [{ translateX: translateX.value }],
        };
    });

    const Pan = () => (
        <PanGestureHandler
            onGestureEvent={onGestureHandle}
            onHandlerStateChange={onGestureHandle}>
            <AView style={[defaultStyles.knob, styles?.knob, knobStyle]} />
        </PanGestureHandler>
    );

    return { transX, Pan, translateX };
};

export const PriceRangeComponent: FC<PriceRangeProps> = ({
    priceRange,
    styles,
    minValue = 0,
    maxValue = 10000,
}) => {
    const width = 200;
    const minPosX1 = 0;
    const maxPosX1 = width / 2;
    const minPosX2 = width / 2;
    const maxPosX2 = width;

    const {
        Pan: PanLeft,
        translateX: x1,
        transX: transX1,
    } = usePanGestureComponent(0, width, minPosX1, maxPosX1);
    const {
        Pan: PanRight,
        translateX: x2,
        transX: transX2,
    } = usePanGestureComponent(width, width, minPosX2, maxPosX2);

    const min = useRef(null);
    const max = useRef(null);

    const { price: priceFrom } = usePrice(
        min
            ? {
                amount: Math.round(
                    minValue + (transX1 / width) * (maxValue - minValue),
                ),
                currencyCode: 'COP',
            }
            : {
                amount: 0,
                currencyCode: 'COP',
            },
    );

    const { price: priceTo } = usePrice(
        max && {
            amount: Math.round(minValue + (transX2 / width) * (maxValue - minValue)),
            currencyCode: 'COP',
        },
    );

    useEffect(() => {
        if (transX1) {
            min?.current?.setNativeProps({
                text: `${priceFrom}`,
            });
        } else {
            min?.current?.setNativeProps({
                text: `${priceFrom}`,
            });
        }
    }, [transX1]);

    useEffect(() => {
        if (transX2) {
            max?.current?.setNativeProps({
                text: `${priceTo}`,
            });
        }
    }, [transX2]);

    useEffect(() => {
        if (transX1 && transX2) {
            priceRange({
                from: `${Math.round(
                    minValue + (transX1 / width) * (maxValue - minValue),
                )}`,
                to: `${Math.round(
                    minValue + (transX2 / width) * (maxValue - minValue),
                )}`,
            });
        } else if (!transX1 && transX2) {
            priceRange({
                from: `0`,
                to: `${Math.round(
                    minValue + (transX2 / width) * (maxValue - minValue),
                )}`,
            });
        }
    }, [transX1, transX2]);

    return (
        <GestureHandlerRootView
            style={[defaultStyles.containerPriceRange, styles?.containerPriceRange]}>
            <View style={[defaultStyles.lane, styles?.lane]} />
            <View
                style={[defaultStyles.textContainer, styles?.textContainerPriceRange]}>
                <AText
                    defaultValue="0"
                    editable={false}
                    ref={min}
                    style={[defaultStyles.label, styles?.labelPriceRange]}
                />

                <AText
                    defaultValue={width.toString()}
                    editable={false}
                    ref={max}
                    style={[defaultStyles.label, styles?.labelPriceRange]}
                />
            </View>
            <View style={{ justifyContent: 'center', position: 'absolute' }}>
                <Svg height="6" width={width}>
                    <ALine
                        stroke={'#394DA6'}
                        strokeWidth="12"
                        x1={x1.value}
                        y1={0}
                        x2={x2.value}
                        y2={0}
                    />
                </Svg>
            </View>
            <PanLeft />
            <PanRight />
        </GestureHandlerRootView>
    );
};


const defaultStyles = StyleSheet.create({

    containerPriceRange: {
        marginTop: 20,
        marginHorizontal: 40,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        flexDirection: 'row',
        marginBottom: 40,
        alignContent: 'center',
        width: '100%',
        justifyContent: 'space-between',
    },
    label: {
        fontSize: 14,
        color: '#777',
    },
    lane: {
        backgroundColor: 'rgba(57, 77, 166, 0.2)',
        position: 'absolute',
        height: 10,
        borderRadius: 6,
        width: 200,
    },
    knob: {
        height: 20,
        width: 20,
        left: "15%",
        borderRadius: 10,
        backgroundColor: '#fff',
        position: 'absolute',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
})