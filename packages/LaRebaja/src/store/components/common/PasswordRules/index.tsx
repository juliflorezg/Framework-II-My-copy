import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useFormContext } from 'react-hook-form'
import { useStoreForm } from '../../Form/context'
import {  getParams } from '../../Form/utils/buildSchemaValidation'
import * as yup from 'yup'
import { Icons } from "@my-app/ui";

const PasswordRules = () => {
    const { getValues } = useFormContext()

    const form = useStoreForm()
    const fieldKey = 'password'
    let schema = form?.schemaValidation?.find((pred) => pred.id === fieldKey)
    const validationsType = schema?.validationType
    const id = schema?.id

    const Valid = () => {
        return <View style={[defaultStyles.wrap, defaultStyles.circle]}>
            <View style={defaultStyles.isSelected}>
                <Icons.Check height={14} stroke={"#fff"} />
            </View>
        </View>
    }
    
    const Invalid = () => {
        return <View style={defaultStyles.wrap}>
            <Icons.ExclamationIcon height={14} />
        </View>
    }

    const parsed = schema?.validations?.map((validation, index) => {
        let validator = yup[validationsType]();
        const { params, type } = validation;
        if (!validator[type]) {
            return;
        }
        validator = validator[type](...getParams(params, type));
        const toValidate = yup.object({ [id]: validator })
        const field = getValues()
        let result = false
        let text = ""
        if (type === 'required') {
            text = validation.params[0]
        } else {
            text = validation.params[1]
        }

        if (fieldKey in field) {
            const fieldValue = field[fieldKey]
            if(typeof fieldValue !== 'undefined'){
                result = toValidate.isValidSync({ [fieldKey]: fieldValue })
            }
     
        }

        return <View key={index} style={defaultStyles.container}>
            { result ? <Valid /> : <Invalid/>}
            <Text style={defaultStyles.text}>{text}</Text>
        </View>
    })

    return parsed
}

const defaultStyles = StyleSheet.create({
    circle: {
        borderRadius: 32,
        borderColor: "#E1E1E1",
        borderWidth: 1
    },
    isSelected: {
        backgroundColor: "#25D366",
        borderRadius: 18,
        width: 18,
        height: 18,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontSize: 16,
        color: '#B3B3B3',
        flex: 1,
        marginLeft: 8
    },
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginVertical: 4,
        justifyContent:"center",
        alignItems: "center"
    },
    wrap: {
        width: 18,
        height: 18,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal:4
    }
})

export default PasswordRules