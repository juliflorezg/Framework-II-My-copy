import { BlockComponent } from '@my-app/app/src/framework/engine/types';
import { Image } from '@my-app/ui/src';
import React, { FC, useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Carousel } from 'react-native-ui-lib';
import Animated, { FlipInEasyY, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import useChildren from '@my-app/app/src/framework/engine/hooks/useChildren';


const Size = {
  width: '100%',
  height: 180,
};


type Item = {
  imgUrl: string;
  height?: number | string;
  width?: number | string
}

type IProps = {
  items: Item[]
  autoplay?: boolean;
  loop?: boolean;
  autoplayInterval?: boolean;
};

const defaultIndicator = {
  width: 8,
  height: 10,
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
      circle.value = withTiming(60, {
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



const CarouselComponent: FC<BlockComponent<IProps>> = ({ children, props }) => {
  const [indexACt, setIndexACt] = useState(0)
  const childrens = useChildren({ children })

  const onChangePage = (currentPage: number, _: any) => {
    setIndexACt(currentPage);
  };
  const renderItem = (item: any) => {
    return (
      <Image
        src={item.imgUrl}
        width={item?.width || Size.width}
        height={item?.height || Size.height}
      />
    );
  };

  const renderEasyCarrusel = (items: Item[]) => {
    return (
      <Animated.View style={styles.container}>
        <Carousel
          onChangePage={onChangePage}
          autoplay={props.autoplay}
          loop={props.loop}
          autoplayInterval={props.autoplayInterval}>
          {items.map((item, index: any) => renderItem(item))}
        </Carousel>
        <View style={styles.indicator}>
          {items.map((_, index: any) => (
            <Position
              key={index}
              active={index === indexACt}
            />
          ))}
        </View>
      </Animated.View>
    );
  }

  return (
    <>
      {props?.items && renderEasyCarrusel(props?.items)}
      {childrens?.length &&
        <Animated.View style={styles.containerChild}>
          <Carousel
            onChangePage={onChangePage}
            autoplay={props.autoplay}
            loop={props.loop}
            autoplayInterval={props.autoplayInterval}>
            {childrens}
          </Carousel>
        </Animated.View>

      }
    </>
  );
};

const styles = StyleSheet.create({
  containerChild: {
    width: "100%",
    marginTop: 5
    },
  container: {
    width: '100%',
    marginTop: 10,
    justifyContent: 'center',
    height: 200
  },
  indicator: {
    width: '100%',
    flexDirection: 'row',
    bottom: 10,
    height: 20,
    justifyContent: 'center',

    position: 'absolute'
  },
  indicatorInactive: {
    ...defaultIndicator,
    backgroundColor: "#C1C1C1"
  },
  indicatorActive: {
    ...defaultIndicator,
    backgroundColor: "#ffffff"
  }
})

export default CarouselComponent;
