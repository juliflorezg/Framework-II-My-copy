import React, { FC } from 'react'
import { View, Text,StyleSheet } from 'react-native';
import { Input as TextInput, TextInputProps } from '@my-app/ui';
import useChildren from '@my-app/app/src/framework/engine/hooks/useChildren';
import useStyles from '@my-app/app/src/framework/styleguide/hooks/useStyles';


const Material: FC<TextInputProps> = (props) => {
   

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

    return <View style={props.styles?.inputContainer}>
        {renderPlaceHolder()}
        <TextInput
            styles={props.styles?.input}
            isInvalid={props.isInvalid}
            onChangeText={props.onChangeText}
            value={props.value}
        />
    </View>
}

const defaultStyles = StyleSheet.create({
    placeholderComponent: {
      flexDirection: 'row'
    }
  })

export default Material