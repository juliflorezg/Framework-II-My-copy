import { MapPin } from '@my-app/ui/src/icons'
import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

const GPSCurrentLocation = () => {
    return <TouchableOpacity style={styles.wrapper}>
        <MapPin color={"#F96F88"} />
        <Text style={styles.buttonText}>
            Ubicación actual
        </Text>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    buttonText: {
        textAlign: "center",
        fontFamily: 'Poppins-SemiBold',
        fontWeight: "600",
        fontSize: 18,
        lineHeight: 27,
        color: "#F96F88",
        marginLeft: 12
    },
    wrapper: {
        borderWidth: 1,
        borderRadius: 100,
        borderColor: "#F96F88",
        paddingVertical: 8,
        justifyContent:"center",
        flexDirection:"row"
    }
})

export default GPSCurrentLocation