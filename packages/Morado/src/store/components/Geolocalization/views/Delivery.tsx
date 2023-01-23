import { useExtension } from '@my-app/app/src/framework/engine/extension/context'
import { useCommons } from '@my-app/app/src/framework/omni-logic/kernel/utils/use-hook'
import CookieManager from '@my-app/app/src/framework/styleguide/utils/cookies'
import { Grid, Icons, Image, Link } from '@my-app/ui/src'
import { ArrowRightSecondVariant } from '@my-app/ui/src/icons'
import React, { useEffect, useMemo, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Picker } from 'react-native-ui-lib'
import Divider from '../../Divider'
import { CurrentLocation } from '../../icons'
import { useSharedValue } from '../../RichText'
import BackButton from '../components/BackButton'
import { GeoManagerMachineConfig } from '../config'
import { dataCountry } from './geo-data'



const AddDeliveryAddress = () => {
    const { StateMachine } = useCommons();
    const [selectedDepartment, setSelectedDepartment] = useState()
    const [selectedCity, setSelectedCity] = useState()
    const [selectedPostalCode, setSelectedPostalCode] = useState()
    const [revalidate, setRevalidate] = useState(false)
    const { hooks } = useExtension();
    const fn = hooks['useGenerateCart'];
    const [response, setResponse] = useState(null);
    console.log("Response", response && response['useGenerateCart'])
    const getData = async () => {
        if (typeof fn !== 'function') return;
        const res = await fn({
            hooks
        })
        setResponse(res)
    }

    useEffect(() => {
        getData()
    }, [])

    const onPress = async () => {
        StateMachine.send(GeoManagerMachineConfig.machineName, "ADD-NEW-ADDRESS", {
        })
    }

    const handler = (name: string, value: string) => {
        StateMachine.send(GeoManagerMachineConfig.machineName, "NEW-ADDRESS-HANDLER", {
            name,
            value
        })
        setRevalidate(true)
    }

    const departments = useMemo(() => Object.keys(dataCountry).map((department) => {
        return { value: department, label: department }
    }), [])

    const cities = useMemo(() => {
        if (!selectedDepartment) return []

        return Object.keys(dataCountry[selectedDepartment]).map((city) => ({ value: city, label: city }))
    }, [selectedDepartment])

    const values = {
        departments,
        cities
    }

    useEffect(() => {
        if (revalidate) {
            const data = StateMachine.getData(GeoManagerMachineConfig.machineName)

            if (data?.context['addAddressForm']['department']?.label) {
                setSelectedDepartment(data?.context['addAddressForm']['department'].label)
            }
            if (data?.context['addAddressForm']['city']?.label) {
                setSelectedCity(data?.context['addAddressForm']['city']?.label)
            }
            if (data?.context['addAddressForm']['department']?.label && data?.context['addAddressForm']['city']?.label) {
                setSelectedPostalCode(dataCountry[data?.context['addAddressForm']['department'].label][data?.context['addAddressForm']['city']?.label])
            }
            setRevalidate(false)
        }

    }, [revalidate])

    useEffect(() => {
        if (selectedPostalCode) handler("postalCode", selectedPostalCode)

    }, [selectedPostalCode])

    const renderPicker = (name: string, pointer: string) => {

        return <View style={{ position: "absolute", width: "100%" }}>
            <Picker
                showSearch={true}
                placeholderTextColor={"#390052"}
                onChange={items => handler(name, items)}
                mode={Picker.modes.SINGLE}
                migrateTextField
            >
                {values[pointer].map(option => {
                    return (
                        <Picker.Item key={option.value} value={option.value} label={option.label} disabled={option.disabled} />
                    )
                })}
            </Picker>
        </View>
    }

    return <View style={styles.container}>
        <View>
            <BackButton action='EMPTY-ADDRESS' />
            <Text style={styles.title}>
                Entrega a domicilio
            </Text>
            <Text style={styles.description}>
                Ingresa tu departamento y ciudad
            </Text>
        </View>
        <Image
            width={63}
            height={48}
            src={"https://moradoapp.vteximg.com.br/arquivos/flag-co.png"}
        />


        <TouchableOpacity style={styles.callToActionWrap}>
            {renderPicker("department", "departments")}
            <Grid container={true} direction={"row"} justifyContent="space-between">
                <Text style={styles.callToActionText}>
                    {selectedDepartment ? selectedDepartment : "Departamento"}
                </Text>
                <View style={styles.iconWrapper}>
                    <ArrowRightSecondVariant stroke={"#fff"} />
                </View>
            </Grid>
        </TouchableOpacity>
        <TouchableOpacity style={styles.callToActionWrap}>
            {renderPicker("city", "cities")}
            <Grid container={true} direction={"row"} justifyContent="space-between">
                <Text style={styles.callToActionText}>
                    {selectedCity ? selectedCity : "Ciudad"}
                </Text>
                <View style={styles.iconWrapper}>
                    <ArrowRightSecondVariant stroke={"#fff"} />
                </View>

            </Grid>
        </TouchableOpacity>

        <View
            style={[{
                width: '100%',
                height: 0.5,
                backgroundColor: "#000",
                opacity: 0.5
            }]}
        />
        <TouchableOpacity onPress={onPress} style={styles.redirectWrap}>
            <CurrentLocation />
            <Text style={styles.redirectText}>
                Buscar dirección en mapa
            </Text>
        </TouchableOpacity>
        <View>

            <TouchableOpacity onPress={onPress} style={styles.continueWrap}>
                <Text style={styles.continueText}>
                    Continuar
                </Text>
            </TouchableOpacity>
        </View>
    </View >
}


const styles = StyleSheet.create({
    callToActionText: {
        fontFamily: 'Poppins-Light',
        fontSize: 17,
        lineHeight: 19,
        color: '#390052',
    },
    callToActionWrap: {
        borderRadius: 32,
        borderWidth: 1,
        height: 50,
        borderColor: "#E1E1E1",
        padding: 16,
        marginVertical: 16
    },
    container: {
        flex: 1,
        width: "100%",
        justifyContent: "space-between"
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
        color: '#1A1919',
        marginBottom: 12
    },
    continueText: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 18,
        lineHeight: 27,
        textAlign: 'center',
        color: '#fff',
    },
    continueWrap: {
        marginTop: 32,
        backgroundColor: "#AA26C6",
        paddingVertical: 12,
        borderRadius: 100
    },
    redirectWrap: {
        marginTop: 32,
        backgroundColor: "#F96F88",
        paddingVertical: 12,
        borderRadius: 100,
        flexDirection: "row",
        justifyContent: "center"
    },
    redirectText: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 18,
        lineHeight: 27,
        textAlign: 'center',
        color: '#fff',
        marginLeft: 8
    },
    iconWrapper: {
        "backgroundColor": "#390052",
        "width": 20,
        "height": 20,
        "justifyContent": "center",
        "alignItems": "center",
        "borderRadius": 30
    }
})

export default AddDeliveryAddress