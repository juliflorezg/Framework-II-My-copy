import React, {
  FC,
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  ImageStyle,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
  TouchableOpacity,
  useWindowDimensions,
  PixelRatio,
} from 'react-native';
import {Button, Text} from '@my-app/ui';
import useStyles from '@my-app/app/src/framework/styleguide/hooks/useStyles';

import {Product} from '../../../../utils/product';
import {ChevronDown} from '@my-app/ui/src/icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useAnimatedRef,
} from 'react-native-reanimated';
import {useGlobalState} from '@my-app/app/src/framework/state-machine';
import {useCommons} from '@my-app/app/src/framework/omni-logic/kernel/utils/use-hook';
import _, {isEmpty, xorWith} from 'lodash';
import { ScrollView } from 'react-native';

type Props = {
  product: Product;
  style?: string;
  variant?: 'default' | 'simple' | 'slim';
};

type MachineProductConfig = {
  machineName: string;
  pointer?: string;
  cartMachineName: string;
};

const machineConfig: MachineProductConfig = {
  machineName: 'productManager',
  cartMachineName: 'cartManager',
};

const useCartMachine = (config: MachineProductConfig) => {
  const machines = useGlobalState();
  return machines[config.cartMachineName];
};

const isArrayEqual = function (x: any[], y: any[]) {
  return isEmpty(xorWith(x, y, _.isEqual));
};

const arrSelectedVariations = (selectedVariations: any[]) => {
  const values = selectedVariations.reduce((accum, currentValue) => {
    return [
      ...accum,
      {
        displayName: currentValue.displayName,
        value: currentValue.values[0].label,
      },
    ];
  }, []);
  return values;
};

const parseArrVariations = (variations: any[]) => {
  const values = variations.reduce((accum, currentValue) => {
    return [
      ...accum,
      {
        displayName: currentValue.displayName,
        value: currentValue.values[0].label,
      },
    ];
  }, []);
  return values;
};

const arraySkuAvailablesFn = (items: any[]) => {
  const values = items?.reduce((accum, currentValue) => {
    return [...accum, parseArrVariations(currentValue?.options)];
  }, []);
  return values;
};

const idVariant = (variants: any, variantSku: any) => {
  const value = variants.reduce((accum, currentValue) => {
    if (isArrayEqual(parseArrVariations(currentValue?.options), variantSku)) {
      accum = {
        id: currentValue?.id,
        value: variantSku,
      };
    }

    return accum;
  }, {});

  //console.log("eval",value, variantSku)
  return value;
};

const SkuSelector: FC<Props> = ({product, style, variant = 'simple'}) => {
  const [displayActionSheet, setActionSheet] = useState(false);
  const [title, setTitle] = useState('');
  const [skus, setSkus] = useState([{label: ''}]);
  const arrVar = product && arrSelectedVariations(product?.skuSpecifications);
  const arrayAvailableSkus = product && arraySkuAvailablesFn(product?.variants);
  const [selectedSku, setSelectedSku] = useState(arrVar || []);
  const [arraySkuAvailables, setArraySkuAvailables] = useState(
    arrayAvailableSkus || [],
  );
  const {StateMachine} = useCommons();
  const cart = useCartMachine(machineConfig);
  const [{value, context}] = cart.actor;

  // const availableQuantity = product?.availableQuantity || 0;

  const findProduct = () => {
    const finded = context.products.find(pred => pred?.id === product?.id);
 
    return finded;
  };

  const selectSku = () => {
    if (findProduct() && idVariant(product?.variants, selectedSku)) {
   
      StateMachine.send(machineConfig.cartMachineName, 'EDIT-VARIANT', {
        product,
        variantId: idVariant(product?.variants, selectedSku).id,
      });
    } else if (idVariant(product?.variants, selectedSku)) {
      StateMachine.send(machineConfig.machineName, 'ADD', {
        product,
        selectedSku: idVariant(product?.variants, selectedSku),
      });
    }
  };

  const [selectedName, setSelectedName] = useState([
    {displayName: '', value: ''},
  ]);

  const selectedItem = (displayName: string, sku: string) => {
    setSelectedSku(state => {
      const cpyArr = [...state];

      const found = cpyArr.find(item => item.displayName === displayName);

      if (found) {
        const selectedIndex = cpyArr.findIndex(
          prev => prev.value === found?.value,
        );
        cpyArr.splice(selectedIndex, 1);

        cpyArr.push({displayName: displayName, value: sku});
      } else {
        cpyArr.push({displayName: displayName, value: sku});
      }

      return cpyArr;
    });

    setSelectedName(state => {
      const cpyArr = [...state];

      const found = cpyArr.find(item => item.displayName === displayName);

      if (found) {
        const selectedIndex = cpyArr.findIndex(
          prev => prev.value === found?.value,
        );
        cpyArr.splice(selectedIndex, 1);

        cpyArr.push({displayName: displayName, value: sku});
      } else {
        cpyArr.push({displayName: displayName, value: sku});
      }

      return cpyArr;
    });

    selectSku();
  };

  const findName = (text: string) => {
 
    const found = selectedName.find(item => item.displayName === text);

    return found?.value;
  };

  const findSelectedItem = (sku: string) => {
   
    const found = selectedSku.find(item => item.value === sku);
 
    return found?.value;
  };

  const children = useMemo(
    () => (
      <>
        <View style={defaultStyles.wrapperActionSheet}>
          <Text style={defaultStyles.titleActionStyle}>
            {`Elegir ${title.toLowerCase()}`}
          </Text>

        <ScrollView>
          {skus?.map(sku => {
            return (
              <Fragment key={sku?.label}>
                <TouchableOpacity
                  onPress={() => selectedItem(title, sku?.label)}>
                  <View style={[defaultStyles.containersku, findSelectedItem(sku?.label) && { backgroundColor: '#D9D9D9'}]}>
               
                    <Text style={[defaultStyles.displayNameSubtitleStyle, findSelectedItem(sku?.label) && {fontWeight: '600',}]}>
                      {sku?.label}
                    </Text>
                 
                  </View>
                </TouchableOpacity>
              </Fragment>
            );
          })}
        </ScrollView>
        </View>
      </>
    ),
    [selectedItem, selectedSku, skus, title],
  );

  const openAction = (spec: any) => {
    setTitle(spec?.displayName);
    setSkus(spec?.values);
   

    setActionSheet(true);
  };
 

  return (
    <>
      {product?.skuSpecifications?.map(spec => {
        return (
          <Fragment key={spec?.id}>
            <TouchableOpacity onPress={() => openAction(spec)}>
              <View style={defaultStyles.container}>
                <View style={defaultStyles.wrapperText}>
                  <Text style={defaultStyles.displayNameStyle}>
                    {spec?.displayName}
                  </Text>
                  <Text style={defaultStyles.displayNameSubtitleStyle}>
                    {findName(spec?.displayName)
                      ? findName(spec?.displayName)
                      : `Elegir ${spec?.displayName.toLowerCase()}`}
                  </Text>
                </View>
                <View style={[defaultStyles.arrowContainer]}>
                  <ChevronDown
                    height={20}
                    width={16}
                    stroke={'#1C1C1C'}
                    strokeWidth={3}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </Fragment>
        );
      })}

      <ActionSheet
        actionSheetContent={children}
        displayActionSheet={displayActionSheet}
        closeActionSheet={setActionSheet}
      />
    </>
  );
};

