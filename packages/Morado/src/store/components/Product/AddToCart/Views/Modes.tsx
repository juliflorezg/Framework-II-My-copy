import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  ImageStyle,
  TextStyle,
} from 'react-native';
import {Button, Image} from '@my-app/ui';
import {ICartButton} from '../../types';

import useStyles from '@my-app/app/src/framework/styleguide/hooks/useStyles';

type SimpleModeStyleProps = {
  buttonStyleSimple?: ViewStyle;
  textButtonSimple?: TextStyle;
};

type SlimModeStyleProps = {
  buttonStyleSlim?: ViewStyle;
  textButtonSlim?: TextStyle;
};

type DefaultStyleProps = {
  buttonStyleDefault?: ViewStyle;
  textButtonDefault?: TextStyle;
};

export const SlimMode = (props: ICartButton) => {
  const style = props?.style;
  const slimModeStyles = useStyles(style) as SlimModeStyleProps;
  const text = props?.text ? props?.text : 'Agregar';
  return (
    <Button
       disabled={props?.disabled}
      style={[SlimStyles.buttonStyle, slimModeStyles.buttonStyleSlim,  props?.disabled && { opacity: 0.5 }]}
      onPress={() => props.addToCart()}>
      <Text style={[SlimStyles.textButton, slimModeStyles.textButtonSlim]}>
        {text}
      </Text>
    </Button>
  );
};

export const DefaultMode = (props: ICartButton) => {
  const style = props?.style;
  const defaultModeStyles = useStyles(style) as DefaultStyleProps;
  const text = props?.text ? props?.text : 'Agregar';
 
  return (
    <Button
      disabled={props?.disabled}
      style={[defaultStyles.buttonStyle, defaultModeStyles.buttonStyleDefault, props?.disabled && { opacity: 0.5 }]}
      onPress={() => props.addToCart()}>
      <Text
        style={[defaultStyles.textButton, defaultModeStyles.textButtonDefault]}>
        {text}
      </Text>
    </Button>
  );
};

export const SimpleMode = (props: ICartButton) => {
  const style = props?.style;
  const simpleModeStyles = useStyles(style) as SimpleModeStyleProps;
  const text = props?.text ? props?.text : 'Agregar';
  return (
    <Button
      disabled={props?.disabled}
      style={[SimpleStyles.buttonStyle, simpleModeStyles.buttonStyleSimple,  props?.disabled && { opacity: 0.5 }]}
      onPress={() => props.addToCart()}>
      <Text
        style={[SimpleStyles.textButton, simpleModeStyles.textButtonSimple]}>
        {text}
      </Text>
    </Button>
  );
};

const SlimStyles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: '#FFEEED',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    fontSize: 20,
    color: '#F96F88',
    fontWeight: '600',
    textAlign: 'center',
  },
});
const SimpleStyles = StyleSheet.create({
  buttonStyle: {},
  textButton: {},
});

const defaultStyles = StyleSheet.create({
  buttonStyle: {},
  textButton: {},
});

/* {process.env.COMMERCE_WISHLIST_ENABLED && (
      <WishlistButton
        style={s.wishlistButton}
        productId={product.id}
        variant={product.variants[0]}
      />
    )} */
