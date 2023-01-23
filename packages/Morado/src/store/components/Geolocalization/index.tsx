import { BlockComponent } from '@my-app/app/src/framework/engine/types';
import React, { FC, useEffect, useMemo } from 'react'
import MapView from 'react-native-maps';
import { Dimensions } from 'react-native'
import MapViewComponent from './components/MapView';
import { GeolocalizationActionSheet } from './components/ActionSheet';
import Views from './views'
import useStyles from '@my-app/app/src/framework/styleguide/hooks/useStyles';
import { useCommons } from '@my-app/app/src/framework/omni-logic/kernel/utils/use-hook';
import { useGlobalState } from '@my-app/app/src/framework/state-machine';
import { GeoManagerMachineConfig } from './config';

const GeolocalizationWithMap: FC<BlockComponent<any>> = (props) => {
    const style = props?.style
    const CustomStyles = useStyles(style);
    const { height } = Dimensions.get("screen")
    const {StateMachine} = useCommons();
    const machines = useGlobalState();
    const [{context}] = machines[GeoManagerMachineConfig.machineName]?.actor;

    const SelectedView = useMemo(()=> {
        const machine = StateMachine.getData(GeoManagerMachineConfig.machineName);
        if (machine) {
          const {context} = machine;
          const selectedView = context[GeoManagerMachineConfig.pointer]
          return Views[selectedView]
        }
        return null
    }, [context[GeoManagerMachineConfig.pointer]])


    return <>
        <MapViewComponent />
        <GeolocalizationActionSheet>
            <SelectedView />
        </GeolocalizationActionSheet>
    </>
}

export default GeolocalizationWithMap