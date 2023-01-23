import React, {FC} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {Link} from '@my-app/ui';
import ProductModes from './Views';
import useStyles from '@my-app/app/src/framework/styleguide/hooks/useStyles';
import { Product } from '../../../../utils/product';
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
  cart?: CartButtonProps;
  quantitySelector?: QuantitySelectorProps;
}
interface CartButtonProps {
  text?: string;
  variant?: 'default' | 'slim' | 'simple';
}

interface QuantitySelectorProps {
  availableQuantityInfo?: boolean;
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
  cart = {
    text: 'Agregar',
    variant: 'simple',
  },
  quantitySelector = {
    availableQuantityInfo: false,
  },
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
          cart,
          quantitySelector,
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
