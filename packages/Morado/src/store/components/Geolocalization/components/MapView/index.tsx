import { BlockComponent } from '@my-app/app/src/framework/engine/types';
import React, { FC, useEffect, useMemo, useState } from 'react'
import MapView, { Marker } from 'react-native-maps';
import { Dimensions } from 'react-native'
import useStyles from '@my-app/app/src/framework/styleguide/hooks/useStyles';
import { useCommons } from '@my-app/app/src/framework/omni-logic/kernel/utils/use-hook';
import { useGlobalState } from '@my-app/app/src/framework/state-machine';
import { GeoManagerMachineConfig } from '../../config';
import { useNavigation } from '@react-navigation/native';
const MapViewComponent: FC<any> = () => {
    const { height } = Dimensions.get("screen")
    const { StateMachine } = useCommons();
    const machines = useGlobalState();
    const navigation = useNavigation()
    const [{ context, value }] = machines[GeoManagerMachineConfig.machineName]?.actor;
    const [currentCoordinates, setCurrentCoordinates] = useState(context.map.currentCoordinates)

    const getData = () => {
        const machine = StateMachine.getData(GeoManagerMachineConfig.machineName);
        if (machine) {
            const { context } = machine;
            return context?.map?.currentCoordinates
        }
        return null
    }

    const map = useMemo(() => {
        return getData()
    }, [context])


    useEffect(() => {
        setCurrentCoordinates(map)
    }, [map])

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            const data = getData()
            setCurrentCoordinates(data)
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);
    
    console.log(value)

    return <MapView
        style={{
            minHeight: height / 2
        }}
        region={currentCoordinates}
        initialRegion={{
            latitude: currentCoordinates.latitude,
            longitude: currentCoordinates.longitude,
            longitudeDelta: currentCoordinates.longitudeDelta,
            latitudeDelta: currentCoordinates.latitudeDelta
        }}
    >
        {
            value === 'map-view' &&
            <Marker
                coordinate={{ latitude: currentCoordinates.latitude, longitude: currentCoordinates.longitude }}
                image={{ uri: 'https://moradoapp.vteximg.com.br/arquivos/location.png' }}
                title={"Mi dirección"}
            />
        }

    </MapView>
}

export default MapViewComponent