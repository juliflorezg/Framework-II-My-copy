import React, {FC, Fragment, useCallback, useEffect, useRef} from 'react';
import ProductCard from '../ProductCard';

import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {Text, Image} from '@my-app/ui';
import AddToCartButton from '../AddToCart';

import usePrice from '@vercel/commerce-shopify/product/use-price';
import {makeid} from '@my-app/app/src/framework/engine/utils/randomKey';
import useStyles from '@my-app/app/src/framework/styleguide/hooks/useStyles';
import ShareComponent from '../../common/Share';
import Divider from '../../Divider';
import {ProductCardProps} from '../ProductDetail';
import ReportHighPrices from '../../common/ReportHighPrices';
import { Product } from '../../../../utils/product';
import QuantitySelector from '../QuantitySelector';
import WishlistButton from '../../Wishlist/WishlistButton';
 
interface ProductViewProps {
  product: Product;
  relatedProducts: Product[];
  style?: string;
  textAddtoCart?: string;
  imgProps?: {width: number; height: number};
  variant?: 'default' | 'slim' | 'simple';
  productCard?: ProductCardProps;
  quantitySelector?:QuantitySelectorProps
}

type ProductViewStyleProps = {
  container?: ViewStyle;
  imageContainerProductDetail?: ViewStyle;
  header?: TextStyle;
  vendor?: TextStyle;
  name?: TextStyle;
  priceContainer?: ViewStyle;
  price?: TextStyle;
  priceDiscount?: TextStyle;
  title?: TextStyle;
  containerDescription?: ViewStyle;
  description?: TextStyle;
  cartButton?: ViewStyle;
  badges?: ViewStyle;
  productPriceDiscountPercentage?: TextStyle;
  badgeDiscount?: ViewStyle;
  badgeNew?: ViewStyle;
  textBadgeNew?: TextStyle;
  wrapperBadges?: ViewStyle;
};

interface QuantitySelectorProps {
  availableQuantityInfo?: boolean;
}

