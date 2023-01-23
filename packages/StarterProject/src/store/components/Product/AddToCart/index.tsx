import React, {FC, useMemo} from 'react';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {Button, Text} from '@my-app/ui';
import useStyles from '@my-app/app/src/framework/styleguide/hooks/useStyles';
import {Product} from '../../../../utils/product';
import {useGlobalState} from '@my-app/app/src/framework/state-machine';
import {useCommons} from '@my-app/app/src/framework/omni-logic/kernel/utils/use-hook';

type AddCartStyleProps = {
  buttonStyle?: ViewStyle;
  textButton?: TextStyle;
};

type AddToCartProps = {
  product: Product;
  style?: string;
  text?: string;
};

type MachineCartConfig = {
  machineName: string;
  pointer: string;
};

const machineConfig: MachineCartConfig = {
  machineName: 'cartManager',
};

const useCartMachine = (config: MachineCartConfig) => {
  const machines = useGlobalState();
  return machines[config.machineName];
};

const AddToCartButton: FC<AddToCartProps> = ({product, style, text}) => {
  const addToCartStyles = useStyles(style) as AddCartStyleProps;
  const cart = useCartMachine(machineConfig);
  const {StateMachine} = useCommons();

  const [{value, context}] = cart.actor;
  const isCurrentAdded = useMemo(() => {
    const foundIndex = context.products.findIndex(
      pred => pred?.id === product?.id,
    );
    if (foundIndex != -1) {
      return true;
    }
    return false;
  }, [context.products]);

  return (
    <>
      {!isCurrentAdded && (
        <Button
          style={[defaultStyles.buttonStyle, addToCartStyles.buttonStyle]}
          onPress={() => {
            StateMachine.send(machineConfig.machineName, 'ADD', {
              product,
            });
          }}>
          <Text style={[defaultStyles.textButton, addToCartStyles.textButton]}>
            {text ? text : 'Agregar'}
          </Text>
        </Button>
      )}
    </>
  );
};

export default AddToCartButton;

const defaultStyles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: '#FFEEED',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#F96F88',
    fontWeight: '600',
    textAlign: 'center',
  },
});
