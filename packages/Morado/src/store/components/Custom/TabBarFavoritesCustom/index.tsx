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

import {Heart, HeartWishlist, LogoBancolombia, Menu} from '../../icons';
import {useAuth} from '@my-app/app/src/framework/engine/render';
import {useLinkTo, useNavigationState} from '@react-navigation/native';

type TabBarFavoritesCustomStyleProps = {
  container?: ViewStyle;
  wrapper?: ViewStyle;
};

type TabBarFavoritesCustomProps = {
  style?: string;
  fillColor?: boolean;
};

const TabBarFavoritesCustom: FC<TabBarFavoritesCustomProps> = ({
  style,
  fillColor = true,
  ...props
}) => {
  const TabBarFavoritesCustomStyles = useStyles(style) as TabBarFavoritesCustomStyleProps;

  const isAuth = useAuth({
    machineName: 'authentication',
    pointer: 'authorized',
  });

  const linkTo = useLinkTo();

  const state = useNavigationState(state => state);
  const routeName = state.routeNames[state.index];
  

  const backgroundColor = routeName === 'wishlist' ? '#AA26C6' : '#390052';
  const fill = fillColor ? backgroundColor : 'rgba(57, 0, 82, 0.4)';

  return (
    <>
      {isAuth ? (
        <TouchableOpacity onPress={() => linkTo('/wishlist')}>
          <Heart color={backgroundColor} fill={fill} />
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

          <Heart color={'rgba(57, 0, 82, 0.4)'} fill={'rgba(57, 0, 82, 0.4)'} />
        </View>
      )}
    </>
  );
};

export default TabBarFavoritesCustom;

const defaultStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  wrapper: {position: 'absolute', top: -10, left: -10},
});