const ProductView: FC<ProductViewProps> = ({
  product,
  relatedProducts,
  style,
  textAddtoCart,
  imgProps = {width: 180, height: 180},
  productCard = {
    imgProps: {width: 180, height: 180},
    variant: 'simple',
  },
  quantitySelector={
    availableQuantityInfo:false
  }
}) => {
  //console.log('images', JSON.stringify(product?.images[0]?.url));

  const productViewStyles = useStyles(style) as ProductViewStyleProps;

  const renderFlatListItem = useCallback(
    (product: any) => (
      <ProductCard
        key={product.item?.id}
        product={product.item}
        variant={productCard.variant}
        imgProps={productCard.imgProps}
      />
    ),
    [],
  );

 

  const {price} = usePrice({
    amount: product?.price?.value,
    baseAmount: product?.price?.listPrice,
    currencyCode: product?.price?.currencyCode!,
  });
  const {price: discount} = usePrice({
    amount: product?.price?.listPrice,
    currencyCode: product?.price?.currencyCode!,
  });

  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (product) {
      <ActivityIndicator />;
    }
  }, [product]);

 // product?.price?.discountPercentage;
 //(product?.price?.discountPercentage && product?.price?.discountPercentage > 0 )&&
  return (
    <Fragment>
      <View style={[productViewStyles.container, defaultStyles.container]}>
        {product ? (
          <>
            <View style={[productViewStyles.header, defaultStyles.header]}>
              <Text style={[productViewStyles.vendor, defaultStyles.vendor]}>
                {product?.vendor}
              </Text>
              <Text style={[productViewStyles.name, defaultStyles.name]}>
                {product?.name}
              </Text>
            </View>
            <View style={[defaultStyles.wrapperBadges, productViewStyles.wrapperBadges]}> 
            <View style={[defaultStyles.badges, productViewStyles.badges]}>
              <View
                style={[defaultStyles.badgeNew, productViewStyles.badgeNew]}>
                <Text
                  style={[
                    productViewStyles.textBadgeNew,
                    defaultStyles.textBadgeNew,
                  ]}>{'NUEVO'}</Text>
              </View>
             { (product?.price?.discountPercentage && product?.price?.discountPercentage > 0 )&& <View
                style={[
                  defaultStyles.badgeDiscount,
                  productViewStyles.badgeDiscount,
                ]}>
                <Text
                  style={[
                    productViewStyles.productPriceDiscountPercentage,
                    defaultStyles.productPriceDiscountPercentage,
                  ]}>{`${product?.price?.discountPercentage}% OFF`}</Text>
              </View>}

             
            </View>

            <WishlistButton product={product}/>

            </View>
            <View
              style={[
                productViewStyles.imageContainerProductDetail,
                defaultStyles?.imageContainerProductDetail,
              ]}>
              {product?.images?.length && (
                <Image
                  src={product?.images[0]?.url}
                  height={imgProps.height}
                  width={imgProps.width}
                />
              )}
            </View>
        
                <ReportHighPrices style={style} />

                
            <View
              style={[
                productViewStyles.priceContainer,
                defaultStyles.priceContainer,
              ]}>
              <Text
                style={[
                  productViewStyles.price,
                  defaultStyles.price,
                ]}>{`${price} ${product?.price?.currencyCode}`}</Text>
              <Text
                style={[
                  productViewStyles.priceDiscount,
                  defaultStyles.priceDiscount,
                ]}>{`${discount} ${product?.price?.currencyCode}`}</Text>
            </View>
            {product ? (
             
              <View
                style={[
                  productViewStyles.cartButton,
                  defaultStyles.cartButton,
                ]}>
                <QuantitySelector style={style} product={product} availableQuantityInfo={quantitySelector.availableQuantityInfo}/>
                <AddToCartButton text={textAddtoCart} style={style} product={product} />
              </View>
            ) : (
              <>
                <ActivityIndicator />
              </>
            )}

            <ShareComponent
              text="Compartir producto"
              slug={product.slug}
              style={style}
            />
            <View
              style={[
                {
                  width: '80%',
                  height: 0.5,
                  backgroundColor: '#C1C1C1',
                  opacity: 0.5,
                  marginLeft: 30,
                },
              ]}
            />
          </>
        ) : (
          <ActivityIndicator />
        )}

        {product && product?.description && (
          <>
            <Text style={[productViewStyles.title, defaultStyles.title]}>
              Acerca del Producto
            </Text>
            <View
              style={[
                productViewStyles.containerDescription,
                defaultStyles.containerDescription,
              ]}>
              <Text
                style={[
                  productViewStyles.description,
                  defaultStyles.description,
                ]}>
                {product?.description}
              </Text>
            </View>
          </>
        )}

        {!relatedProducts.length ? (
          <></>
        ) : (
          <>
            <View style={[productViewStyles.header, defaultStyles.header]}>
              <Text style={[productViewStyles.title, defaultStyles.title]}>
                Productos relacionados con esta marca
              </Text>
            </View>
            <View
              style={[productViewStyles.container, defaultStyles.container]}>
              <FlatList
                ref={flatListRef}
                key={makeid(5)}
                //style={}
                data={relatedProducts}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                initialNumToRender={10}
                horizontal={true}
                renderItem={renderFlatListItem}
                onEndReachedThreshold={0.5}
                //ListEmptyComponent={() => children}
              />
            </View>
          </>
        )}
      </View>
    </Fragment>
  );
};

export default ProductView;

const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 40,
  },
  header: {
    justifyContent: 'flex-start',
    padding: 10,
  },
  cartButton: {

    padding: 10,
    width: '100%',
  },
  priceContainer: {
    justifyContent: 'flex-start',
    paddingVertical: 20,
    paddingLeft: 10,
  },
  price: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: '#0A0C0B',
  },
  priceDiscount: {
    fontFamily: 'Poppins',
    fontWeight: '300',
    fontSize: 16,
    textDecorationLine: 'line-through',
    color: '#888888',
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#390052',
    padding: 10,
    fontWeight: 'bold',
  },
  description: {
    fontFamily: 'Poppins',
    fontWeight: '300',
    fontSize: 16,
    padding: 10,
    textAlign: 'justify',
    color: '#390052',
  },

  containerDescription: {
    padding: 10,
    justifyContent: 'center',
  },

  vendor: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '300',
    color: '#390052',
  },

  containerProductDetail: {
    flexDirection: 'row',
  },
  imageContainerProductDetail: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#390052',
  },
  badges: {},
  productPriceDiscountPercentage: {},
  badgeDiscount: {},
  textBadgeNew: {},
  badgeNew: {},
  wrapperBadges:{}
});
