import {useExtension} from '@my-app/app/src/framework/engine/extension/context';
import {BlockComponent} from '@my-app/app/src/framework/engine/types';
import {makeid} from '@my-app/app/src/framework/engine/utils/randomKey';
import {addVarToString} from '@my-app/app/src/framework/omni-logic/plugin/utils/addVarToString';
import useStyles from '@my-app/app/src/framework/styleguide/hooks/useStyles';
import {Input} from '@my-app/ui/src';
import {ArrowLeft} from '@my-app/ui/src/icons';
import {useLinkTo, useNavigation} from '@react-navigation/native';
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {View, Text, FlatList, StyleSheet, Modal, TouchableWithoutFeedback, ViewStyle, TextStyle, Share} from 'react-native';
import {
  TouchableOpacity,
} from 'react-native-ui-lib';
import {ShareIcon} from '../../icons';
 
 
 
type IProps = {
  text?: string;
  style?: string;
  slug?:string
};

type StyleProps = {
  containerShare?: ViewStyle;
  wrapShare?: ViewStyle;
  textShareStyles?: TextStyle;
  shareIcon?: ViewStyle;
};

 
const ShareComponent: FC <IProps> = ({ text, style, slug}) => {
 
 
  const ShareStyles = useStyles(style) as StyleProps
  
  const url = slug;
  const title = "Comparta sus productos";
  const message = `Comparte tus productos favoritos. https://soymorado.co/${slug}/p`;
  
  const options = {
    title,
    url,
    message,
  };

  
  console.log("props",text)
  const onShare = async () => {
    try {
      const result = await Share.share(options, {dialogTitle:title,subject:title});
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error?.message);
    }
  };

  return   (
 <View style={[ShareStyles?.containerShare,defaultStyles.containerShare]}>
    <TouchableOpacity onPress={onShare}>
    <View style={[ShareStyles?.wrapShare,defaultStyles.wrapShare]}>
    <View style={[ShareStyles?.shareIcon,defaultStyles.shareIcon]}>
        <ShareIcon
          color={'#390052'}
          // fill={fill}
        />
      </View>
      <Text style={[ShareStyles?.textShareStyles,defaultStyles.textShareStyles]}>
        {text || '¿Qué productos necesitas?'}
      </Text>
      
    </View>
  </TouchableOpacity>

  </View>
)  
};

export default ShareComponent;

const defaultStyles = StyleSheet.create({
  containerShare: {
   
  },
  wrapShare: {
    
  },
  
  textShareStyles:  {
     
  },
  itemContainer: {
   
  },
  
  shareIcon: {
     
  },
});
