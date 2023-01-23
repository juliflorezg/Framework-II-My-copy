import React, { FC, useRef, useState } from 'react'
import { BlockComponent } from '@my-app/app/src/framework/engine/types'
import Animated, { runOnJS } from 'react-native-reanimated'
import useChildren from '@my-app/app/src/framework/engine/hooks/useChildren'
import useStyles from '@my-app/app/src/framework/styleguide/hooks/useStyles';
import { Dimensions, View } from 'react-native'
import { GestureHandlerRootView, PanGestureHandler, PanGestureHandlerGestureEvent,  TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useSharedValue, useAnimatedStyle, useAnimatedGestureHandler, withTiming } from 'react-native-reanimated'
import { snapPoint } from 'react-native-redash';
import { StepperProvider } from './context'
import { Text, Icons } from '@my-app/ui'
import SnapPoints from './components/SnapPointsComponent';
import { Link } from '@my-app/ui';

type StepperProps = {
    width: number
    title: string
    style?: string
    description: string[]
}
const StepperComponent: FC<BlockComponent<StepperProps>> = ({ children,
    props }) => {
    const width = Dimensions.get('window').width
    const Steps = useChildren({ children })
    const x = useSharedValue(0);
    const [currentSelectedIndex, setCurrentSelectedIndex] = useState(0)
    const currentPage = useSharedValue(0);
    const StepperStyles = useStyles(props?.style);
    const container = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: x.value }],
        };
    }, [x]);

    const points = Steps.map((_, index) => {
        if (index === 0) return 0;
        else return -Math.abs(width * index);
    });

    const stateRef = useRef()

    const gestureHandler = useAnimatedGestureHandler<
        PanGestureHandlerGestureEvent,
        { startX: number }
    >({
        onStart: (_, ctx) => {
            ctx.startX = x.value;
        },
        onActive: (event, ctx) => {
            x.value = ctx.startX + event.translationX;
        },
        onEnd: (event) => {
            x.value = withTiming(
                snapPoint(x.value, event.velocityX, points),
                {
                    duration: 500,
                },
                (isFinished) => {
                    currentPage.value = points.findIndex((v) => v === x.value);

                    runOnJS(setCurrentSelectedIndex)(currentPage.value);
                }
            );
        },
    });


    const XVelocityToRight = -1200
    const XVelocityToLeft = 1200

    const nextPage = () => {
        x.value = withTiming(
            snapPoint(x.value, XVelocityToRight, points),
            {
                duration: 500,
            },
            (isFinished) => {
                currentPage.value = points.findIndex((v) => v === x.value);
                runOnJS(setCurrentSelectedIndex)(currentPage.value);
            }
        );
    }

    const prevPage = () => {

        x.value = withTiming(
            snapPoint(x.value, XVelocityToLeft, points),
            {
                duration: 500,
            },
            (isFinished) => {
                currentPage.value = points.findIndex((v) => v === x.value);
                runOnJS(setCurrentSelectedIndex)(currentPage.value);
            }
        );
    }
    return <GestureHandlerRootView>
        <StepperProvider props={{
            currentPage,
            nextPage,
            prevPage
        }}>
            <View style={StepperStyles?.container}>
                <View style={[StepperStyles?.wrapperBackAndTitle, { flexDirection: "row", alignItems: 'center', paddingHorizontal: 16 }]}>
                    {currentSelectedIndex === 0 ?
                        <Link href='/walkthrough'>
                            <Icons.ChevronLeft width={32} height={32} color="red" />
                        </Link>
                        :
                        <TouchableWithoutFeedback onPress={() => prevPage()} >
                            <Icons.ChevronLeft width={32} height={32} color="red" />
                        </TouchableWithoutFeedback>
                    }
                    <Text style={StepperStyles?.title}>{props.title}</Text>
                </View>
                <Text style={StepperStyles?.description}>{props?.description[currentSelectedIndex]}</Text>
                <View style={{ marginTop: 16, width, justifyContent: "center", alignItems: "center" }}>
                    <SnapPoints currentPosition={currentSelectedIndex} pages={points.length} />
                </View>
                <PanGestureHandler onGestureEvent={gestureHandler}>

                    <Animated.View style={[
                        {
                            flexDirection: "row",
                            width: width * Steps?.length
                        },
                        container,
                    ]}>
                        {
                            Steps?.map((Step, index) => {
                                return <Animated.View key={index} style={{
                                    width
                                }}>
                                    {Step}
                                </Animated.View>
                            })
                        }
                    </Animated.View>
                </PanGestureHandler>
            </View>
        </StepperProvider>

    </GestureHandlerRootView>
}

export default StepperComponent