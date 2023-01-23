import React, {FC, memo, useCallback, useEffect, useRef, useState} from 'react';
import ProductCard from '../../Product/ProductCard';
import {makeid} from '@my-app/app/src/framework/engine/utils/randomKey';
import {FlatList, View, StyleSheet, ViewStyle, TextStyle} from 'react-native';
import {Text, Image} from '@my-app/ui';
import {BlockComponent} from '@my-app/app/src/framework/engine/types';
import {Product} from '../../../../utils/product';
import isEqual from 'lodash.isequal';
import {useCommons} from '@my-app/app/src/framework/omni-logic/kernel/utils/use-hook';
import {useGlobalState} from '@my-app/app/src/framework/state-machine';
import useStyles from '@my-app/app/src/framework/styleguide/hooks/useStyles';

interface ItemProps {
  item: Product;
}

const MachineConfig = {
  machineName: 'cartManager',
  pointer: 'products',
};

type CartStyleProps = {
  containerEmptyState?: ViewStyle;
  title?: TextStyle;
  subtitle?: TextStyle;
};

const CartList: FC<BlockComponent<any>> = ({
  props: {
    numColumns,
    variant = 'cart',
    maxCharts,
    style,
    horizontal,
    imgProps = {width: 180, height: 180},
    textAddtoCart,
    emptyState = {
      img: {
        url: '',
        width: 280,
        height: 280,
      },
      title: 'Tu carrito está vacío',
      subtitle: 'Agrega productos a tu carrito en nuestras categorías',
    },
  },
}) => {
  const [data, setData] = useState({
    products: [],
  });

  const {StateMachine} = useCommons();
  const machines = useGlobalState();
  const [{context}] = machines[MachineConfig.machineName]?.actor;

  const cartStyles = useStyles(style) as CartStyleProps;
  useEffect(() => {
    const machine = StateMachine.getData(MachineConfig.machineName);
    if (machine) {
      const {context} = machine;
      setData({
        products: context[MachineConfig.pointer],
      });
    }
  }, [context[MachineConfig.pointer]]);

  const componentDidMount = async () => {
    const machine = StateMachine.getData(MachineConfig.machineName);
    if (machine) {
      const {context} = machine;
      setData({
        products: context[MachineConfig.pointer],
      });
    }
  };

  useEffect(() => {
    componentDidMount();
  }, []);
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
    <>
      {data?.products.length > 0 ? (
        <FlatList
          horizontal={horizontal}
          ref={flatListRef}
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
      ) : (
        <>
          {emptyState?.img?.url && emptyState.title && (
            <View
              style={[defaultStyles.container, cartStyles.containerEmptyState]}>
              <Image
                src={emptyState?.img?.url || ''}
                height={emptyState?.img?.height}
                width={emptyState?.img?.width}
              />
              <Text style={[defaultStyles.titleStyle, cartStyles.title]}>
                {emptyState?.title}
              </Text>
              <Text style={[defaultStyles.subtitleStyle, cartStyles.subtitle]}>
                {emptyState?.subtitle}
              </Text>
            </View>
          )}
        </>
      )}
    </>
  );
};

export default memo(CartList, isEqual);

const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    color: '#390052',
    fontSize: 24,
    marginBottom: 16,
    margin: 10,
  },
  subtitleStyle: {
    color: '#390052',
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 46,
    marginBottom: 16,
    margin: 10,
  },
});
