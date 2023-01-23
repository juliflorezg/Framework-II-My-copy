import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  ImageStyle,
  TextStyle,
} from 'react-native';
import {Image} from '@my-app/ui';
import {ICard} from '../../types';
import usePrice from '@vercel/commerce-shopify/product/use-price';
import AddToCartButton from '../../AddToCart';
import {truncate} from '../../../utils/truncate';
import useStyles from '@my-app/app/src/framework/styleguide/hooks/useStyles';

import QuantitySelector from '../../QuantitySelector';
import RemoveButton from '../../../Cart/RemoveButton';
import RemoveWishlistButton from '../../../Wishlist/RemoveButton';

type SimpleModeStyleProps = {
  containerSimple?: ViewStyle;
  imageContainerSimple?: ViewStyle;
  imageSimple?: ImageStyle;
  wrapSimple?: ViewStyle;
  productPriceWrapSimple?: ViewStyle;
  productPriceDiscountSimple?: TextStyle;
  productPriceSimple?: TextStyle;
  productPriceDiscountPercentageSimple?: TextStyle;
  brandSimple?: TextStyle;
  productNameSimple?: TextStyle;
};

type SlimModeStyleProps = {
  containerSlim?: ViewStyle;
  imageContainerSlim?: ViewStyle;
  imageSlim?: ImageStyle;
  productNameSlim?: TextStyle;
};

type DefaultStyleProps = {
  containerDefault?: ViewStyle;
  imageContainerDefault?: ViewStyle;
  imageDefault?: ImageStyle;
  wrapDefault?: ViewStyle;
  productPriceWrapDefault?: ViewStyle;
  productPriceDiscountDefault?: TextStyle;
  productPriceDefault?: TextStyle;
  productNameDefault?: TextStyle;
  productPriceDiscountPercentageDefault?: TextStyle;
  productNameWrapDefault?: ViewStyle;
  cartButtonWrapDefault?: ViewStyle;
};

type CartStyleProps = {
  containerCart?: ViewStyle;
  imageContainerCart?: ViewStyle;
  imageCart?: ImageStyle;
  wrapCart?: ViewStyle;
  productPriceWrapCart?: ViewStyle;
  productPriceDiscountCart?: TextStyle;
  productPriceCart?: TextStyle;
  productNameCart?: TextStyle;
  productPriceDiscountPercentageCart?: TextStyle;
  productNameWrapCart?: ViewStyle;
  cartButtonWrapCart?: ViewStyle;
};

type WishlistModeStyleProps = {
  containerWishlist?: ViewStyle;
  imageContainerWishlist?: ViewStyle;
  imageWishlist?: ImageStyle;
  wrapWishlist?: ViewStyle;
  productPriceWrapWishlist?: ViewStyle;
  productPriceDiscountWishlist?: TextStyle;
  productPriceWishlist?: TextStyle;
  productPriceDiscountPercentageWishlist?: TextStyle;
  brandWishlist?: TextStyle;
  productNameWishlist?: TextStyle;
};

export const SlimMode = (props: ICard) => {
  const style = props?.style;
  const slimModeStyles = useStyles(style) as SlimModeStyleProps;

  return (
    <View style={[slimModeStyles.containerSlim, SlimStyles.container]}>
      <View>
        <Text style={[slimModeStyles.productNameSlim, SlimStyles.productName]}>
          {props?.product.name}
        </Text>
      </View>
      {props.image && (
        <View
          style={[
            slimModeStyles.imageContainerSlim,
            SlimStyles.imageContainer,
          ]}>
          <Image
            src={props.image.src}
            height={props.image.height}
            width={props.image.width}
            style={[slimModeStyles.imageSlim, SlimStyles.image]}
          />
        </View>
      )}
    </View>
  );
};

