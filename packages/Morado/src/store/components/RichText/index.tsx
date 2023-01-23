import React, { FC, useEffect, useMemo, useState } from 'react';
import { Text } from '@my-app/ui';
import { View } from 'react-native';
import { useExtension } from '@my-app/app/src/framework/engine/extension/context';
import useChildren from '@my-app/app/src/framework/engine/hooks/useChildren';
import { BlockComponent } from '@my-app/app/src/framework/engine/types';
import { addVarToString } from '@my-app/app/src/framework/omni-logic/plugin/utils/addVarToString';
import useStyles from '@my-app/app/src/framework/styleguide/hooks/useStyles';
import { useNavigation } from '@react-navigation/native';

type RichTextProps = {
  text: string;
  defaultText?: string
  context?: string;
  style?: any;
};

export type ConnectedType = {
  context?: string;
};

export const useSharedValue = ({ context }: ConnectedType) => {
  if (!context) return null;
  const { hooks } = useExtension();
  const navigation = useNavigation()

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await getData()
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  //@ts-ignore
  const fn = hooks[context];


  const [response, setResponse] = useState(null);

  const getData = async () => {
    if (typeof fn !== 'function') return;
    const res = await fn()
    setResponse(res)
  }


  return response;
};

const RichText: FC<BlockComponent<RichTextProps>> = ({
  props,
  children,
}) => {

  const text = props?.text
  const context = props?.context
  const style = props?.style
  const defaultText = props?.defaultText
  const TextStyles = useStyles(style);
  const sharedValue = useSharedValue({ context });
  const childrens = useChildren({ children });




  const computedText = useMemo(() => {
    let result = text;
    if (context && sharedValue && text) {
      result = addVarToString(result, sharedValue);
    }
    return result;
  }, [text, sharedValue, defaultText]);

  if (typeof text === 'undefined' && !computedText) {
    return (
      <View style={TextStyles?.container}>
        <Text style={TextStyles?.text}>{childrens}</Text>
      </View>
    );
  }


  return <Text style={TextStyles?.text}>{(computedText === "undefined" && defaultText) ? defaultText : computedText}</Text>;
};

export default RichText;
