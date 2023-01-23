
import React, { FC, useMemo } from 'react'
import { ImageBackgroundComponent, Image } from '@my-app/ui'
import useChildren from '@my-app/app/src/framework/engine/hooks/useChildren'
import { BlockComponent } from '@my-app/app/src/framework/engine/types'
import { useSharedValue } from '../RichText'
import { addVarToString } from '@my-app/app/src/framework/omni-logic/plugin/utils/addVarToString'

const ImageComponent: FC<BlockComponent> = ({ children, props = { type: "default" } }) => {
    const childrens = useChildren({ children })
    const context = props?.context
    const sharedValue = useSharedValue({ context });

    const computedImageUri = useMemo(() => {
        let result = props?.uri;
        if (context && sharedValue && props?.uri) {
          result = addVarToString(result, sharedValue);
        }
        return result;
      }, [props?.uri, sharedValue]);


    
    const renderImageBackground = () => {
        return <ImageBackgroundComponent style={{ flex: 1 }} resizeMode={props?.resizeMode} source={{ uri: computedImageUri }} >
            {childrens}
        </ImageBackgroundComponent>
    }

    const renderImage = () => {
        return <Image src={computedImageUri} width={props?.width} height={props?.height} resizeMode={props?.resizeMode} />
    }

    const render = props.type === 'background' ?  renderImageBackground() : renderImage()
    
    return render
}

export default ImageComponent