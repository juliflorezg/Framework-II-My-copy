import { useCommons } from '@my-app/app/src/framework/omni-logic/kernel/utils/use-hook';
import { useGlobalState } from '@my-app/app/src/framework/state-machine';
import useStyles from '@my-app/app/src/framework/styleguide/hooks/useStyles';
import React, { FC, useState } from 'react'
import { View, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native'
import { Product } from '../../../../utils/product';
import { ExitIcon } from '../../icons';

const MachineConfig = {
    machineName: 'wishlistManager',
    pointer: 'count',
};

interface StyleProps {
    removeButtonWrapper?:ViewStyle;
}

type RemoveButtonProps = {
    product: Product;
    style?: string;
    text?: string;
};

const RemoveWishlistButton: FC<RemoveButtonProps> = ({
    style,
    product
}) => {
    const { StateMachine } = useCommons();
    const removeButtonStyles = useStyles(style) as StyleProps;
    return (
    <TouchableOpacity style={[defaultStyles.removeButtonWrapper,removeButtonStyles?.removeButtonWrapper]} onPress={() => {
        StateMachine.send(MachineConfig.machineName, 'REMOVE', {
            product
        });
    }}>
        <ExitIcon />
    </TouchableOpacity>)
}

export default RemoveWishlistButton

const defaultStyles = StyleSheet.create({
    removeButtonWrapper: {
      position:"absolute",
      backgroundColor: "#F5F5F5",
      top:20,
      right:0,
      height:32,
      width:32,
      justifyContent:"center",
      alignItems:"center",
      borderRadius: 24,
    },
    
  });
  