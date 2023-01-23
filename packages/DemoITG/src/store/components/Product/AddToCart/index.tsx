import React, {FC, useMemo} from 'react';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {Button, Text} from '@my-app/ui';
import useStyles from '@my-app/app/src/framework/styleguide/hooks/useStyles';
import {Product} from '../../../../utils/product';
import {useGlobalState} from '@my-app/app/src/framework/state-machine';
import {useCommons} from '@my-app/app/src/framework/omni-logic/kernel/utils/use-hook';
import AddToCartModes from './Views';
type AddCartStyleProps = {
  buttonStyle?: ViewStyle;
  textButton?: TextStyle;
};

type AddToCartProps = {
  product: Product;
  style?: string;
  text?: string;
  variant?: 'default' | 'simple' | 'slim';
};

type MachineCartConfig = {
  machineName: string;
  pointer: string;
  machineNameProduct:string
};

const machineConfig: MachineCartConfig = {
  machineName: 'cartManager',
  machineNameProduct: 'productManager',
};

const useCartMachine = (config: MachineCartConfig) => {
  const machines = useGlobalState();
  return machines[config.machineName];
};

const useProductMachine = (config: MachineCartConfig) => {
  const machines = useGlobalState();
  return machines[config.machineNameProduct];
};

const AddToCartButton: FC<AddToCartProps> = ({
  product,
  style,
  text,
  variant = 'simple',
}) => {
  const addToCartStyles = useStyles(style) as AddCartStyleProps;
  const cart = useCartMachine(machineConfig);
  const {StateMachine} = useCommons();
  const productMachine = useProductMachine(machineConfig);
  const [{value, context}] = cart.actor;

  const [{context:productContext}] = productMachine.actor;

  const isCurrentAdded = useMemo(() => {
    const foundIndex = context.products.findIndex(
      pred => pred?.id === product?.id,
    );
    if (foundIndex != -1) {
      return true;
    }
    return false;
  }, [context.products, product]);

  const findProduct = () =>{
    const foundIndex = productContext.products.find(
      pred => pred?.id === product?.id,
    );
    
   return foundIndex?.selectedSku?.id || product?.id
  }

  const addToCart = () => {
    

    StateMachine.send(machineConfig.machineName, 'ADD', {
      product, variantId:findProduct()
    });
  }; 

  return (
    <>
      {!isCurrentAdded &&
        AddToCartModes[variant]({
          text,
          addToCart,
          product,
          style,
        })}
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
