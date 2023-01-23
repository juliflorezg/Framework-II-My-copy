import React, {FC, memo, useCallback, useEffect, useRef, useState} from 'react';
import ProductCard from '../../Product/ProductCard';
import {makeid} from '@my-app/app/src/framework/engine/utils/randomKey';
import {FlatList, View, StyleSheet, Text, ViewStyle, TextStyle} from 'react-native';
import {BlockComponent} from '@my-app/app/src/framework/engine/types';
import {Product} from '../../../../utils/product';
import isEqual from 'lodash.isequal';
import {useCommons} from '@my-app/app/src/framework/omni-logic/kernel/utils/use-hook';
import {useGlobalState} from '@my-app/app/src/framework/state-machine';
import useStyles from '@my-app/app/src/framework/styleguide/hooks/useStyles';
import {BrokenHeartIcon} from '../../icons';

interface ItemProps {
  item: Product;
}

const MachineConfig = {
  machineName: 'wishlistManager',
  pointer: 'products',
};

type WishlistStyleProps = {
  containerEmptyState?: ViewStyle;
  title?: TextStyle;
  subtitle?: TextStyle;
};

const WishlistList: FC<BlockComponent<any>> = ({
  props: {
    numColumns,
    variant = 'wishlist',
    maxCharts,
    style,
    horizontal,
    imgProps = {width: 180, height: 180},
    textAddtoCart,
    emptyState = {
      title: 'Aun no tienes favoritos',
      subtitle: 'Descubre los productos que tenemos para ti',
    },
  },
}) => {
  const [data, setData] = useState({
    products: [],
  });

  const {StateMachine} = useCommons();
  const machines = useGlobalState();
  const [{context}] = machines[MachineConfig.machineName]?.actor;
  const wishlistStyles = useStyles(style) as WishlistStyleProps;
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
        <View style={[defaultStyles.container, wishlistStyles.containerEmptyState]}>
          <BrokenHeartIcon />
          <Text style={[defaultStyles.titleStyle, wishlistStyles.title]}>
            {emptyState?.title}
          </Text>
          <Text style={[defaultStyles.subtitleStyle, wishlistStyles.subtitle]}>
            {emptyState?.subtitle}
          </Text>
        </View>
      )}
    </>
  );
};

export default memo(WishlistList, isEqual);

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
    textAlign:"center",
    marginHorizontal:46,
    marginBottom: 16,
    margin: 10,
  },
});
