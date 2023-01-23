import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  ImageStyle,
  TextStyle,
} from 'react-native';
import { Image } from '@my-app/ui';
import { ICard } from '../../types';
import usePrice from '@vercel/commerce-shopify/product/use-price';
import AddToCartButton from '../../AddToCart';
import { truncate } from '../../../utils/truncate';
import useStyles from '@my-app/app/src/framework/styleguide/hooks/useStyles';
import { TouchableOpacity } from 'react-native-ui-lib';

type SimpleModeStyleProps = {
  container?: ViewStyle;
  imageContainer?: ViewStyle;
  image?: ImageStyle;
  wrap?: ViewStyle;
  productPriceWrap?: ViewStyle;
  productPriceDiscount?: TextStyle;
  productPrice?: TextStyle;
  productPriceDiscountPercentage?: TextStyle;
  brand?: TextStyle;
  productName?: TextStyle;
};

type SlimModeStyleProps = {
  container?: ViewStyle;
  imageContainer?: ViewStyle;
  image?: ImageStyle;
  productName?: TextStyle;
};

type DefaultStyleProps = {
  container?: ViewStyle;
  imageContainer?: ViewStyle;
  image?: ImageStyle;
  wrap?: ViewStyle;
  productPriceWrap?: ViewStyle;
  productPriceDiscount?: TextStyle;
  productPrice?: TextStyle;
  productName?: TextStyle;
  productPriceDiscountPercentage?: TextStyle;
  productNameWrap?: ViewStyle;
  cartButtonWrap?: ViewStyle;
};

export const SlimMode = (props: ICard) => {
  const style = props?.style;
  const slimModeStyles = useStyles(style) as SlimModeStyleProps;

  return (
    <View style={[slimModeStyles.container, SlimStyles.container]}>
      <View>
        <Text style={[slimModeStyles.productName, SlimStyles.productName]}>
          {props?.product.name}
        </Text>
      </View>
      {props.image && (
        <View
          style={[slimModeStyles.imageContainer, SlimStyles.imageContainer]}>
          <Image
            src={props.image.src}
            height={props.image.height}
            width={props.image.width}
            style={[slimModeStyles.image, SlimStyles.image]}
          />
        </View>
      )}
    </View>
  );
};

export const Count = () => {
  const [cant, setCant] = useState(0)
  const add = () => setCant(cant + 1)
  const rest = () => {
    if (cant > 1) {
      setCant(cant - 1)
    } else {
      return
    }
  }


  return (
    <View style={countStyles.container}>
      <TouchableOpacity
        style={countStyles.touchable}
        onPress={rest}
      >
        <Text style={countStyles.sign}>-</Text>
      </TouchableOpacity>
      <Text style={countStyles.amount} >{cant}</Text>
      <TouchableOpacity
        style={countStyles.touchable}
        onPress={add}
      >
        <Text style={countStyles.sign}>+</Text>
      </TouchableOpacity>
    </View>
  )


}

export const DefaultMode = (props: ICard) => {
  const style = props?.style;

  const defaultModeStyles = useStyles(style) as DefaultStyleProps;
  const discountPercentage = props?.product?.price?.discountPercentage
  const productName = props.maxCharts
    ? truncate(props.product?.name, props.maxCharts)
    : props.product?.name;
  const { price } = usePrice({
    amount: props.product?.price?.value,
    baseAmount: props.product?.price?.retailPrice,
    currencyCode: props.product?.price?.currencyCode!,
  });

  const { price: discount } = usePrice({
    amount: props.product?.price?.listPrice,
    currencyCode: props.product?.price?.currencyCode!,
  });

  return (
    <View style={[defaultModeStyles.container, DefaultStyles.container]}>
      {props.product?.images && (
        <View
          style={[
            defaultModeStyles.imageContainer,
            DefaultStyles.imageContainer,
          ]}>
          <Image
            src={props.image.src}
            height={props.image.height}
            width={props.image.width}
            style={[defaultModeStyles.image, DefaultStyles.image]}
          />
        </View>
      )}
      {!props.noNameTag && (
        <View style={[defaultModeStyles.wrap, DefaultStyles.wrap]}>
          <View
            style={[
              defaultModeStyles.productNameWrap,
              DefaultStyles.productNameWrap,
            ]}>
            <Text
              style={[
                defaultModeStyles.productName,
                DefaultStyles.productName,
              ]}>
              {productName}
            </Text>
          </View>
          <View
            style={[
              defaultModeStyles.productPriceWrap,
              DefaultStyles.productPriceWrap,
            ]}>
            <Text
              style={[
                defaultModeStyles.productPriceDiscount,
                DefaultStyles.productPriceDiscount,
              ]}>{`${discount} ${props.product?.price?.currencyCode}`}</Text>
          </View>
          <View
            style={[
              defaultModeStyles.cartButtonWrap,
              DefaultStyles.cartButtonWrap,
            ]}>
            <View
              style={[
                defaultModeStyles.productPriceWrap,
                DefaultStyles.productPriceWrap,
              ]}>
              <Text
                style={[
                  defaultModeStyles.productPrice,
                  DefaultStyles.productPrice,
                ]}>{`${price} ${props.product?.price?.currencyCode}`}</Text>
              {(discountPercentage && discountPercentage > 0) && <Text
                style={[
                  defaultModeStyles.productPriceDiscountPercentage,
                  DefaultStyles.productPriceDiscountPercentage,
                ]}>{`${discountPercentage}%`}</Text>}
            </View>

            <AddToCartButton style={style} text={props.textAddtoCart} />
          </View>
        </View>
      )}
    </View>
  );
};

