import React, {FC, useMemo} from 'react';
import {StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import {Button, Text} from '@my-app/ui';
import useStyles from '@my-app/app/src/framework/styleguide/hooks/useStyles';
import {useGlobalState} from '@my-app/app/src/framework/state-machine';
import {useCommons} from '@my-app/app/src/framework/omni-logic/kernel/utils/use-hook';
import {Product} from '../../../../utils/product';


type QuantitySelectorStyleProps = {
  buttonStyleQuantitySelector?: ViewStyle;
  textButtonQuantitySelector?: TextStyle;
  containerQuantitySelector?: ViewStyle;
  quantityText?: TextStyle;
  textStylesAvailableQuantity?: TextStyle;
  wrapperQuantitySelector?: ViewStyle;
  wrapperAvailable?: ViewStyle;
  textStylesAvailableText?: ViewStyle;
  wrapperQuantitySelectorButtons?:ViewStyle
};

type Props = {
  product: Product;
  style?: string;
  IconLeft?: string;
  IconRight?: string;
  availableQuantityInfo?:boolean
};

type MachineCartConfig = {
  machineName: string;
  pointer?: string;
};

const machineConfig: MachineCartConfig = {
  machineName: 'cartManager',
};

const useCartMachine = (config: MachineCartConfig) => {
  const machines = useGlobalState();
  return machines[config.machineName];
};

const QuantitySelector: FC<Props> = ({product, style, availableQuantityInfo = false}) => {
  const QuantitySelectorStyles = useStyles(style) as QuantitySelectorStyleProps;
  const cart = useCartMachine(machineConfig);
  const {StateMachine} = useCommons();

  const [{value, context}] = cart.actor;

  const availableQuantity =
    product?.availableQuantity || 0;
  const isCurrentAdded = useMemo(() => {
    const foundIndex = context.products.findIndex(
      (pred: Product) => pred?.id === product?.id,
    );

    if (foundIndex != -1) {
      return true;
    }
    return false;
  }, [context.products]);

  const quantity = useMemo(() => {
    const foundIndex = context.products.find(pred => pred?.id === product?.id);

    if (foundIndex != -1) {
      return foundIndex?.quantity || '0';
    }
    return '0';
  }, [context.products]);

  //console.log('context.products', product.items[0].sellers[0].commertialOffer?.AvailableQuantity);

  //  console.log('styles', QuantitySelectorStyles);

  return (
    <>
      {isCurrentAdded && (
        <View
          style={[
            defaultStyles.container,
            QuantitySelectorStyles.containerQuantitySelector,
          ]}>
         { availableQuantityInfo &&  <View
            style={[
              defaultStyles.wrapperAvailable,
              QuantitySelectorStyles.wrapperAvailable,
            ]}>
            <Text
              style={[
                defaultStyles.textStylesAvailableText,
                QuantitySelectorStyles.textStylesAvailableText,
              ]}>
              {'Cantidad:'}
            </Text>
            <Text
              style={[
                defaultStyles.textStylesAvailableQuantity,
                QuantitySelectorStyles.textStylesAvailableQuantity,
              ]}>
              {`(${product?.availableQuantity} disponibles)`}
            </Text>
          </View>}
          <View
            style={[
              defaultStyles.wrapperQuantitySelector,
              QuantitySelectorStyles.wrapperQuantitySelector,
            ]}> 
             <View
            style={[
              defaultStyles.wrapperQuantitySelectorButtons,
              QuantitySelectorStyles.wrapperQuantitySelectorButtons,
            ]}> 
            <Button
              style={[
                defaultStyles.buttonStyle,
                QuantitySelectorStyles.buttonStyleQuantitySelector,
              ]}
              onPress={() => {
                StateMachine.send(machineConfig.machineName, 'DEC', {
                  product,
                });
              }}>
               
              <Text
                style={[
                  defaultStyles.textButton,
                  QuantitySelectorStyles.textButtonQuantitySelector,
                ]}>
                {'-'}
              </Text>
            </Button>
            </View>
            <Text
              style={[
                defaultStyles.quantityText,
                QuantitySelectorStyles.quantityText,
              ]}>
              {quantity || 0}
            </Text>
            <View
            style={[
              defaultStyles.wrapperQuantitySelectorButtons,
              QuantitySelectorStyles.wrapperQuantitySelectorButtons,
            ]}>
            <Button
              style={[
                defaultStyles.buttonStyle,
                QuantitySelectorStyles.buttonStyleQuantitySelector,
              ]}
              onPress={() => {
                StateMachine.send(machineConfig.machineName, 'INC', {
                  product,
                });
              }}>
              <Text
                style={[
                  defaultStyles.textButton,
                  QuantitySelectorStyles.textButtonQuantitySelector,
                ]}>
                {'+'}
              </Text>
            </Button>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default QuantitySelector;

const defaultStyles = StyleSheet.create({
  container: {
 
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonStyle: {
    //  backgroundColor: '#FFEEED',
    marginHorizontal: 10,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
 
    fontSize: 20,
    color: '#390052',
    fontWeight: '600',
    textAlign: 'center',
  },
  quantityText: {
  
    fontSize: 16,
    color: '#390052',
    textAlign: 'center',
  },

  textStylesAvailableText: {
    marginLeft: 10,
   
    fontSize: 16,
    color: '#390052',
    textAlign: 'center',
  },

  textStylesAvailableQuantity: {
    marginLeft: 10,
 
    fontSize: 16,
    color: '#390052',

    textAlign: 'center',
  },
  wrapperAvailable: {
    flexDirection: 'row',
  },
  wrapperQuantitySelector: {
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperQuantitySelectorButtons:{}
});
