import React, {FC, Fragment, useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import commerce from '@my-app/app/src/lib/api/commerce';
import ProductView from '../ProductView';
import {ButtonLoading} from '@my-app/ui';
import {useExtension} from '@my-app/app/src/framework/engine/extension/context';

const getProduct = async (slug: string, config: object) => {
  const productPromise = commerce.getProduct({
    variables: {slug: slug},
    config,
    preview: false,
  });

  const {product} = await productPromise;

  return product;
};

const allProducts = async (config: object) => {
  try {
    const allProductsPromise = commerce.getAllProducts({
      variables: {first: 4},
      config,
      preview: false,
    });

    const {products} = await allProductsPromise;
    return products;
  } catch (error) {}
};

interface QuantitySelectorProps {
  availableQuantityInfo?: boolean;
}

interface ProductDetailProps {
  props: {
    relatedProducts?: boolean;
    relatedProductsType?:
      | 'buy'
      | 'similars'
      | 'view'
      | 'viewAndBought'
      | 'accessories'
      | 'suggestions';
    style?: string;
    textAddtoCart?: string;
    imgProps?: {width: number; height: number};
    productCard?: ProductCardProps;
    quantitySelector?:QuantitySelectorProps
  };
}

export interface ProductCardProps {
  noNameTag?: boolean;
  //imgProps?: Omit<ImageProps, 'src' | 'layout' | 'placeholder' | 'blurDataURL'>
  imgProps: {
    width: number;
    height: number;
  };
  variant?: 'default' | 'slim' | 'simple';
  maxCharts?: number;
}

const ProductDetail: FC<ProductDetailProps> = ({
  props: {
    relatedProducts,
    relatedProductsType = 'buy',
    style,
    textAddtoCart,
    imgProps = {width: 240, height: 240},
    productCard = {
      imgProps: {width: 180, height: 180},
      variant: 'simple',
    },
    quantitySelector,
  },
}) => {
  const config = {
    locale: 'es-CO',
    locales: [],
  };

  const [product, setProduct] = useState<any>({product: {}});
  const [relatedProductsList, setRelatedProducts] = useState<any>({
    products: [],
  });
  const {hooks} = useExtension();
  const context = 'useProduct';
  const contextRecommendation = 'useProductRecommendations';
  const submit = hooks[context];
  const submitRecommendation = hooks[contextRecommendation];
  const {params} = useRoute();

  console.log('params propduct', params);

  const componentDidMount = async () => {
    let input = {};

    let inputRecommendation = {};
    if (params?.slug) input = {...input, slug: params?.slug};

    if (params?.slug && relatedProducts)
      inputRecommendation = {
        ...inputRecommendation,
        identifier: {field: 'slug', value: params?.slug},
        type: relatedProductsType,
      };

    const products = await submit({
      input,
      hooks,
    });

    if (relatedProducts) {
      const productsRecommendations = await submitRecommendation({
        inputRecommendation,
        hooks,
      });

      setProduct(products[context]);
      setRelatedProducts(productsRecommendations[contextRecommendation]);
    }
  };

  useEffect(() => {
    console.log('entre');
    componentDidMount();
  }, [params?.slug]);

  // useEffect(() => {
  //   getProduct(params!.slug, config).then(response => {
  //     setProduct(response);
  //   });
  //   if (props?.relatedProducts) {
  //     allProducts(config).then(response => {
  //       setRelatedProducts(response);
  //     });
  //   }
  // }, [params]);

  return (
    <Fragment>
      {!params?.slug && !product.product ? (
        <ButtonLoading />
      ) : (
        <ProductView
          productCard={productCard}
          imgProps={imgProps}
          textAddtoCart={textAddtoCart}
          product={product?.product[0]}
          style={style}
          variant={productCard.variant}
          quantitySelector={quantitySelector}
          relatedProducts={relatedProducts ? relatedProductsList?.products : []}
        />
      )}
    </Fragment>
  );
};

export default ProductDetail;
