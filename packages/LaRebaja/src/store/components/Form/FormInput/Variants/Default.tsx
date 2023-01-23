import React, { FC, useCallback, useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';
import { Icons } from "@my-app/ui";
import { Input as TextInput, TextInputProps } from '@my-app/ui';
import { useStyleguide } from '@my-app/app/src/framework/styleguide/context';
import useChildren from '@my-app/app/src/framework/engine/hooks/useChildren';
import useStyles from '@my-app/app/src/framework/styleguide/hooks/useStyles';

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
  },
  placeholderComponent: {
    flexDirection: 'row',
  }
})


const DefaultTextInput: FC<TextInputProps> = (props) => {

  const [isFocus, setIsFocus] = useState(false)
  const [showPassword, setPassword] = useState(props?.isPassword)
  const passwordToggle = () => setPassword((pred) => !pred)
  const { theme: { palette } } = useStyleguide()

  const PasswordEyeComponent = useCallback(() => {
    if (!props?.isPassword) return null
    return <TouchableOpacity onPress={passwordToggle} style={defaultStyles.passwordEyeContainer}>
      {showPassword ? <Icons.Eye /> : <Icons.EyeCancelled />}
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

  const renderPlaceHolder = () => {
    const { placeholder, placeholderComponent } = props
    if (placeholder !== undefined) {
      return <Text style={props.styles?.placeholder}>{props.placeholder}</Text>
    }
    if (placeholderComponent?.children !== undefined) {
      const { children } = placeholderComponent
      const childrens = useChildren({ children });
      return (
        <View style={defaultStyles.placeholderComponent}>
          {childrens}
        </View>
      )
    }
  }


  return <View>
    {renderPlaceHolder()}
    <View style={[WrapperStyles, defaultStyles.withPasswordInputContainerStyles]}>
      <TextInput
        styles={[props.styles?.input, defaultStyles.withPasswordInput]}
        isInvalid={props.isInvalid}
        showPassword={showPassword}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={props.onChangeText}
        value={props.value}
      />
      <PasswordEyeComponent />
    </View>
  </View>
}

export default DefaultTextInput