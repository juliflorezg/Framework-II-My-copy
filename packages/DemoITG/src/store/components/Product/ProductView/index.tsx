import React, { FC, useCallback, useEffect, useRef } from 'react';
import ProductCard from '../ProductCard';

import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { Text, Image } from '@my-app/ui';
import AddToCartButton from '../AddToCart';

import usePrice from '@vercel/commerce-shopify/product/use-price';
import { makeid } from '@my-app/app/src/framework/engine/utils/randomKey';
import useStyles from '@my-app/app/src/framework/styleguide/hooks/useStyles';
import ShareComponent from '../../common/Share';
import { ProductCardProps } from '../ProductDetail';
import { Product } from '../../../../utils/product';
import QuantitySelector from '../QuantitySelector';
import WishlistButton from '../../Wishlist/WishlistButton';
import { ScrollView } from 'react-native-gesture-handler';
import SkuSelector from '../SkuSelector/index';


interface ProductViewProps {
  product: Product;
  relatedProducts: Product[];
  style?: string;
  cart?: CartButtonProps;
  textAddtoCart?: string;
  imgProps?: { width: number; height: number };
  variant?: 'default' | 'slim' | 'simple';
  productCard?: ProductCardProps;
  quantitySelector?: QuantitySelectorProps;
}
interface CartButtonProps {
  text?: string;
  variant?: 'default' | 'slim' | 'simple';
}


type ProductViewStyleProps = {
  container?: ViewStyle;
  containerDetail?: ViewStyle;
  containerSkuSelector?: ViewStyle;
  imageContainerProductDetail?: ViewStyle;
  header?: TextStyle;
  vendor?: TextStyle;
  name?: TextStyle;
  brand?: TextStyle;
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
  footerContainer?: ViewStyle;
  footerPrice?: TextStyle;
  footerAddToCart?: ViewStyle;
};

interface QuantitySelectorProps {
  availableQuantityInfo?: boolean;
  variant?: 'default' | 'slim' | 'simple';
}

const ProductView: FC<ProductViewProps> = ({
  product,
  style,
  cart = {
    text: '',
    variant: 'default',
  },
  imgProps = { width: 180, height: 180 },
  productCard = {
    imgProps: { width: 180, height: 180 },
    variant: 'simple',
    cart: {
      text: 'Agregar',
      variant: 'default',
    },
  },

  quantitySelector = {
    availableQuantityInfo: false,
    variant: 'default',
  },
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
        cart={productCard.cart}
        style={style}
        maxCharts={productCard.maxCharts}
      />
    ),
    [],
  );

  const { price } = usePrice({
    amount: product?.price?.value,
    baseAmount: product?.price?.listPrice,
    currencyCode: product?.price?.currencyCode!,
  });

  
  const { price: discount } = usePrice({
    amount: product?.price?.listPrice,
    currencyCode: product?.price?.currencyCode!,
  });

  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (product) {
      <ActivityIndicator />;
    }
  }, [product]);

  // console.log('sku', JSON.stringify(product?.skuSpecifications));

  return (
    <>
      <ScrollView contentContainerStyle={defaultStyles.mainContainer}>
        <View style={[productViewStyles.container, defaultStyles.container]}>
          {product ? (
            <>
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

              <View style={[productViewStyles.containerDetail, defaultStyles.containerDetail]}>
                <Text style={[productViewStyles.brand, defaultStyles.brand]}>
                  {product?.brand}
                </Text>
                <Text style={[productViewStyles.name, defaultStyles.name]}>
                  {product?.name}
                </Text>
                <Text style={[
                  productViewStyles.price,
                  defaultStyles.price,
                ]}>
                  {`$ ${product?.price.value.toLocaleString()}`}
                </Text>

                <View style={[defaultStyles.wrapperBadges, productViewStyles.wrapperBadges]}>
                  {/* <WishlistButton product={product}/> */}
                </View>

              </View>
            </>
          ) : (
            <ActivityIndicator />
          )}

          {
            product && product?.skuSpecifications && (
              <View
              style={[
                productViewStyles.containerSkuSelector,
                defaultStyles.containerSkuSelector,
              ]}>
                <SkuSelector
                  product={product}
                />
              </View>
            )
          }

          {product && (
            <>
              <Text style={[productViewStyles.title, defaultStyles.title]}>
              Detalles  del Producto
              </Text>
              <View
                style={[
                  productViewStyles.containerDescription,
                  defaultStyles.containerDescription,
                ]}>
                {
                  product?.description
                    ?
                    (
                      <Text
                        style={[
                          productViewStyles.description,
                          defaultStyles.description,
                        ]}>
                        {product?.description}
                      </Text>
                    )
                    :
                    (
                      <Text
                        style={[
                          productViewStyles.description,
                          defaultStyles.description,
                        ]}>
                        [Descripción no disponible.]
                      </Text>
                    )
                }

              </View>
            </>
          )}
        </View>
      </ScrollView>

      <View style={[
        productViewStyles.footerContainer,
        defaultStyles.footerContainer,
      ]}>
        <View style={[
          productViewStyles.footerPrice,
          defaultStyles.footerPrice,
        ]}>
          <Text style={[
            productViewStyles.price,
            defaultStyles.price,
          ]}>
            {`$ ${product?.price.value.toLocaleString()}`}
          </Text>
        </View>
        <View
          style={[
            productViewStyles.cartButton,
            defaultStyles.cartButton,
          ]}>
          <QuantitySelector style={style} product={product} availableQuantityInfo={quantitySelector.availableQuantityInfo} />
          <AddToCartButton text={cart?.text} style={style} product={product} />
        </View>
      </View> 

    </>
  );
};

export default ProductView;

const defaultStyles = StyleSheet.create({
  mainContainer:{
    flex: 1
  },
  container: {
    flex: 1,    
    backgroundColor: '#fff',
  },
  containerDetail: {
    marginHorizontal: 24
  },
  cartButton: {
    width: "60%"
  },
  priceContainer: {
    justifyContent: 'flex-start',
    paddingVertical: 20,
    paddingLeft: 10,
  },
  price: {
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: "400",
    color: '#142032',
  },
  priceDiscount: {
    fontFamily: 'Poppins',
    fontWeight: '300',
    fontSize: 16,
    textDecorationLine: 'line-through',
    color: '#888888',
  },
  title: {
    fontFamily: 'Roboto',
    fontSize: 18,
    color: '#142032',
    padding: 10,
    fontWeight: '700',
  },
  description: {
    fontFamily: 'Poppins',
    fontWeight: '300',
    fontSize: 16,
    padding: 10,
    textAlign: 'justify',
  },

  containerDescription: {
    padding: 10,
    justifyContent: 'center',
  },

  vendor: {
    fontFamily: 'Poppins',
    fontSize: 18,
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
    fontFamily: 'Roboto',
    fontSize: 18,
    color: '#142032',
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 10
  },
  brand: {
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: "400",
    color: "#14203299"
  },
  footerContainer: {
    justifyContent: "flex-end",
    flexDirection: "row",
    borderWidth: 2,
    backgroundColor: "#fff",
    borderColor: "#ECEBE4",
    padding: 8,
  },
  footerPrice: {
    height: 48,
    width: "40%",
    justifyContent: "center",
    alignItems: "center"
  },
  containerSkuSelector:{},
  badges: {},
  productPriceDiscountPercentage: {},
  badgeDiscount: {},
  textBadgeNew: {},
  badgeNew: {},
  wrapperBadges: {}
});
