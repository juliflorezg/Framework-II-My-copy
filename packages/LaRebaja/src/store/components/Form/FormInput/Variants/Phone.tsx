import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icons } from "@my-app/ui";
import { Input as TextInput, TextInputProps } from '@my-app/ui'
import { useStyleguide } from '@my-app/app/src/framework/styleguide/context'
  ;
import useChildren from '@my-app/app/src/framework/engine/hooks/useChildren';
import useStyles from '@my-app/app/src/framework/styleguide/hooks/useStyles';
type PhoneNumberProps = {
  hideFlag: boolean
}  
const PhoneNumber: FC<TextInputProps & PhoneNumberProps> = props => {

  const {
    theme: { palette },
  } = useStyleguide();
  const InteractionStyle = props?.isInvalid
    ? { borderColor: palette.error.main }
    : !props?.isInvalid && props?.value
      ? { borderColor: palette.success.main }
      : null;
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

  return (
    <>
      {renderPlaceHolder()}
      <View style={[props.styles?.inputContainer, InteractionStyle]}>
        { !props.hideFlag ? <Text style={props.styles?.flag}>🇨🇴</Text> : null }
        <Text style={props.styles?.code}>+57</Text>
        { !props.hideFlag ? <Icons.ArrowDown />  : null }
        <TextInput
          styles={props.styles?.input}
          isInvalid={props.isInvalid}
          onChangeText={props.onChangeText}
          value={props.value}
          keyboardType={props?.keyboardType || 'phone-pad'}
        />
      </View>
    </>
  );
};


const defaultStyles = StyleSheet.create({
  placeholderComponent: {
    flexDirection: 'row'
  }
})

export default PhoneNumber;
