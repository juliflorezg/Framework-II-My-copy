import React, { FC, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { Button, Text } from "@my-app/ui";
import { View } from "react-native";
import useStyles from "@my-app/app/src/framework/styleguide/hooks/useStyles";
import { BlockComponent } from "@my-app/app/src/framework/engine/types";
import { ButtonProps } from "../../Form/FormSubmit/types";
import { useStoreForm } from "../../Form/context";
import { useStepper } from "../context";

export const StepperSubmitButton: FC<BlockComponent<ButtonProps>> = ({ props: { buttonText, style } }) => {
    const { onSubmit, submitIsLoading } = useStoreForm();
    const {
        handleSubmit,
        getFieldState,
        getValues
    } = useFormContext();
    const {  nextPage } = useStepper()
    const ButtonStyles = useStyles(style)

    const onPress = handleSubmit((event) => {
        return onSubmit({
            ...event,
        })
    })

    const onSubmitStepper = useCallback(async (...args: any) => {
       await onPress(args)
       const fields = getValues()
       const fieldKeys = Object.keys(fields)
       const states = fieldKeys?.map((key)=>getFieldState(key))
       const errors = states?.filter((state)=>state?.error)
        const isSuccess = !errors.length
        if (isSuccess) {
            nextPage()
        }
    }, [])

    return (
        <View style={ButtonStyles?.wrapper}>
            <Button style={ButtonStyles?.button} onPress={onSubmitStepper}
                isLoading={submitIsLoading || false}
            >
                <Text style={ButtonStyles?.buttonText}>{buttonText}</Text>
            </Button>
        </View>

    );
}