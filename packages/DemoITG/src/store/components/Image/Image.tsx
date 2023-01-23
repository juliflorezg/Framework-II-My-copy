import React, {FC} from 'react';
import {ImageBackgroundComponent, Image} from '@my-app/ui';
import useChildren from '@my-app/app/src/framework/engine/hooks/useChildren';
import {BlockComponent} from '@my-app/app/src/framework/engine/types';
import {ViewStyle} from 'react-native';
import useStyles from '@my-app/app/src/framework/styleguide/hooks/useStyles';

type StylesProps = {
  container?: ViewStyle;
};

const ImageComponent: FC<BlockComponent> = ({
  children,
  props = {type: 'default'},
}) => {
  const childrens = useChildren({children});
  const style = useStyles(props?.style) as StylesProps;

  const renderImageBackground = () => {
    return (
      <ImageBackgroundComponent
        style={[{flex: 1}, [style.container]]}
        resizeMode={props?.resizeMode}
        source={{uri: props?.uri}}>
        {childrens}
      </ImageBackgroundComponent>
    );
  };

  const renderImage = () => {
    return (
      <Image
        src={props?.uri}
        width={props?.width}
        height={props?.height}
        resizeMode={props?.resizeMode}
      />
    );
  };

  const render =
    props.type === 'background' ? renderImageBackground() : renderImage();

  return render;
};

export default ImageComponent;
