import React, {FC, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Input as TextInput, TextInputProps} from '@my-app/ui';
import {useStyleguide} from '@my-app/app/src/framework/styleguide/context';
import {Icons} from '@my-app/ui';
import {Check} from '@my-app/ui/src/icons';
import {Image} from '@my-app/ui/src';

const SelectInput: FC<TextInputProps> = ({
  styles,
  onChangeText,
  placeholder,
  selectedImg,
  unSelectedImg,
}) => {
  const [selected, setSelected] = useState(false);
  const {
    theme: {palette},
  } = useStyleguide();

  const onPress = (selection: boolean) => {
    setSelected(selection);
    onChangeText(selection);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          onPress(!selected);
        }}>
        <View
          style={[
            styles.itemContainerStyle,
            defaultStyles.itemContainerStyle,
            selected && styles.itemContainerStyleSelected,
            selected && defaultStyles.itemContainerStyleSelected,
          ]}>
          <View
            style={[
              defaultStyles.circle,
              styles.circle,
              selected && styles?.circleSelected,
            ]}>
            <View style={selected && defaultStyles.isSelected}>
              {selectedImg && unSelectedImg ? (
                selected ? (
                  <Image width={32} height={32} src={selectedImg} />
                ) : (
                  <Image width={32} height={32} src={unSelectedImg} />
                )
              ) : (
                selected && (
                  <Check stroke={styles.circleCheck?.stroke || '#000'} />
                )
              )}
            </View>
          </View>
          <View style={defaultStyles.descriptionContainer}>
            <Text style={[defaultStyles.itemTitleStyle,styles.itemTitleStyle]}>
              {placeholder}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};
 
export default SelectInput;
const defaultStyles = StyleSheet.create({
  descriptionContainer: {
    flex: 1,
  },
  circle: {
    borderRadius: 32,
    width: 32,
    height: 32,
    borderColor: '#E1E1E1',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  isSelected: {
    backgroundColor: '#25D366',
    borderRadius: 26,
    width: 26,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },

  itemContainerStyle: {
    flexDirection: 'row',
    borderColor: '#E1E1E1',
    borderWidth: 1,
    height: 56,
    paddingHorizontal: 10,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 10,
  },
  itemContainerStyleSelected: {
    backgroundColor: '#DEF8E8',
  },
  itemTitleStyle: {
    marginLeft: 10,
    color: '#1A1919',
    fontSize: 16,
    fontWeight: '300',
  },
});