export const SimpleMode = (props: ICard) => {
  const style = props?.style;
  const simpleModeStyles = useStyles(style) as SimpleModeStyleProps;
  const discountPercentage = props?.product?.price?.discountPercentage
  const productName = props.maxCharts
    ? truncate(props.product?.name, props.maxCharts)
    : props.product?.name;
  const { price } = usePrice({
    amount: props.product?.price?.value,
    baseAmount: props.product?.price?.retailPrice,
    currencyCode: props.product?.price?.currencyCode!,
  });

  const { price: discount } = usePrice({
    amount: props.product?.price?.listPrice,
    currencyCode: props.product?.price?.currencyCode!,
  });

  return (
    <View style={[simpleModeStyles.container, SimpleStyles.container]}>
      {props?.image && (
        <View
          style={[
            simpleModeStyles.imageContainer,
            SimpleStyles.imageContainer,
          ]}>
          <Image
            style={[simpleModeStyles.image, SimpleStyles.image]}
            src={props.image.src}
            height={props.image.height}
            width={props.image.width}
          />
        </View>
      )}
      {!props.noNameTag && (
        <View style={[simpleModeStyles.wrap, SimpleStyles.wrap]}>
          <View
            style={[
              simpleModeStyles.productPriceWrap,
              SimpleStyles.productPriceWrap,
            ]}>
            <Text
              style={[
                simpleModeStyles.brand,
                SimpleStyles.brand,
              ]}>{`${props.product.brand}`}</Text>
          </View>
          <Text
            style={[simpleModeStyles.productName, SimpleStyles.productName]}>
            {productName}
          </Text>
          <View
            style={[
              simpleModeStyles.productPriceWrap,
              SimpleStyles.productPriceWrap,
            ]}>
            <Text
              style={[
                simpleModeStyles.productPriceDiscount,
                SimpleStyles.productPriceDiscount,
              ]}>{`Antes ${discount} ${props.product?.price?.currencyCode}`}</Text>
          </View>
          <View
            style={[
              simpleModeStyles.productPriceWrap,
              SimpleStyles.productPriceWrap,
            ]}>
            <Text
              style={[
                simpleModeStyles.productPrice,
                SimpleStyles.productPrice,
              ]}>{`${price} ${props.product?.price?.currencyCode}`}</Text>
            {(discountPercentage && discountPercentage > 0) && <Text
              style={[
                simpleModeStyles.productPriceDiscountPercentage,
                SimpleStyles.productPriceDiscountPercentage,
              ]}>{`${discountPercentage}%`}</Text>}
          </View>
          <Count />
          <AddToCartButton style={style} text={props.textAddtoCart} />
        </View>
      )}
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
    maxWidth: 200,

    margin: 10,
    padding: 16,
  },
  wrap: {},
  productName: {
    fontWeight: '300',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
    marginTop: 0,
    marginBottom: 0,
    paddingVertical: 0

  },
  productPriceWrap: {},
  brand: {
    fontFamily: 'Poppins-Light',
    color: '#888888',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 0,
    marginBottom: 0,
    paddingVertical: 0
  },
  productPriceDiscount: {
    fontFamily: 'Poppins-Light',
    color: '#888888',
    textDecorationLine: 'line-through',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 0,
    marginBottom: 0,
    paddingVertical: 0
  },
  productPriceDiscountPercentage: {
    fontSize: 16,
    lineHeight: 16,
    alignItems: 'center',
    color: '#26C65C',
  },
  productPrice: {
    fontSize: 20,
    color: '#DD1E2F',
    textAlign: 'center',
    marginTop: 0,
    marginBottom: 0,
    paddingVertical: 0
  },
  image: {},
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
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

const countStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: 35,
    justifyContent: 'space-around',
    alignItems: "center",
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderRadius: 8,
    borderWidth: 1,
    marginVertical: 5,
    borderColor: "#C1C1C1"
  },
  touchable: {
    height: 20,
    width: 20,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    color: "white"
  },
  sign: {
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: 14,
    fontWeight: "bold"
  },

  amount: {
    color: "black",
    fontSize: 14,
    fontFamily: "Poppins-Regular"
  }
})


/* {process.env.COMMERCE_WISHLIST_ENABLED && (
      <WishlistButton
        style={s.wishlistButton}
        productId={product.id}
        variant={product.variants[0]}
      />
    )} */
