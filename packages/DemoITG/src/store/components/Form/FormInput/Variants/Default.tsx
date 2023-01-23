import React, { FC, useCallback, useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';

import {Input as TextInput, TextInputProps} from '@my-app/ui';
import { useStyleguide } from '@my-app/app/src/framework/styleguide/context';
import {Icons} from '@my-app/ui'

const defaultStyles = StyleSheet.create({
    withPasswordInput: {
        flex: 1
    },
    withPasswordInputContainerStyles: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    passwordEyeContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16
    }
})


const DefaultTextInput: FC<TextInputProps> = (props) => {
    const [isFocus, setIsFocus] = useState(false)
    const [showPassword, setPassword] = useState(props?.isPassword)
    const passwordToggle = () => setPassword((pred)=>!pred)
    const { theme: { palette } } = useStyleguide()

    const PasswordEyeComponent = useCallback(() => {
        if(!props?.isPassword) return null
        return <TouchableOpacity onPress={passwordToggle} style={defaultStyles.passwordEyeContainer}>
            {showPassword ? <Icons.Eye/> : <Icons.EyeCancelled/> }
        </TouchableOpacity>
    }, [showPassword, props?.isPassword])


    const WrapperStyles = useMemo(() => {
       let InteractionStyles = {};
   
       const errorStyles = {
         borderColor: palette.error.main,
       };
   
       const successStyles = {
         borderColor: palette.success.main,
       };
   
       const onFocusStyles = {
         borderColor: palette.primary.main,
       };
   
       if (props?.isInvalid) {
         InteractionStyles = Object.assign(InteractionStyles, errorStyles);
       } else if (isFocus) {
         if (!props?.isInvalid && props?.value) {
           InteractionStyles = Object.assign(InteractionStyles, successStyles);
         } else {
           InteractionStyles = Object.assign(InteractionStyles, onFocusStyles);
         }
       } else if (!props?.isInvalid && props?.value) {
         InteractionStyles = Object.assign(InteractionStyles, successStyles);
       }
   
       const stylesContainers: ViewStyle[] = [
         props.styles?.inputContainer,
         InteractionStyles,
       ];
   
       return stylesContainers;
     }, [props?.isInvalid, props?.value, isFocus]);

     const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setIsFocus(true);
        e.preventDefault()
      };
    
      const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setIsFocus(false);
        e.preventDefault()
      };

    return <View>
        <Text style={props.styles?.placeholder}>{props.placeholder}</Text>
        <View style={[WrapperStyles, defaultStyles.withPasswordInputContainerStyles]}>
            <TextInput
                styles={[props.styles?.input, defaultStyles.withPasswordInput]}
                isInvalid={props.isInvalid}
                showPassword={showPassword}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChangeText={props.onChangeText}
                value={props.value}
                placeholder={props.placeholderBox}
            />
            <PasswordEyeComponent />
        </View>
    </View>
}

export default DefaultTextInput