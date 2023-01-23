import React, {FC, useCallback, useMemo} from 'react';
import {ImageStyle, StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import {Button, Text} from '@my-app/ui';
import useStyles from '@my-app/app/src/framework/styleguide/hooks/useStyles';
import {useGlobalState} from '@my-app/app/src/framework/state-machine';
import {useCommons} from '@my-app/app/src/framework/omni-logic/kernel/utils/use-hook';
import {Product} from '../../../../utils/product';
import QuantityModes from './Views';
import {
  DefaultStyleProps,
  SimpleModeStyleProps,
  SlimModeStyleProps,
} from '../types';

type Props = {
  product: Product;
  style?: string;
  IconLeft?: string;
  IconRight?: string;
  availableQuantityInfo?: boolean;
  variant?: 'default' | 'simple' | 'slim';
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

const QuantitySelector: FC<Props> = ({
  product,
  style,
  availableQuantityInfo = false,
  variant = 'simple',
}) => {
  const QuantitySelectorStyles = useStyles(style) as
    | SimpleModeStyleProps
    | SlimModeStyleProps
    | DefaultStyleProps;
  const cart = useCartMachine(machineConfig);
  const {StateMachine} = useCommons();

  const [{value, context}] = cart.actor;

  // const availableQuantity = product?.availableQuantity || 0;

  const increment = () => {
    StateMachine.send(machineConfig.machineName, 'INC', {
      product,
    });
  };

  const decrement = () => {
    if (quantity <= '1') {
      StateMachine.send(machineConfig.machineName, 'REMOVE', {
        product,
      });
    } else {
      StateMachine.send(machineConfig.machineName, 'DEC', {
        product,
      });
    }
  };

  const quantity = useMemo(() => {
    const foundIndex = context.products.find(pred => pred?.id === product?.id);

    if (foundIndex != -1) {
      return foundIndex?.quantity || '0';
    }
    return '0';
  }, [context.products, increment, decrement, product]);

  const isCurrentAdded = useMemo(() => {
    const foundIndex = context.products.findIndex(
      (pred: Product) => pred?.id === product?.id,
    );

    if (foundIndex != -1) {
      return true;
    }
    return false;
  }, [context.products, quantity, product]);

  return (
    <>
      {isCurrentAdded &&
        QuantityModes[variant]({
          product,
          style: QuantitySelectorStyles,
          increment,
          decrement,
          quantity,
          availableQuantityInfo,
        })}
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
  wrapperQuantitySelectorButtons: {},
});
