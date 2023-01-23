import React, {
  FC,
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import getSearchStaticProps from '@my-app/app/src/lib/search-props';
import ProductCard from '../ProductCard';
import {makeid} from '@my-app/app/src/framework/engine/utils/randomKey';
import {FlatList, ImageStyle, View} from 'react-native';
import {useExtension} from '@my-app/app/src/framework/engine/extension/context';
import {BlockComponent} from '@my-app/app/src/framework/engine/types';
import {Product} from '../../../../utils/product';
import {useRoute} from '@react-navigation/native';

interface ItemProps {
  item: Product;
}
const GetStoreProps = async () => {
  const searchProps = await getSearchStaticProps({
    locale: 'es-CO',
    locales: [],
  });
  return {
    props: {
      ...searchProps.props,
    },
  };
};

const ProductList: FC<BlockComponent<any>> = ({
  props: {
    numColumns,
    department,
    category,
    subCategory,
    variant = 'simple',
    maxCharts,
    style,
    horizontal,
    imgProps = {width: 180, height: 180},
    textAddtoCart,
  },
}) => {
  const [data, setData] = useState({
    products: [],
  });
  const {hooks} = useExtension();
  const context = 'useSearch';
  const submit = hooks[context];
  const {params} = useRoute();

  
  const componentDidMount = async () => {
    let input = {};

    if (department) input = {...input, department};
    if (category) input = {...input, category};
    if (subCategory) input = {...input, subCategory};
    if (params?.term) input = {...input, term: params?.term};

    const products = await submit({
      input,
      hooks,
    });
    
    setData(products[context]);
  };

  useEffect(() => {
    componentDidMount();
  }, [params?.term]);

  const renderFlatListItem = useCallback(
    (product: ItemProps) => (
      <ProductCard
        key={makeid(5)}
        product={product.item}
        variant={variant}
        imgProps={imgProps}
        maxCharts={maxCharts}
        style={style}
        textAddtoCart={textAddtoCart}
      />
    ),
    [],
  );

  const flatListRef = useRef<FlatList>(null);
  return (
    <FlatList
      horizontal={horizontal}
      ref={flatListRef}
      key={makeid(5)}
      style={{flex: 1}}
      data={data?.products}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      initialNumToRender={10}
      numColumns={numColumns}
      renderItem={renderFlatListItem}
      onEndReachedThreshold={0.5}
      //ListEmptyComponent={() => children}
    />
  );
};

export default ProductList;
