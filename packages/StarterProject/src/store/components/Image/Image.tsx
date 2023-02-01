import React, {FC, useMemo} from 'react';
import {ImageBackgroundComponent, Image} from '@my-app/ui';
import useChildren from '@my-app/app/src/framework/engine/hooks/useChildren';
import {BlockComponent} from '@my-app/app/src/framework/engine/types';
import {useSharedValue} from '../RichText';
import {addVarToString} from '@my-app/app/src/framework/omni-logic/plugin/utils/addVarToString';
import {ImageStyle, StyleProp} from 'react-native';


const ImageComponent: FC<
  BlockComponent<{
    context?: string;
    type?: string;
    uri?: string;
    resizeMode?: 'center' | 'repeat' | 'cover' | 'contain' | 'stretch';
    width: string | number;
    height: string | number;
    style?: StyleProp<ImageStyle>;
  }>
> = ({children, props = {type: 'default'}}) => {
  const childrens = useChildren({children});

  const context = props?.context;
  const sharedValue = useSharedValue({context});

  const computedImageUri = useMemo(() => {
    let result = props?.uri;
    if (context && sharedValue && props?.uri) {
      result = addVarToString(result as string, sharedValue);
    }
    return result;
  }, [props?.uri, sharedValue]);

  const renderImageBackground = () => {
    return (
      <ImageBackgroundComponent
        style={{flex: 1}}
        resizeMode={props?.resizeMode}
        source={{uri: computedImageUri}}>
        {childrens}
      </ImageBackgroundComponent>
    );
  };

  const renderImage = () => {
    return (
      <Image
        src={computedImageUri as string}
        //@ts-ignore
        width={props?.width}
        //@ts-ignore
        height={props?.height}
        resizeMode={props?.resizeMode}
        style={props?.style}
      />
    );
  };

  const render =
    props.type === 'background' ? renderImageBackground() : renderImage();

  return render;
};

export default ImageComponent;