export const DefaultMode = (props: ICard) => {
  const style = props?.style;

  const defaultModeStyles = useStyles(style) as DefaultStyleProps;
  const discountPercentage = props?.product?.price?.discountPercentage;
  const productName = props.maxCharts
    ? truncate(props.product?.name, props.maxCharts)
    : props.product?.name;
  const {price} = usePrice({
    amount: props.product?.price?.value,
    baseAmount: props.product?.price?.retailPrice,
    currencyCode: props.product?.price?.currencyCode!,
  });

  const {price: discount} = usePrice({
    amount: props.product?.price?.listPrice,
    currencyCode: props.product?.price?.currencyCode!,
  });

  return (
    <View style={[defaultModeStyles.containerDefault, DefaultStyles.container]}>
      {props.product?.images && (
        <View
          style={[
            defaultModeStyles.imageContainerDefault,
            DefaultStyles.imageContainer,
          ]}>
          <Image
            src={props.image.src}
            height={props.image.height}
            width={props.image.width}
            style={[defaultModeStyles.imageDefault, DefaultStyles.image]}
          />
        </View>
      )}
      {!props.noNameTag && (
        <View style={[defaultModeStyles.wrapDefault, DefaultStyles.wrap]}>
          <View
            style={[
              defaultModeStyles.productNameWrapDefault,
              DefaultStyles.productNameWrap,
            ]}>
            <Text
              style={[
                defaultModeStyles.productNameDefault,
                DefaultStyles.productName,
              ]}>
              {productName}
            </Text>
          </View>
          <View
            style={[
              defaultModeStyles.productPriceWrapDefault,
              DefaultStyles.productPriceWrap,
            ]}>
            <Text
              style={[
                defaultModeStyles.productPriceDiscountDefault,
                DefaultStyles.productPriceDiscount,
              ]}>{`${discount} ${props.product?.price?.currencyCode}`}</Text>
          </View>
          <View
            style={[
              defaultModeStyles.cartButtonWrapDefault,
              DefaultStyles.cartButtonWrap,
            ]}>
            <View
              style={[
                defaultModeStyles.productPriceWrapDefault,
                DefaultStyles.productPriceWrap,
              ]}>
              <Text
                style={[
                  defaultModeStyles.productPriceDefault,
                  DefaultStyles.productPrice,
                ]}>{`${price} ${props.product?.price?.currencyCode}`}</Text>
              {discountPercentage && discountPercentage > 0 && (
                <Text
                  style={[
                    defaultModeStyles.productPriceDiscountPercentageDefault,
                    DefaultStyles.productPriceDiscountPercentage,
                  ]}>{`${discountPercentage}%`}</Text>
              )}
            </View>

            <QuantitySelector
              style={style}
              product={props.product}
              availableQuantityInfo={
                props.quantitySelector.availableQuantityInfo
              }
            />

            <AddToCartButton
              style={style}
              text={props.cart?.text}
              product={props.product}
              variant={props.cart?.variant}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export const CartMode = (props: ICard) => {
  const style = props?.style;

  const cartModeStyles = useStyles(style) as CartStyleProps;
  const discountPercentage = props?.product?.price?.discountPercentage;
  const productName = props.maxCharts
    ? truncate(props.product?.name, props.maxCharts)
    : props.product?.name;
  const {price} = usePrice({
    amount: props.product?.price?.value,
    baseAmount: props.product?.price?.retailPrice,
    currencyCode: props.product?.price?.currencyCode!,
  });

  const {price: discount} = usePrice({
    amount: props.product?.price?.listPrice,
    currencyCode: props.product?.price?.currencyCode!,
  });

  return (
    <View style={[cartModeStyles.containerCart, DefaultStyles.container]}>
      {props.product?.images && (
        <View
          style={[
            cartModeStyles.imageContainerCart,
            DefaultStyles.imageContainer,
          ]}>
          <Image
            src={props.image.src}
            height={props.image.height}
            width={props.image.width}
            style={[cartModeStyles.imageCart, DefaultStyles.image]}
          />
        </View>
      )}
      {!props.noNameTag && (
        <View style={[cartModeStyles.wrapCart, DefaultStyles.wrap]}>
          <View
            style={[
              cartModeStyles.productNameWrapCart,
              DefaultStyles.productNameWrap,
            ]}>
            <Text
              style={[
                cartModeStyles.productNameCart,
                DefaultStyles.productName,
              ]}>
              {productName}
            </Text>
            <RemoveButton style={style} product={props.product} />
          </View>
          <View
            style={[
              cartModeStyles.productPriceWrapCart,
              DefaultStyles.productPriceWrap,
            ]}>
            <Text
              style={[
                cartModeStyles.productPriceDiscountCart,
                DefaultStyles.productPriceDiscount,
              ]}>{`${discount} ${props.product?.price?.currencyCode}`}</Text>
          </View>
          <View
            style={[
              cartModeStyles.cartButtonWrapCart,
              DefaultStyles.cartButtonWrap,
            ]}>
            <View
              style={[
                cartModeStyles.productPriceWrapCart,
                DefaultStyles.productPriceWrap,
              ]}>
              <Text
                style={[
                  cartModeStyles.productPriceCart,
                  DefaultStyles.productPrice,
                ]}>{`${price} ${props.product?.price?.currencyCode}`}</Text>
              {discountPercentage && discountPercentage > 0 && (
                <Text
                  style={[
                    cartModeStyles.productPriceDiscountPercentageCart,
                    DefaultStyles.productPriceDiscountPercentage,
                  ]}>{`${discountPercentage}%`}</Text>
              )}
            </View>

            <QuantitySelector
              style={style}
              product={props.product}
              availableQuantityInfo={
                props.quantitySelector.availableQuantityInfo
              }
            />
          </View>
        </View>
      )}
    </View>
  );
};

export const SimpleMode = (props: ICard) => {
  const style = props?.style;
  const simpleModeStyles = useStyles(style) as SimpleModeStyleProps;
  const discountPercentage = props?.product?.price?.discountPercentage;
  const productName = props.maxCharts
    ? truncate(props.product?.name, props.maxCharts)
    : props.product?.name;
  const {price} = usePrice({
    amount: props.product?.price?.value,
    baseAmount: props.product?.price?.retailPrice,
    currencyCode: props.product?.price?.currencyCode!,
  });

  const {price: discount} = usePrice({
    amount: props.product?.price?.listPrice,
    currencyCode: props.product?.price?.currencyCode!,
  });

 

  return (
    <View style={[ SimpleStyles.container, simpleModeStyles.containerSimple,]}>
      {props?.image && (
        <View
          style={[
         
            SimpleStyles.imageContainer,
            simpleModeStyles.imageContainerSimple,
          ]}>
          <Image
            style={[ SimpleStyles.image,simpleModeStyles.imageSimple,]}
            src={props.image.src}
            height={props.image.height}
            width={props.image.width}
          />
        </View>
      )}
      {!props.noNameTag && (
        <View style={[SimpleStyles.wrap,simpleModeStyles.wrapSimple, ]}>
          <View
            style={[
              SimpleStyles.productPriceWrap,
              simpleModeStyles.productPriceWrapSimple,
         
            ]}>
            <Text
              style={[
                SimpleStyles.productPriceDiscount,
                simpleModeStyles.productPriceDiscountSimple,
                
              ]}>{`${discount} ${props.product?.price?.currencyCode}`}</Text>
          </View>
          <View
            style={[
              SimpleStyles.productPriceWrap,
              simpleModeStyles.productPriceWrapSimple,
            
            ]}>
            <Text
              style={[
                SimpleStyles.productPrice,
                simpleModeStyles.productPriceSimple,
               
              ]}>{`${price} ${props.product?.price?.currencyCode}`}</Text>
            {discountPercentage && discountPercentage > 0 && (
              <Text
                style={[
                  SimpleStyles.productPriceDiscountPercentage,
                  simpleModeStyles.productPriceDiscountPercentageSimple,
                
                ]}>{`${discountPercentage}%`}</Text>
            )}
          </View>
          <View
            style={[
              SimpleStyles.productPriceWrap,
              simpleModeStyles.productPriceWrapSimple,
             
            ]}>
            <Text
              style={[
                SimpleStyles.brand,
                simpleModeStyles.brandSimple,
             
              ]}>{`${props.product.brand}`}</Text>
          </View>
          <Text
            style={[
              SimpleStyles.productName,
              simpleModeStyles.productNameSimple,
             
            ]}>
            {productName}
          </Text>
          <QuantitySelector
            style={style}
            product={props.product}
            availableQuantityInfo={props.quantitySelector.availableQuantityInfo}
            variant={'simple'}
          />
          <AddToCartButton
            style={style}
            text={props.cart?.text}
            product={props.product}
            variant={props.cart?.variant}
          />
        </View>
      )}
    </View>
  );
};

export const WishlistMode = (props: ICard) => {
  const style = props?.style;
  const wishlistModeStyles = useStyles(style) as WishlistModeStyleProps;
  const discountPercentage = props?.product?.price?.discountPercentage;
  const productName = props.maxCharts
    ? truncate(props.product?.name, props.maxCharts)
    : props.product?.name;
  const {price} = usePrice({
    amount: props.product?.price?.value,
    baseAmount: props.product?.price?.retailPrice,
    currencyCode: props.product?.price?.currencyCode!,
  });

  const {price: discount} = usePrice({
    amount: props.product?.price?.listPrice,
    currencyCode: props.product?.price?.currencyCode!,
  });

  return (
    <View
      style={[wishlistModeStyles.containerWishlist, WishlistStyles.container]}>
      {props?.image && (
        <View
          style={[
            wishlistModeStyles.imageContainerWishlist,
            WishlistStyles.imageContainer,
          ]}>
          <Image
            style={[wishlistModeStyles.imageWishlist, WishlistStyles.image]}
            src={props.image.src}
            height={props.image.height}
            width={props.image.width}
          />
          <RemoveWishlistButton style={style} product={props.product} />
        </View>
      )}
      {!props.noNameTag && (
        <View style={[wishlistModeStyles.wrapWishlist, WishlistStyles.wrap]}>
          <View
            style={[
              wishlistModeStyles.productPriceWrapWishlist,
              WishlistStyles.productPriceWrap,
            ]}>
            <Text
              style={[
                wishlistModeStyles.productPriceDiscountWishlist,
                WishlistStyles.productPriceDiscount,
              ]}>{`${discount} ${props.product?.price?.currencyCode}`}</Text>
          </View>
          <View
            style={[
              wishlistModeStyles.productPriceWrapWishlist,
              WishlistStyles.productPriceWrap,
            ]}>
            <Text
              style={[
                wishlistModeStyles.productPriceWishlist,
                WishlistStyles.productPrice,
              ]}>{`${price} ${props.product?.price?.currencyCode}`}</Text>
            {discountPercentage && discountPercentage > 0 && (
              <Text
                style={[
                  wishlistModeStyles.productPriceDiscountPercentageWishlist,
                  WishlistStyles.productPriceDiscountPercentage,
                ]}>{`${discountPercentage}%`}</Text>
            )}
          </View>
          <View
            style={[
              wishlistModeStyles.productPriceWrapWishlist,
              WishlistStyles.productPriceWrap,
            ]}>
            <Text
              style={[
                wishlistModeStyles.brandWishlist,
                WishlistStyles.brand,
              ]}>{`${props.product.brand}`}</Text>
          </View>
          <Text
            style={[
              wishlistModeStyles.productNameWishlist,
              WishlistStyles.productName,
            ]}>
            {productName}
          </Text>
          <QuantitySelector
            style={style}
            product={props.product}
            availableQuantityInfo={props.quantitySelector.availableQuantityInfo}
          />
          <AddToCartButton
            style={style}
            text={props.cart?.text}
            product={props.product}
          />
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
    marginTop: 8,
    marginBottom: 8,
    fontFamily: 'Poppins-Light',
    fontSize: 16,
    color: '#390052',
  },
  productPriceWrap: {},
  brand: {
    fontFamily: 'Poppins-Light',
    color: 'rgba(57, 0, 82, 0.4)',
    fontSize: 16,
  },
  productPriceDiscount: {
    fontFamily: 'Poppins-Light',
    color: '#888888',
    textDecorationLine: 'line-through',
    marginTop: 8,
    fontSize: 16,
  },
  productPriceDiscountPercentage: {
    fontSize: 16,
    lineHeight: 16,
    alignItems: 'center',
    color: '#26C65C',
  },
  productPrice: {
    marginTop: 8,
    fontSize: 20,
    color: '#AA26C6',
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

const WishlistStyles = StyleSheet.create({
  container: {
    maxWidth: 200,

    margin: 10,
    padding: 16,
  },
  wrap: {},
  productName: {
    fontWeight: '300',
    marginTop: 8,
    marginBottom: 8,
    fontFamily: 'Poppins-Light',
    fontSize: 16,
    color: '#390052',
  },
  productPriceWrap: {},
  brand: {
    fontFamily: 'Poppins-Light',
    color: 'rgba(57, 0, 82, 0.4)',
    fontSize: 16,
  },
  productPriceDiscount: {
    fontFamily: 'Poppins-Light',
    color: '#888888',
    textDecorationLine: 'line-through',
    marginTop: 8,
    fontSize: 16,
  },
  productPriceDiscountPercentage: {
    fontSize: 16,
    lineHeight: 16,
    alignItems: 'center',
    color: '#26C65C',
  },
  productPrice: {
    marginTop: 8,
    fontSize: 20,
    color: '#AA26C6',
  },
  image: {},
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

/* {process.env.COMMERCE_WISHLIST_ENABLED && (
      <WishlistButton
        style={s.wishlistButton}
        productId={product.id}
        variant={product.variants[0]}
      />
    )} */
