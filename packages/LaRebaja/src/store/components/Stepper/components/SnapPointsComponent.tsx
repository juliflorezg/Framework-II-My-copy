import { makeid } from "@my-app/app/src/framework/engine/utils/randomKey"
import React, { FC, useCallback, useEffect, useMemo } from "react"
import { View,StyleSheet } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"
import { SnapPointsProps } from "../types"

const Point: FC<{isActive: boolean}> = ({ isActive }) => {

    const circleWidth = useSharedValue(8)
    const activeCircleStyles = useAnimatedStyle(()=> {
        return {
            width: circleWidth.value,
        }
    }, [])

    useEffect(()=> {
        if(isActive) circleWidth.value = withTiming(56, { duration: 1000 })
        else circleWidth.value = withTiming(circleSize.width, { duration: 1000 })
    }, [isActive])


    return <Animated.View style={[isActive ? defaultStyles.activeCircle : defaultStyles.inactiveCircle, activeCircleStyles]} />
}

const SnapPoints: FC<SnapPointsProps> = ({currentPosition, pages}) => {
    
    const parseNumberToArray = useCallback((n:number) => {
        let pagesArr: number[] = []
        for(let i = 0; i < n; i++){
            pagesArr.push(i)
        }
        return pagesArr
    }, [])

    let pagesArr = parseNumberToArray(pages)

    const renderPoints = useMemo(() => {
        return pagesArr.map((_,index)=> <Point key={index} isActive={currentPosition === index} /> )
    }, [currentPosition])

    return <View style={{flexDirection: "row"}}>
        {renderPoints}
    </View>
}

const circleSize = {
    width: 8,
    height: 8,
    borderRadius: 16,
    marginHorizontal: 4
}

const defaultStyles = StyleSheet.create({
    inactiveCircle: {
       ...circleSize,
       backgroundColor: "#C1C1C1"
    },
    activeCircle: {
       ...circleSize,
       backgroundColor: "#DD1E2F"
    }
})

export default SnapPoints


