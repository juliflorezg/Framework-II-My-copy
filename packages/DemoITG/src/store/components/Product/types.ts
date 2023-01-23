import {ImageProps} from '@my-app/ui';
import {ProductTypes} from '@vercel/commerce/types/product';
import {ImageStyle, TextStyle, ViewStyle} from 'react-native';
import {Product} from '../../../utils/product';

type SimpleModeStyleProps = {
  containerQuantitySelectorSimple?: ViewStyle;
  wrapperAvailableSimple?: ViewStyle;
  textStylesAvailableTextSimple?: TextStyle;
  textStylesAvailableQuantitySimple?: TextStyle;
  wrapperQuantitySelectorSimple?: ViewStyle;
  wrapperQuantitySelectorButtonsSimple?: ViewStyle;
  buttonStyleQuantitySelectorSimple?: ViewStyle;
  textButtonQuantitySelectorSimple?: TextStyle;
  quantityTextSimple?: TextStyle;
};

type SlimModeStyleProps = {
  container?: ViewStyle;
  imageContainer?: ViewStyle;
  image?: ImageStyle;
  productName?: TextStyle;
};

type DefaultStyleProps = {
  containerQuantitySelectorDefault?: ViewStyle;
  wrapperAvailableDefault?: ViewStyle;
  textStylesAvailableTextDefault?: TextStyle;
  textStylesAvailableQuantityDefault?: TextStyle;
  wrapperQuantitySelectorDefault?: ViewStyle;
  wrapperQuantitySelectorButtonsDefault?: ViewStyle;
  buttonStyleQuantitySelectorDefault?: ViewStyle;
  textButtonQuantitySelectorDefault?: TextStyle;
  quantityTextDefault?: TextStyle;
};

interface QuantitySelectorProps {
  availableQuantityInfo?: boolean;
}

interface CartButtonProps {
  text?: string;
  variant?: 'default' | 'slim' | 'simple';
}
type ICard = {
  image: ImageProps;
  product: Product;
  noNameTag?: boolean;
  maxCharts?: number;
  style?: string;
  cart?: CartButtonProps;
  quantitySelector?: QuantitySelectorProps;
};

type IQuantity = {
  availableQuantityInfo?: number | string;
  style?: SimpleModeStyleProps | SlimModeStyleProps | DefaultStyleProps;
  product: Product;
  increment: () => void;
  decrement: () => void;
  quantity: number;
};

type ICartButton = {
  text?: string;
  style?: string;
  product: Product;
  addToCart: () => void;
};

interface ItemProps {
  item: Product;
  quantitySelector?: QuantitySelectorProps;
}
interface PriceRangeProps {
  priceRange: any;
  styles?: StylesPriceRange;
  minValue?: number;
  maxValue?: number;
}

interface StylesPriceRange {
  containerPriceRange?: ViewStyle;
  lane?: ViewStyle;
  textContainerPriceRange?: ViewStyle;
  labelPriceRange?: TextStyle;
  knob?: ViewStyle;
}

type StyleProductListProps = {
  containerPriceRange?: ViewStyle;
  lane?: ViewStyle;
  textContainerPriceRange?: ViewStyle;
  labelPriceRange?: TextStyle;
  knob?: ViewStyle;
  wrapperActionSheet?: ViewStyle;
  wrapperTitleActionsheet?: ViewStyle;
  displayTitleActionsheet?: TextStyle;
  removeButtonWrapperActionSheet?: ViewStyle;
  wrapperTextActionSheet?: ViewStyle;
  titleActionStyle?: TextStyle;
  wrapperOptionsActionSheet?: ViewStyle;
  wrapperOptionsTextActionSheet?: ViewStyle;
  nameOptionActionSheet?: TextStyle;
  descriptionOptionActionSheet?: TextStyle;
  headerFilter?: ViewStyle;
  wrapperTextHeaderFilter?: ViewStyle;
  displayNameHeaderFilter?: TextStyle;
  arrowContainer?: ViewStyle;
};

interface ProductListProps {
  numColumns?: number;
  department?: string;
  category?: string;
  subCategory?: string;
  variant?: VariantProductList;
  maxCharts?: number;
  style?: string;
  horizontal?: boolean;
  imgProps?: {
    width: number;
    height: number;
  };
  cart?: CartPropsType;
  quantitySelector?: QuantitySelectorType;
  orderBy?: OrderByType;
  priceRange?: priceRangeType;
  quantityPerPage?: number;
}

type VariantProductList = {
  variant?: 'default' | 'slim' | 'simple';
};

type CartPropsType = {
  text?: string;
  variant?: 'default' | 'slim' | 'simple';
};
type QuantitySelectorType = {
  availableQuantityInfo?: boolean;
  variant?: 'default' | 'simple' | 'slim' | 'cart' | 'wishlist' | undefined;
};

type OrderByType = {
  options?: [
    {
      value:
        | 'OrderByTopSaleDESC'
        | 'OrderByReleaseDateDESC'
        | 'OrderByBestDiscountDESC'
        | 'OrderByPriceDESC'
        | 'OrderByPriceASC'
        | 'OrderByNameASC'
        | 'OrderByNameDESC';
      name: string;
      description: string;
    },
  ];
};

type priceRangeType = {
  visible?: boolean;
  minValue?: number;
  maxValue?: number;
};

interface QuantitySelectorProps {
  availableQuantityInfo?: boolean;
}

interface ProductCardProps {
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

export type {
  ICard,
  IQuantity,
  ICartButton,
  SimpleModeStyleProps,
  SlimModeStyleProps,
  DefaultStyleProps,
  ItemProps,
  PriceRangeProps,
  StylesPriceRange,
  StyleProductListProps,
  ProductListProps,
  CartPropsType,
  QuantitySelectorType,
  OrderByType,
  priceRangeType,
  QuantitySelectorProps,
  CartButtonProps,
  VariantProductList,
  ProductCardProps,
};