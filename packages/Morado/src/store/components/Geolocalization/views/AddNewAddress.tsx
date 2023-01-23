import { useExtension } from "@my-app/app/src/framework/engine/extension/context"
import useChildren from "@my-app/app/src/framework/engine/hooks/useChildren"
import { useGlobalState } from "@my-app/app/src/framework/state-machine"
import React, { FC } from "react"
import { View, StyleSheet, Text, Dimensions } from "react-native"
import BackButton from "../components/BackButton"
import { GeoManagerMachineConfig } from "../config"


const tmpVar1 = {
    "children": [
        {
            "componentName": "store-form",
            "props": {
                "context": "useUpdateOrderFormShipping",
                "mode": "onChange",
                "parseInput": {
                    "to": {
                       "street": "address",
                       "receiverName": "receiver",
                       "reference": "comment"
                    }
                },
                "schemaValidation": [
                    {
                        "id": "address",
                        "type": "text",
                        "validationType": "string",
                        "validations": [
                            {
                                "type": "required",
                                "params": ["El correo electrónico es requerido"]
                            }
                        ]
                    },
                    {
                        "id": "comment",
                        "type": "text",
                        "validationType": "string",
                        "validations": [
                            {
                                "type": "required",
                                "params": ["El correo electrónico es requerido"]
                            }
                        ]
                    },
                    {
                        "id": "receiver",
                        "type": "text",
                        "validationType": "string",
                        "validations": [
                            {
                                "type": "required",
                                "params": ["El correo electrónico es requerido"]
                            }
                        ]
                    },
                    

                ],
                "style": "add-new-address"
            },
            "children": [
                {
                    "componentName": "grid",
                    "props": {
                        "container": true,
                        "mode": "scroll-view"
                    },
                    "children": [
                        {
                            "componentName": "store-form.input",
                            "props": {
                                "name": "address",
                                "placeholder": "Dirección*",
                                "style": "form-input-default"
                            }
                        },
                        {
                            "componentName": "store-form.input",
                            "props": {
                                "name": "receiver",
                                "placeholder": "Destinatario*",
                                "style": "form-input-default"
                            }
                        },
                        {
                            "componentName": "store-form.input",
                            "props": {
                                "name": "comment",
                                "placeholder": "¿Quieres dejar una observación?*",
                                "style": "form-input-default"
                            }
                        }
                    ]
                },
                {
                    "componentName": "store-form.submit",
                    "props": {
                        "buttonText": "Continuar",
                        "style": "submit-button"
                    }
                }
            ]
        }
    ]
}

const tmpVar2 = {
    "children": [
        {
            "componentName": "store-form",
            "props": {
                "context": "useUpdateOrderFormShipping",
                "mode": "onChange",
                "parseInput": {
                    "to": {
                       "receiverName": "receiver",
                       "reference": "comment"
                    }
                },
                "schemaValidation": [
                    {
                        "id": "comment",
                        "type": "text",
                        "validationType": "string",
                        "validations": [
                            {
                                "type": "required",
                                "params": ["El correo electrónico es requerido"]
                            }
                        ]
                    },
                    {
                        "id": "receiver",
                        "type": "text",
                        "validationType": "string",
                        "validations": [
                            {
                                "type": "required",
                                "params": ["El correo electrónico es requerido"]
                            }
                        ]
                    },
                    

                ],
                "style": "add-new-address"
            },
            "children": [
                {
                    "componentName": "grid",
                    "props": {
                        "container": true,
                        "mode": "scroll-view"
                    },
                    "children": [
                        {
                            "componentName": "store-form.input",
                            "props": {
                                "name": "receiver",
                                "placeholder": "Destinatario*",
                                "style": "form-input-default"
                            }
                        },
                        {
                            "componentName": "store-form.input",
                            "props": {
                                "name": "comment",
                                "placeholder": "¿Quieres dejar una observación?*",
                                "style": "form-input-default"
                            }
                        }
                    ]
                },
                {
                    "componentName": "store-form.submit",
                    "props": {
                        "buttonText": "Continuar",
                        "style": "submit-button"
                    }
                }
            ]
        }
    ]
}

const AddNewaddress: FC = () => {
    const machines = useGlobalState();
    const [{value, context}] = machines[GeoManagerMachineConfig.machineName]?.actor;

    const deliveryFormCompletionChildrens = useChildren(tmpVar1)
    const mapSearchCompletionChildrens = useChildren(tmpVar2)

    const _renderTitleText = () => {
        if (value === 'map-view') {
            return "Confirma tu dirección"
        }
        return "Solo falta un paso"
    }

    const _renderDescriptionText = () => {
        if (value === 'map-view') {
            return context.addAddressForm.formatted
        }
        return "Confirma tus datos"
    }

    return (
        <>
            <View style={styles.container}>
                <BackButton action="ADD-DELIVERY-ADDRESS"/>
                <Text style={styles.title}>
                    {_renderTitleText()}
                </Text>
                <Text style={styles.description}>
                    {_renderDescriptionText()}
                </Text>
                {
                    value === 'map-view' ?
                        mapSearchCompletionChildrens
                        :
                        deliveryFormCompletionChildrens
                }
            </View>
        </>
    )
}

export default AddNewaddress

const { height } = Dimensions.get("screen")

const styles = StyleSheet.create({
    container: {
        height: height * 0.45,
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
})