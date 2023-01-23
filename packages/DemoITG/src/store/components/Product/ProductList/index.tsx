import React, {
  FC,
  Fragment,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import getSearchStaticProps from '@my-app/app/src/lib/search-props';
import ProductCard from '../ProductCard';
import {makeid} from '@my-app/app/src/framework/engine/utils/randomKey';
import {
  FlatList,
  PixelRatio,
  useWindowDimensions,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ViewStyle,
  TextStyle
} from 'react-native';
import {useExtension} from '@my-app/app/src/framework/engine/extension/context';
import {BlockComponent} from '@my-app/app/src/framework/engine/types';
import {Product} from '../../../../utils/product';
import {useRoute} from '@react-navigation/native';
import isEqual from 'lodash.isequal';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useAnimatedRef,
  withSpring,
  runOnJS,
  useAnimatedGestureHandler,
  StyleProps,
} from 'react-native-reanimated';
import {ChevronDown} from '@my-app/ui/src/icons';
import {RadioButton, RadioGroup} from 'react-native-ui-lib';
import {useStyleguide} from '@my-app/app/src/framework/styleguide/context';
import {ExitIcon, FilterIcon} from '../../icons';
import Svg, {Line} from 'react-native-svg';
import {
  NativeViewGestureHandler,
  PanGestureHandler,
} from 'react-native-gesture-handler';

