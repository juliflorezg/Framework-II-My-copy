import React, {FC} from 'react';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {Button, Text} from '@my-app/ui';
import useStyles from '@my-app/app/src/framework/styleguide/hooks/useStyles';

type AddCartStyleProps = {
  buttonStyle?: ViewStyle;
  textButton?: TextStyle;
};

type AddToCartProps = {
  productId?: string;
  variantId?: string;
  style?: string;
  text?: string;
};

const AddToCartButton: FC<AddToCartProps> = ({
  productId,
  variantId,
  style,
  text,
}) => {
  const addToCartStyles = useStyles(style) as AddCartStyleProps;
  return (
    <Button
      style={[defaultStyles.buttonStyle, addToCartStyles.buttonStyle]}
      onPress={() => {}}>
      <Text style={[defaultStyles.textButton, addToCartStyles.textButton]}>
        {text ? text : 'Comprar'}
      </Text>
    </Button>
  );
};

export default AddToCartButton;

const defaultStyles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: '#FFEEED',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#F96F88',
    fontWeight: '600',
    textAlign: 'center',
  },
});
