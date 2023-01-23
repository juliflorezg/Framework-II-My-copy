import React, {FC, useEffect, useState} from 'react';
import {BlockComponent} from '@my-app/app/src/framework/engine/types';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from 'react-native';
import {useCommons} from '@my-app/app/src/framework/omni-logic/kernel/utils/use-hook';
import {TouchableOpacity} from 'react-native-ui-lib';
import {useGlobalState} from '@my-app/app/src/framework/state-machine';
import { ExitIcon} from '../../icons';
import useStyles from '@my-app/app/src/framework/styleguide/hooks/useStyles';
import {Image} from '@my-app/ui';
const MachineConfig = {
  machineName: 'cartManager',
  pointer: 'count',
  pointerNotification: 'notificationCart',
};

interface CartBadgeProps {
  uri?: string;
  style?: string;
}

interface StyleProps {
  cartNotificationContainer?: ViewStyle;
  cartNotificationWrapper?: ViewStyle;
  imageCartNotificationContainer?: ViewStyle;
  cartNotificationWrapperText?: ViewStyle;
  cartNotificationTitle?: TextStyle;
  cartNotificationDescription?: TextStyle;
  cartNotificationRemoveButtonWrapper?: ViewStyle;
  cartNotificationImage?: ImageStyle;
}

const NotificationCart: FC<BlockComponent<CartBadgeProps>> = ({
  props: {style, uri},
}) => {
  const {StateMachine} = useCommons();
  const [totalCartItems, setTotalCartItems] = useState(0);
  const machines = useGlobalState();
  const notificationCartStyles = useStyles(style) as StyleProps;
  const [{context}] = machines[MachineConfig.machineName]?.actor;
  const [confirmationCartModal, setConfirmationCartModal] = useState(false);

  useEffect(() => {
    const machine = StateMachine.getData(MachineConfig.machineName);
    if (machine) {
      const {context} = machine;
      setTotalCartItems(context[MachineConfig.pointer]);
    }

    setConfirmationCartModal(context[MachineConfig.pointerNotification]);
  }, [
    context[MachineConfig.pointer],
    context[MachineConfig.pointerNotification],
  ]);

  console.log('notificationCartStyles', notificationCartStyles);

  return (
    <>
      {confirmationCartModal && (
        <View
          style={[
            defaultStyles.cartNotificationContainer,
            notificationCartStyles?.cartNotificationContainer,
          ]}>
          <View
            style={[
              defaultStyles.cartNotificationWrapper,
              notificationCartStyles?.cartNotificationWrapper,
            ]}>
            <View
              style={[
                defaultStyles.imageContainer,
                notificationCartStyles.imageCartNotificationContainer,
              ]}>
              <Image
                style={[
                  defaultStyles.image,
                  notificationCartStyles?.cartNotificationImage,
                ]}
                src={
                  uri ||
                  'https://moradoapp.vteximg.com.br/arquivos/bag-shop.png'
                }
                height={56}
                width={60}
              />
            </View>
            <View
              style={[
                defaultStyles.cartNotificationWrapperText,
                notificationCartStyles?.cartNotificationWrapperText,
              ]}>
              <Text
                style={[
                  defaultStyles.cartNotificationTitle,
                  notificationCartStyles?.cartNotificationTitle,
                ]}>
                {' '}
                {`Agregaste ${totalCartItems} productos`}{' '}
              </Text>
              <Text
                style={[
                  defaultStyles.cartNotificationDescription,
                  notificationCartStyles?.cartNotificationDescription,
                ]}>
                {' '}
                {`Presiona este banner para ver el detalle de tu compra`}{' '}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={[
              defaultStyles.removeButtonWrapper,
              notificationCartStyles?.cartNotificationRemoveButtonWrapper,
            ]}
            onPress={() =>
              StateMachine.send(
                MachineConfig.machineName,
                'NOTIFICATION',
                false,
              )
            }>
            <ExitIcon />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default NotificationCart;

const defaultStyles = StyleSheet.create({
  cartNotificationContainer: {
    height: 56,
    backgroundColor: '#FFEEED',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cartNotificationWrapper: {
    flexDirection: 'row',
    marginHorizontal: 20,
    alignContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {},
  image: {},
  cartNotificationTitle: {
    fontSize: 13,
    color: '#AA26C6',

    fontWeight: '600',
    marginLeft: 10,
  },
  cartNotificationWrapperText: {
    maxWidth: 180,
  },
  cartNotificationDescription: {
    fontSize: 12,
    color: '#390052',

    fontWeight: '300',
    marginLeft: 10,
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
});
