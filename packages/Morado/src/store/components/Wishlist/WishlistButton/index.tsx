import React, {FC, useMemo, useState} from 'react';
import {StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import {Button} from '@my-app/ui';
import useStyles from '@my-app/app/src/framework/styleguide/hooks/useStyles';
import {Product} from '../../../../utils/product';
import {useGlobalState} from '@my-app/app/src/framework/state-machine';
import {useCommons} from '@my-app/app/src/framework/omni-logic/kernel/utils/use-hook';
import {HeartWishlist} from '../../icons';

type WishlistStyleProps = {
  buttonStyle?: ViewStyle;
  textButton?: TextStyle;
};

type WishlistProps = {
  product: Product;
  style?: string;
  fillColor?: boolean;
};

type MachineCartConfig = {
  machineName: string;
  pointer: string;
};

const machineConfig: MachineCartConfig = {
  machineName: 'wishlistManager',
};

const useCartMachine = (config: MachineCartConfig) => {
  const machines = useGlobalState();
  return machines[config.machineName];
};

const WishlistButton: FC<WishlistProps> = ({
  product,
  style,
  fillColor = true,
  ...props
}) => {
  const wishlistStyles = useStyles(style) as WishlistStyleProps;
  const cart = useCartMachine(machineConfig);
  const {StateMachine} = useCommons();

  const [loading, setLoading] = useState(false);
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

  const handleWishlistChange = async () => {
    if (loading) return;

    setLoading(true);

    try {
      if (isCurrentAdded) {
        StateMachine.send(machineConfig.machineName, 'REMOVE', {
          product,
        });
      } else {
        StateMachine.send(machineConfig.machineName, 'ADD', {
          product,
        });
      }

      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const backgroundColor = isCurrentAdded ? '#390052' : 'transparent';
  const fill = fillColor ? backgroundColor : 'transparent';

  console.log('fill', fill);
  console.log('backgroundColor', backgroundColor);
  return (
    <>
      <Button
        style={[defaultStyles.buttonStyle]}
        onPress={handleWishlistChange}
        {...props}>
        <HeartWishlist color={'#390052'} fill={fill} />
      </Button>
    </>
  );
};

export default WishlistButton;

const defaultStyles = StyleSheet.create({
  container: {
    height: 24,
  },
  buttonStyle: {
    height: 24,
  },
  textButton: {},
});
