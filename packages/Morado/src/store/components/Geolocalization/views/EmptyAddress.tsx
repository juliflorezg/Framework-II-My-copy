import { useCommons } from '@my-app/app/src/framework/omni-logic/kernel/utils/use-hook'
import { Image } from '@my-app/ui/src'
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import GPSCurrentLocation from '../components/GPSCurrentLocation'
import { GeoManagerMachineConfig } from '../config'

const EmptyAddress = () => {
    const {StateMachine} = useCommons();
    const onPress = () => {
        StateMachine.send(GeoManagerMachineConfig.machineName, "ADD-DELIVERY-ADDRESS")
    }
   
    return <View style={styles.container}>
        <Text style={styles.title}>
            Selecciona la dirección
            de entrega
        </Text>
        <Text style={styles.description}>
            Registra una dirección para la entrega
        </Text>
        
        <Image 
            width={200}
            height={300}
            src="https://moradoapp.vteximg.com.br/arquivos/location.png"
            style={{alignSelf:"center"}}
        />
        <GPSCurrentLocation />
        <TouchableOpacity onPress={onPress} style={styles.redirectWrap}>
            <Text style={styles.redirectText}>
                 Registrar nueva dirección
            </Text>
        </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%"
    },
    title: {
        fontFamily: 'Poppins-SemiBold',
        fontWeight: '600',
        fontSize: 24,
        lineHeight: 32,
        color: '#390052',
        marginBottom: 8
    },
    description: {
        fontFamily: 'Poppins-Light',
        fontWeight: '300',
        fontSize: 17,
        lineHeight: 26,
        color: '#1A1919'
    },
    redirectWrap: {
        marginTop: 32
    },
    redirectText:{
        fontFamily: 'Poppins-Light',
        fontWeight: '300',
        fontSize: 18,
        lineHeight: 27,
        textAlign: 'center',
        textDecorationLine: 'underline',
        color: '#390052',
    }
})

export default EmptyAddress