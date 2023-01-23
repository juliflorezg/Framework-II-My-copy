import React, {FC, useCallback, useEffect, useState} from 'react';
import {BlockComponent} from '@my-app/app/src/framework/engine/types';
import {View, Text, StyleSheet, ViewStyle, TextStyle} from 'react-native';
import {useCommons} from '@my-app/app/src/framework/omni-logic/kernel/utils/use-hook';
import {TouchableOpacity} from 'react-native-ui-lib';
import {useGlobalState} from '@my-app/app/src/framework/state-machine';
import {BagIcon} from '../../icons';
import useStyles from '@my-app/app/src/framework/styleguide/hooks/useStyles';
import {
  useLinkTo
} from '@react-navigation/native';
import {useAuth} from '@my-app/app/src/framework/engine/render';
import {useUI} from '@my-app/app/src/framework/ui-action-handler';
import useChildren from '@my-app/app/src/framework/engine/hooks/useChildren';

const MachineConfig = {
  machineName: 'cartManager',
  pointer: 'count',
};

interface CartBadgeProps {
  style?: string;
}

interface StyleProps {
  cartBadge?: ViewStyle;
  wrapper?: ViewStyle;
  textStyles?: TextStyle;
}
const CartBadge: FC<BlockComponent<CartBadgeProps>> = ({
  props: {style},
  children,
}) => {
  const {StateMachine} = useCommons();
  const [totalCartItems, setTotalCartItems] = useState(0);
  const machines = useGlobalState();
  const cartBadgeStyles = useStyles(style) as StyleProps;
  const [{context}] = machines[MachineConfig.machineName]?.actor;
  const {openModal} = useUI();
  const isAuth = useAuth({
    machineName: 'authentication',
    pointer: 'authorized',
  });

  const childrens = useChildren({children});

  const openAction = () => {
    openModal({
      content: childrens,
    });
  };

  useEffect(() => {
    const machine = StateMachine.getData(MachineConfig.machineName);
    if (machine) {
      const {context} = machine;
      setTotalCartItems(context[MachineConfig.pointer]);
    }
  }, [context[MachineConfig.pointer]]);

  const linkTo = useLinkTo();
  return (
    <>
      {isAuth ? (
        <TouchableOpacity
          style={[
            cartBadgeStyles.cartBadge,
            totalCartItems > 0 && {backgroundColor: '#AA26C6'},
          ]}
          onPress={() => {
            linkTo('/cart');
          }}>
          <View style={[cartBadgeStyles.wrapper, defaultStyles.wrapper]}>
            <BagIcon color={totalCartItems > 0 ? '#fff' : '#000'} />
            {totalCartItems > 0 && (
              <Text
                style={[cartBadgeStyles.textStyles, defaultStyles.textStyles]}>
                {totalCartItems}
              </Text>
            )}
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[
            cartBadgeStyles.cartBadge,
            totalCartItems > 0 && {backgroundColor: '#AA26C6'},
          ]}
          onPress={() => openAction()}>
          <View
            style={[cartBadgeStyles.wrapper, defaultStyles.wrapperTextSignIn]}>
            <Text
              style={[cartBadgeStyles.textStyles, defaultStyles.textStyles]}>
              {'Iniciar sesión'}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

export default CartBadge;

const defaultStyles = StyleSheet.create({
  wrapperTextSignIn: {
    width: 100,
    marginRight: 40,
  },
  textStyles: {
    color: '#390052',
    textDecorationLine: 'underline',
  },
  wrapper: {},
});
