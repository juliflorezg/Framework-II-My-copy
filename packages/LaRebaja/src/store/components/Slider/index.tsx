import React, { FC, useEffect, useRef, useState } from 'react'
import { View, StyleSheet, Text, FlatList } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

export type PropsList = {
 title: string
 body: string
}

interface PropsSlider {
 props: PropsList[]
}

const defaultIndicator = {
 width: 8,
 height: 8,
 borderRadius: 50,
 marginHorizontal: 10
}

const Position: FC<{ active: boolean }> = ({ active }) => {
 const circle = useSharedValue(defaultIndicator.width)
 const widthCircle = useAnimatedStyle(() => {
  return {
   width: circle.value
  }
 }, [])

 useEffect(() => {
  if (active) {
   circle.value = withTiming(56, {
    duration: 500
   })
  } else {
   circle.value = withTiming(defaultIndicator.width, {
    duration: 500
   })
  }
 }, [active])

 return (
  <Animated.View
   style={
    [active
     ? styles.indicatorActive
     : styles.indicatorInactive,
     widthCircle
    ]} />
 )
}


const Slider: FC<PropsSlider> = ({ props }) => {
 const [indexACt, setIndexACt] = useState(0)
 const scrollX = useRef(({ viewableItems }: any) => {
  setIndexACt(viewableItems[0].index)
 })

 const renderItem = ({ title, body }: PropsList) => {
  return (
   <View style={styles.containerFlat}>
    <Text style={styles.title} >{title}</Text>
    <Text style={styles.body} >{body}</Text>
   </View>
  )
 }

 return (
  <>
   <Animated.View style={styles.indicator}>
    {props.map((_, index) => (     
     <Position
     key={index}
     active = {index === indexACt}
     />
    ))
    }
   </Animated.View>
   <Animated.View style={styles.container}>
    <Animated.FlatList
     data={props}
     renderItem={({ item }: any) => renderItem(item)}
     keyExtractor={item => item.title.toString()}
     horizontal={true}
     showsHorizontalScrollIndicator={false}
     contentContainerStyle={styles.flatList}
     onViewableItemsChanged={scrollX.current}
     snapToInterval={340}
     decelerationRate={0}
    />
   </Animated.View>
  </>
 )
}

const styles = StyleSheet.create({
 container: {
  width: "95%",
  height: 150,
  paddingHorizontal: 15,
  paddingEnd: 30,
 },
 flatList: {
  marginVertical: 8,
  marginHorizontal: 10,
 },
 containerFlat: {
  flex: 1,
 },

 title: {
  height: 40,
  width: 330,
  fontSize: 26,
  fontFamily: "Poppins-SemiBold",
  fontWeight: 'bold',
  color: "#1A1919",
  paddingHorizontal: 5,
 },
 body: {
  flex: 1,
  width: 324,
  height: 80,
  fontSize: 14,
  fontFamily: "Poppins-Regular",
  color: "#888888",
  textAlign: 'left',
  padding: 5,
  overflow: 'hidden',
 },
 indicator: {
  height: 30,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 15
 },
 indicatorInactive: {
  ...defaultIndicator,
  backgroundColor: "#C1C1C1"
 },
 indicatorActive: {
  ...defaultIndicator,
  backgroundColor: "#DD1E2F"
 }

})

export default Slider