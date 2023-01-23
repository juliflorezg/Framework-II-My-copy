import React, { FC } from 'react'
import { useCommons } from '@my-app/app/src/framework/omni-logic/kernel/utils/use-hook';
import { TouchableOpacity, View } from 'react-native'
import { ArrowLeft } from '@my-app/ui/src/icons';
import { GeoManagerMachineConfig } from '../../config';

interface BackButtonProps {
    action: string
}

const BackButton:FC<BackButtonProps> = ({
    action
}) => {
    const {StateMachine} = useCommons();
    
    const onPress = () => {
        StateMachine.send(GeoManagerMachineConfig.machineName, action)
    }

    return (
        <TouchableOpacity onPress={onPress}>
            <ArrowLeft width={30} height={30}  color="#000"/>
        </TouchableOpacity>
    )
}

export default BackButton