import usePrice from '@vercel/commerce/product/use-price';
import useStyles from '@my-app/app/src/framework/styleguide/hooks/useStyles';
import PLPActionSheet from './PLPActionSheet';
import {PriceRangeComponent} from './PriceRange';
import { CartButtonProps, ItemProps, ProductCardProps, ProductListProps, QuantitySelectorProps, VariantProductList } from '../types';
const {View: AView, createAnimatedComponent} = Animated;
const ALine = createAnimatedComponent(Line);
const AText = createAnimatedComponent(TextInput);



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
const ProductList: FC<BlockComponent<ProductListProps>> = ({
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
    cart = {
      text: 'Agregar',
      variant: 'simple',
    },
    quantitySelector = {
      availableQuantityInfo: false,
    },
    orderBy,
    priceRange,
    quantityPerPage = 9,
  },
}) => {
  const [data, setData] = useState([]);
  const [recordsFiltered, setRecordsFiltered] = useState(0);
  const {
    theme: {palette},
  } = useStyleguide();
  const {hooks} = useExtension();
  const context = 'useSearch';
  const submit = hooks[context];
  const {params} = useRoute();
  const Styles = useStyles(style) as StyleProps;
  const [displayActionSheet, setActionSheet] = useState(false);
  const [selectedOrderBy, setSelectedOrderBy] = useState('');
  const [priceRangeState, setPriceRangeState] = useState({
    from: 0,
    to: 10000000,
  });
  const [perPageParam, setPerPageParam] = useState({
    to: quantityPerPage,
    from: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const componentDidMount = async () => {
    setIsLoading(true);
    let input = {};

    if (department || params?.department)
      input = {...input, department: department || params?.department};
    if (category || params?.category)
      input = {...input, category: category || params?.category};
    if (subCategory || params?.subCategory)
      input = {...input, subCategory: subCategory || params?.subCategory};
    if (params?.term) input = {...input, term: params?.term};
    if (params?.brand) input = {...input, brand: params?.brand};
    if (priceRangeState.from && priceRangeState.to)
      input = {...input, priceRange: priceRangeState};
    if (selectedOrderBy) input = {...input, orderBy: selectedOrderBy};

    input = {...input, from: perPageParam.from, to: perPageParam.to};

    const products = await submit({
      input,
      hooks,
    });

    if (data?.length >= 0 && products[context]?.products[0]?.products.length) {
      setRecordsFiltered(products[context]?.products[0]?.recordsFiltered);
      setData(prod =>
        [...prod].concat(products[context]?.products[0]?.products),
      );
      setIsLoading(false);
    } else {
      setRecordsFiltered(products[context]?.products[0]?.recordsFiltered);
      setData(products[context]?.products[0]?.products);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    componentDidMount();
  }, [params?.term, selectedOrderBy, priceRangeState, perPageParam]);

  const nextPage = useCallback(() => {
    const endCursor = perPageParam.to + quantityPerPage;

    if (
      perPageParam.to ===
      perPageParam.to - 1 + (recordsFiltered - perPageParam.to)
    )
      return;

    if (endCursor > recordsFiltered && recordsFiltered > perPageParam.to) {
      setPerPageParam({
        from: perPageParam.to + 1,
        to: perPageParam.to - 1 + (recordsFiltered - perPageParam.to),
      });

    } else if(endCursor > recordsFiltered  && recordsFiltered < perPageParam.to) {
      setPerPageParam({
        from: 0, 
        to: recordsFiltered,
      });

    } else if (endCursor < recordsFiltered) {
      setPerPageParam(state => ({
        from: state.to + 1,
        to: state.to + 1 + quantityPerPage,
      }));
    }
  }, [recordsFiltered, quantityPerPage, perPageParam.to, isLoading]);

  const renderFlatListItem = useCallback(
    ({item}: ItemProps) => (
      <MemoItem
       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        key={`${item.id} + ${item.index}`}
        product={item}
        variant={variant}
        imgProps={imgProps}
        maxCharts={maxCharts}
        style={style}
        cart={cart}
        quantitySelector={quantitySelector}
      />
    ),
    [],
  );


  const children = useMemo(
    () => (
      <>
        <View
          style={[
            defaultStyles.wrapperActionSheet,
            Styles?.wrapperActionSheet,
          ]}>
          <View
            style={[
              defaultStyles.wrapperTitle,
              Styles?.wrapperTitleActionsheet,
            ]}>
            <Text
              style={[
                defaultStyles.displayTitle,
                Styles?.displayTitleActionsheet,
              ]}>
              {'Mejora tu busqueda'}
            </Text>
            <TouchableOpacity
              style={[
                defaultStyles.removeButtonWrapper,
                Styles?.removeButtonWrapperActionSheet,
              ]}
              onPress={() => setActionSheet(false)}>
              <ExitIcon />
            </TouchableOpacity>
          </View>
          {orderBy?.options?.length && (
            <>
              <View
                style={[
                  defaultStyles.wrapperTextActionSheet,
                  Styles?.wrapperTextActionSheet,
                ]}>
                <Text
                  style={[
                    defaultStyles.titleActionStyle,
                    Styles?.titleActionStyle,
                  ]}>{`ORDENAR POR`}</Text>
              </View>
              <RadioGroup
                initialValue={null}
                onValueChange={value => setSelectedOrderBy(value)}>
                {orderBy?.options?.map(item => {
                  return (
                    <Fragment key={item?.name}>
                      <View
                        style={[
                          defaultStyles.wrapperOptions,
                          Styles?.wrapperOptionsActionSheet,
                        ]}>
                        <View
                          style={[
                            defaultStyles.wrapperOptionsText,
                            Styles?.wrapperOptionsTextActionSheet,
                          ]}>
                          <Text
                            style={[
                              defaultStyles.nameOption,
                              Styles?.nameOptionActionSheet,
                            ]}>
                            {item?.name}
                          </Text>
                          <Text
                            style={[
                              defaultStyles.descriptionOption,
                              Styles?.descriptionOptionActionSheet,
                            ]}>
                            {item?.description}
                          </Text>
                        </View>
                        <RadioButton
                          value={item?.value}
                          color={palette.primary.main}
                        />
                      </View>
                    </Fragment>
                  );
                })}
              </RadioGroup>
            </>
          )}

          {priceRange?.visible && (
            <>
              <View
                style={[
                  defaultStyles.wrapperTextActionSheet,
                  Styles?.wrapperTextActionSheet,
                ]}>
                <Text
                  style={[
                    defaultStyles.titleActionStyle,
                    Styles?.titleActionStyle,
                  ]}>
                  {`FILTRAR POR`}
                </Text>
              </View>
              <PriceRangeComponent
                priceRange={setPriceRangeState}
                styles={Styles}
                minValue={priceRange?.minValue}
                maxValue={priceRange?.maxValue}
              />
            </>
          )}
        </View>
      </>
    ),
    [selectedOrderBy],
  );

  const openAction = () => {
    setActionSheet(true);
  };

  const flatListRef = useRef<FlatList>(null);

  return (
    <>
      {(orderBy?.options?.length || priceRange?.visible) && (
        <View style={[defaultStyles.container, Styles?.headerFilter]}>
          <View
            style={[
              defaultStyles.wrapperText,
              Styles?.wrapperTextHeaderFilter,
            ]}>
            <Text
              style={[
                defaultStyles.displayNameStyle,
                Styles?.displayNameHeaderFilter,
              ]}>
              {`${recordsFiltered || 0} Items`}
            </Text>
          </View>
          <TouchableOpacity onPress={() => openAction()}>
            <View style={[defaultStyles.container, Styles?.headerFilter]}>
              <FilterIcon />
              <View
                style={[
                  defaultStyles.wrapperText,
                  Styles?.wrapperTextHeaderFilter,
                ]}>                  
                <Text
                  style={[
                    defaultStyles.displayNameStyle,
                    Styles?.displayNameHeaderFilter,
                  ]}>
                  {'Filtros'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        horizontal={horizontal}
        ref={flatListRef}
        style={{flex: 1}}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        initialNumToRender={10}
        numColumns={numColumns}
        renderItem={renderFlatListItem}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (!isLoading && typeof nextPage === 'function') {
            nextPage();
          }
        }}
        //ListEmptyComponent={() => children}
      />
      {orderBy?.options?.length && (
        <PLPActionSheet
          actionSheetContent={children}
          displayActionSheet={displayActionSheet}
          closeActionSheet={setActionSheet}
        />
      )}
    </>
  );
};

export default memo(ProductList, isEqual);

const ListItem = ({product,variant, imgProps, maxCharts,style, cart,quantitySelector }:ProductCardProps)=>{


  return ( <ProductCard
   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
   //@ts-ignore
  key={`${product.id} + ${product.index}`}
  product={product}
  variant={variant}
  imgProps={imgProps}
  maxCharts={maxCharts}
  style={style}
  cart={cart}
  quantitySelector={quantitySelector}
/>)
}
const MemoItem = memo(ListItem, (prev, next) =>
  isEqual(prev, next)
);

const defaultStyles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderRadius: 8,
  },
  wrapperActionSheet: {
    height: 732,
    width: '100%',
  },
  titleActionStyle: {
    fontSize: 16,
    color: '#1C1C1C',
    fontWeight: '300',
    marginLeft: 20,
  },
  wrapperText: {
    marginRight: 10
  },
  displayNameStyle: {
    fontSize: 16,
    color: '#1C1C1C',
    fontWeight: '300',
    marginLeft: 10,
  },
  wrapperTextActionSheet: {
    backgroundColor: '#F5F5F5',
    height: 40,
    justifyContent: 'center',
    marginTop: 10,
  },
  wrapperOptionsText: {
    flexDirection: 'column',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  nameOption: {
    fontSize: 16,
    color: '#1C1C1C',

    fontWeight: '600',
    marginLeft: 10,
  },
  descriptionOption: {
    fontSize: 16,
    color: '#1C1C1C',
    fontWeight: '300',
    marginLeft: 10,
  },
  wrapperOptions: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginRight: 20,
    borderStyle: 'solid',
    borderBottomColor: '#DDDBDB',
    borderBottomWidth: 0.5,
  },
  wrapperTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  displayTitle: {
    fontSize: 20,
    color: '#1C1C1C',
    marginBottom: 4,
    fontWeight: '600',
    marginLeft: 20,
  },
  removeButtonWrapper: {
    backgroundColor: '#F5F5F5',
    height: 32,
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    marginRight: 20,
  },
  input: {
    color: '#c2c2c2',
    flex: 1,
    marginLeft: 10,
    fontFamily: 'Roboto',
  },
});
