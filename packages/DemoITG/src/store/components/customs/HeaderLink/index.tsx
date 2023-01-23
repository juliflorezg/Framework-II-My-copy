import useStyles from '@my-app/app/src/framework/styleguide/hooks/useStyles';
import React, { FC, useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ViewStyle,
  TextStyle,
  TouchableOpacity
} from 'react-native';
import { BlockComponent } from '@my-app/app/src/framework/engine/types';
import { useExtension } from '../../../../../../app/src/framework/engine/extension/context';
import { useLinkTo, useRoute } from '@react-navigation/native';
import { BagIcon } from '../../icons';
import { ArrowLeft } from '@my-app/ui/src/icons';
import { addVarToString } from '../../../../../../app/src/framework/omni-logic/plugin/utils/addVarToString';
import { ActivityIndicator } from 'react-native';
import { Brand } from '../../../../../../commerce/src/types/site';

type HeaderLinkProps = {
  style?: string;
  context?: string;
  redirecTo?: string;
};

type StyleProps = {
  container?: ViewStyle;
  containerItem?: ViewStyle;
  text?: TextStyle;
};


const HeaderLink: FC<BlockComponent<HeaderLinkProps>> = ({ props }) => {

  const propStyles = useStyles(props?.style) as StyleProps;
  const { hooks } = useExtension();
  const context = props?.context;
  const submit = hooks[context];
  const [data, setData] = useState({ products: [] });
  const linkTo = useLinkTo();
  const { params } = useRoute();

  const dataName = Array.isArray(data.product) 
    ?
    Object.values(Object.values(data)[0]).map(item => item.name)
    :
    <ActivityIndicator /> ;

  const term = Array.isArray(data.product)
    ?
    Object.values(Object.values(data)[0]).map(item => item.brand)
    :
    null;

  const redirecTo = "/plp-search/?term={term}";

  const componentDiDMount = async () => {
    let input = {};

    if (params?.slug) input = { ...input, slug: params?.slug };
    let dataResults = await submit({
      input,
      hooks,
    });
    setData(dataResults[context])
  }


  const onPress = () => {
    linkTo(addVarToString(redirecTo, { term }));
  }

  useEffect(() => {
    componentDiDMount();
  }, [params?.slug]);


  return (
    <View style={propStyles.container}>
      <TouchableOpacity
        onPress={onPress}
      >
        <ArrowLeft stroke={'#000'} />
      </TouchableOpacity>
      <Text
        style={propStyles.text}
        numberOfLines={1}
      >
        {dataName}
      </Text>
      <TouchableOpacity>
        <BagIcon />
      </TouchableOpacity>
    </View>
  )
}

export default HeaderLink;