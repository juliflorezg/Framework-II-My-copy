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
import {DefaultStyleProps, IQuantity, SimpleModeStyleProps, SlimModeStyleProps} from '../../types';

import useStyles from '@my-app/app/src/framework/styleguide/hooks/useStyles';



export const SlimMode = (props: IQuantity) => {
  const style = props?.style  as SlimModeStyleProps
 

  return (
    <View style={[style.container, SlimStyles.container]}>
      <View>
        <Text style={[style.productName, SlimStyles.productName]}>
          {props?.product.name}
        </Text>
      </View>
      {props.image && (
        <View
          style={[style.imageContainer, SlimStyles.imageContainer]}>
          <Image
            src={props.image.src}
            height={props.image.height}
            width={props.image.width}
            style={[style.image, SlimStyles.image]}
          />
        </View>
      )}
    </View>
  );
};

export const DefaultMode = (props: IQuantity) => {
  const style = props?.style as DefaultStyleProps
  //const simpleModeStyles = useStyles(style) as DefaultStyleProps;

 
 
  return (
    <View
      style={[
        SimpleStyles.container,
        style.containerQuantitySelectorDefault,
      ]}>
      {props.availableQuantityInfo && (
        <View
          style={[
            SimpleStyles.wrapperAvailable,
            style.wrapperAvailableDefault,
          ]}>
          <Text
            style={[
              SimpleStyles.textStylesAvailableText,
              style.textStylesAvailableTextDefault,
            ]}>
            {'Cantidad:'}
          </Text>
          <Text
            style={[
              SimpleStyles.textStylesAvailableQuantity,
              style.textStylesAvailableQuantityDefault,
            ]}>
            {`(${props?.product?.availableQuantity} disponibles)`}
          </Text>
        </View>
      )}
      <View
        style={[
          SimpleStyles.wrapperQuantitySelector,
          style.wrapperQuantitySelectorDefault,
        ]}>
        <View
          style={[
            SimpleStyles.wrapperQuantitySelectorButtons,
            style.wrapperQuantitySelectorButtonsDefault,
          ]}>
          <Button
            style={[
              SimpleStyles.buttonStyle,
              style.buttonStyleQuantitySelectorDefault,
            ]}
            hitSlop={{ top: 16, left: 16, bottom: 16, right: 16 }}
            onPress={() => props.decrement()}>
            <Text
              style={[
                SimpleStyles.textButton,
                style.textButtonQuantitySelectorDefault,
              ]}>
              {'-'}
            </Text>
          </Button>
        </View>
        <Text
          style={[
            SimpleStyles.quantityText,
            style.quantityTextDefault,
          ]}>
          {props?.quantity || 0}
        </Text>
        <View
          style={[
            SimpleStyles.wrapperQuantitySelectorButtons,
            style.wrapperQuantitySelectorButtonsDefault,
          ]}>
          <Button
            style={[
              SimpleStyles.buttonStyle,
              style.buttonStyleQuantitySelectorDefault,
            ]}
            hitSlop={{ top: 16, left: 16, bottom: 16, right: 16 }}
            onPress={() => props.increment()}>
            <Text
              style={[
                SimpleStyles.textButton,
                style.textButtonQuantitySelectorDefault,
              ]}>
              {'+'}
            </Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export const SimpleMode = (props: IQuantity) => {
 
  const style = props?.style  as SimpleModeStyleProps
 
   
  return (
    <View
      style={[
        SimpleStyles.container,
        style?.containerQuantitySelectorSimple,
      ]}>
      {props.availableQuantityInfo && (
        <View
          style={[
            SimpleStyles.wrapperAvailable,
            style?.wrapperAvailableSimple,
          ]}>
          <Text
            style={[
              SimpleStyles.textStylesAvailableText,
              style?.textStylesAvailableTextSimple,
            ]}>
            {'Cantidad:'}
          </Text>
          <Text
            style={[
              SimpleStyles.textStylesAvailableQuantity,
              style?.textStylesAvailableQuantitySimple,
            ]}>
            {`(${props?.product?.availableQuantity} disponibles)`}
          </Text>
        </View>
      )}
      <View
        style={[
          SimpleStyles.wrapperQuantitySelector,
          style?.wrapperQuantitySelectorSimple,
        ]}>
        <View
          style={[
            SimpleStyles.wrapperQuantitySelectorButtons,
            style?.wrapperQuantitySelectorButtonsSimple,
          ]}>
          <Button
            style={[
              SimpleStyles.buttonStyle,
              style?.buttonStyleQuantitySelectorSimple,
            ]}
            hitSlop={{ top: 16, left: 16, bottom: 16, right: 16 }}
            onPress={() => props.decrement()}>
            <Text
              style={[
                SimpleStyles.textButton,
                style?.textButtonQuantitySelectorSimple,
              ]}>
              {'-'}
            </Text>
          </Button>
        </View>
        <Text
          style={[
            SimpleStyles.quantityText,
            style?.quantityTextSimple,
          ]}>
          {props?.quantity || 0}
        </Text>
        <View
          style={[
            SimpleStyles.wrapperQuantitySelectorButtons,
            style?.wrapperQuantitySelectorButtonsSimple,
          ]}>
          <Button
            style={[
              SimpleStyles.buttonStyle,
              style?.buttonStyleQuantitySelectorSimple,
            ]}
            hitSlop={{ top: 16, left: 16, bottom: 16, right: 16 }}
            onPress={() => props.increment()}>
            <Text
              style={[
                SimpleStyles.textButton,
                style?.textButtonQuantitySelectorSimple,
              ]}>
              {'+'}
            </Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

const SlimStyles = StyleSheet.create({
  container: {},
  wrap: {},
  imageContainer: {},
  productName: {},
  productPrice: {},
  image: {},
});
const SimpleStyles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonStyle: {
    //  backgroundColor: '#FFEEED',
    marginHorizontal: 10,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    fontSize: 20,
    color: '#390052',
    fontWeight: '600',
    textAlign: 'center',
  },
  quantityText: {
    fontSize: 16,
    color: '#390052',
    textAlign: 'center',
  },

  textStylesAvailableText: {
    marginLeft: 10,

    fontSize: 16,
    color: '#390052',
    textAlign: 'center',
  },

  textStylesAvailableQuantity: {
    marginLeft: 10,

    fontSize: 16,
    color: '#390052',

    textAlign: 'center',
  },
  wrapperAvailable: {
    flexDirection: 'row',
  },
  wrapperQuantitySelector: {
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperQuantitySelectorButtons: {},
});

const DefaultStyles = StyleSheet.create({
  container: {},
  wrap: {},
  imageContainer: {},
  image: {},
  productName: {},
  productPrice: {},
  productPriceDiscount: {},
  productPriceDiscountPercentage: {},
  productPriceWrap: {},
  productNameWrap: {},
  cartButtonWrap: {},
});

/* {process.env.COMMERCE_WISHLIST_ENABLED && (
      <WishlistButton
        style={s.wishlistButton}
        productId={product.id}
        variant={product.variants[0]}
      />
    )} */