export default SkuSelector;

const defaultStyles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: "#CCCED8",
    flexDirection: 'row',
    alignItems: 'center',
    height: 64,
    borderRadius: 8,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  wrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  wrapperText: {},
  displayNameStyle: {
    fontSize: 16,
    color: '#142032',
    marginHorizontal: 20,
    marginBottom: 4,
    fontWeight: '600',
  },
  displayNameSubtitleStyle: {
    fontSize: 16,
    color: '#142032',
    textAlign: 'center',
    marginHorizontal: 20,
    fontWeight: '300',
  },
  arrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    width: 18,
    height: 18,
    borderRadius: 18,
    backgroundColor: '#fff',
  },

  wrapperActionSheet: {
    height: 200,
    width: '100%',
  },
  titleActionStyle: {
    fontSize: 16,
    color: '#142032',
    marginBottom: 4,
    fontWeight: '600',
  },
  containersku: {
    height:40,
    justifyContent:"center",
    alignContent:"center",
    alignItems:"center",
    borderStyle:'solid',
    borderRadius:3,
    borderBottomColor:'#DDDBDB',
    borderBottomWidth:0.5
  },
});

 

const ActionSheet: FC<any> = ({
  displayActionSheet,
  closeActionSheet,
  actionSheetContent,
}) => {
  const bodyRef = useAnimatedRef<Animated.View>();
  const {height} = useWindowDimensions();
  // const { displayActionSheet, closeActionSheet, actionSheetContent } = useUI();

  const startingPosition = height;
  const y = useSharedValue(startingPosition);
  const style = useAnimatedStyle(() => {
    return {
      transform: [{translateY: y.value}],
    };
  }, [y]);

  useEffect(() => {
    if (displayActionSheet) {
      // @ts-ignore
      bodyRef?.current?.measure((x, yT, w, h) => {
        y.value = withTiming(-h - 40, {duration: 500});
      });
    } else {
      if (y.value !== startingPosition) {
        y.value = withTiming(startingPosition, {duration: 500});
      }
    }
  }, [bodyRef, displayActionSheet, startingPosition]);

  return (
    <>
      {displayActionSheet && (
        <View
          onTouchEnd={() => closeActionSheet(false)}
          style={{
            zIndex: 1,
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: '#000',
            opacity: 0.5,
          }}
        />
      )}

      <Animated.View
        style={[
          {
            zIndex: 1,
            width: '100%',
            top: height,
            position: 'absolute',
            backgroundColor: 'white',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            padding: 20,
          },
          style,
        ]}>
        <Animated.View
          ref={bodyRef}
          style={{paddingBottom: PixelRatio.getPixelSizeForLayoutSize(16)}}
          renderToHardwareTextureAndroid={true}>
          {actionSheetContent}
        </Animated.View>
      </Animated.View>
    </>
  );
};
