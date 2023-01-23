import { useCommons } from '@my-app/app/src/framework/omni-logic/kernel/utils/use-hook';
import { useGlobalState } from '@my-app/app/src/framework/state-machine';
import useStyles from '@my-app/app/src/framework/styleguide/hooks/useStyles';
import React, { FC, useState } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { Product } from '../../../../utils/product';
import { ExitIcon } from '../../icons';

const MachineConfig = {
    machineName: 'cartManager',
    pointer: 'count',
};


type RemoveButtonProps = {
    product: Product;
    style?: string;
    text?: string;
};

const RemoveButton: FC<RemoveButtonProps> = ({
    style,
    product
}) => {
    const { StateMachine } = useCommons();
    const removeButtonStyles = useStyles(style);
    return (
    <TouchableOpacity style={removeButtonStyles?.removeButtonWrapper} onPress={() => {
        StateMachine.send(MachineConfig.machineName, 'REMOVE', {
            product
        });
    }}>
        <ExitIcon />
    </TouchableOpacity>)
}

export default RemoveButton