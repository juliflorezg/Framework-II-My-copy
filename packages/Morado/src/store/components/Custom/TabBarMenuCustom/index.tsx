import React, {FC, useMemo, useState} from 'react';
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {Image} from '@my-app/ui';
import useStyles from '@my-app/app/src/framework/styleguide/hooks/useStyles';
import {Product} from '../../../../utils/product';

import {HeartWishlist, LogoBancolombia, Menu} from '../../icons';
import {useAuth} from '@my-app/app/src/framework/engine/render';
import {useLinkTo, useNavigationState} from '@react-navigation/native';

type TabBarMenuCustomStyleProps = {
  container?: ViewStyle;
  wrapper?: ViewStyle;
};

type TabBarMenuCustomProps = {
  style?: string;
  fillColor?: boolean;
};

const TabBarMenuCustom: FC<TabBarMenuCustomProps> = ({
  style,
  fillColor = true,
  ...props
}) => {
  const TabBarMenuCustomStyles = useStyles(style) as TabBarMenuCustomStyleProps;

  const isAuth = useAuth({
    machineName: 'authentication',
    pointer: 'authorized',
  });

  const linkTo = useLinkTo();

  const state = useNavigationState(state => state);
  const routeName = state.routeNames[state.index];
  console.log(routeName);

  const backgroundColor = routeName === 'menu' ? '#AA26C6' : '#390052';
  const fill = fillColor ? backgroundColor : 'rgba(57, 0, 82, 0.4)';

  return (
    <>
      {isAuth ? (
        <TouchableOpacity onPress={() => linkTo('/menu')}>
          <Menu color={'#390052'} fill={fill} />
        </TouchableOpacity>
      ) : (
        <View style={defaultStyles.container}>
          <View style={defaultStyles.wrapper}>
            <Image
              src={'https://moradoapp.vteximg.com.br/arquivos/padlock.png'}
              width={24}
              height={24}
              resizeMode={'stretch'}
            />
          </View>

          <Menu color={'#390052'} fill={'rgba(57, 0, 82, 0.4)'} />
        </View>
      )}
    </>
  );
};

export default TabBarMenuCustom;

const defaultStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  wrapper: {position: 'absolute', top: -10, left: -10},
});
