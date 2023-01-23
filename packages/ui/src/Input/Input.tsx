/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useStyleguide } from '@my-app/app/src/framework/styleguide/context';
import React, { FC, memo, useMemo, useState } from 'react';
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInput as RNTextInput,
  TextInputFocusEventData,
  ViewStyle,
  StyleSheet
} from 'react-native';
import { TextInputProps } from './types';
import isEqual from 'lodash.isequal'

const TextInput: FC<TextInputProps> = ({
  showPassword = false,
  placeholder,
  placeholderTextColor,
  onChange,
  onChangeText,
  isInvalid,
  value,
  styles,
  onBlur,
  onFocus,
  onSubmitEditing,
  keyboardType,
  maxLength,
  editable = true,
  componentRef
}) => {
  return (
    <RNTextInput
      ref={componentRef}
      style={[
        styles
      ]}
      secureTextEntry={showPassword}
      onChangeText={onChangeText}
      onChange={onChange}
      value={value}
      onFocus={onFocus}
      onBlur={onBlur}
      editable={editable}
      keyboardType={keyboardType as KeyboardTypeOptions}
      onSubmitEditing={onSubmitEditing}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      maxLength={maxLength}
    />
  );
};

export default memo(TextInput, isEqual);
