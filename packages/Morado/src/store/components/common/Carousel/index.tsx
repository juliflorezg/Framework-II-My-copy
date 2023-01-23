import {BlockComponent} from '@my-app/app/src/framework/engine/types';
import {Image} from '@my-app/ui/src';
import React, {FC} from 'react';
import {View, Text} from 'react-native';
import {Carousel} from 'react-native-ui-lib';

const Size = {
  width: '100%',
  height: 200,
};

type IProps = {
  items: {imgUrl: string; height?: number | string; width?: number | string}[];
  autoplay?: boolean;
  loop?: boolean;
  autoplayInterval?: boolean;
};

const CarouselComponent: FC<BlockComponent<IProps>> = ({props}) => {
  const renderItem = (item: any, index: any) => {
    return (
      <View style={{width: item?.width || Size.width}} key={index}>
        <Image
          src={item.imgUrl}
          width={item?.width || Size.width}
          height={item?.height || Size.height}
        />
      </View>
    );
  };

  return (
    <Carousel
      autoplay={props.autoplay}
      loop={props.loop}
      autoplayInterval={props.autoplayInterval}>
      {props?.items.map((item, index: any) => renderItem(item, index))}
    </Carousel>
  );
};

export default CarouselComponent;
