import React, {FC} from 'react';
import {Product} from '@vercel/commerce/types/product';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {Link} from '@my-app/ui';
import ProductModes from './Views';
import useStyles from '@my-app/app/src/framework/styleguide/hooks/useStyles';
//import ProductTag from '../ProductTag'

interface Props {
  style?: string;
  product: Product;
  noNameTag?: boolean;
  //imgProps?: Omit<ImageProps, 'src' | 'layout' | 'placeholder' | 'blurDataURL'>
  imgProps: {
    width: number;
    height: number;
  };
  variant?: 'default' | 'slim' | 'simple';
  maxCharts?: number;
  textAddtoCart?: string;
}

type ProductCardStyleProps = {
  productContainer?: ViewStyle;
};

const ProductCard: FC<Props> = ({
  product,
  imgProps,
  style,
  noNameTag = false,
  variant = 'default',
  maxCharts,
  textAddtoCart,
}) => {
  const productCardStyles = useStyles(style) as ProductCardStyleProps;
  return (
    <View
      style={[
        productCardStyles.productContainer,
        defaultStyles.productContainer,
      ]}>
      <Link href={`/product${product?.slug}`}>
        {ProductModes[variant]({
          image: {
            src: product.images[0].url,
            height: imgProps.height,
            width: imgProps.width,
          },
          product,
          noNameTag,
          maxCharts,
          style,
          textAddtoCart,
        })}
      </Link>
    </View>
  );
};

const defaultStyles = StyleSheet.create({
  productContainer: {
    flex: 1,
  },
});

export default ProductCard;
