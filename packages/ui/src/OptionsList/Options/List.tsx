import { BlockComponent } from '@my-app/app/src/framework/engine/types'
import { makeid } from '@my-app/app/src/framework/engine/utils/randomKey'
import React, { FC, useMemo, useState } from 'react'
import { ScrollView, View } from 'react-native'
import OptionItem from './Item'
import { OptionListProps } from './type'

const OptionList: FC<OptionListProps> = ({ list = [], listStyle, itemTitleStyle, itemDescriptionStyle, itemContainerStyleSelected, circleSelected,itemContainerStyle, circle, circleCheck, onPress, isSelected, multiSelected, selectedValue,isSelectedStyle }) => {
    return <View style={[ { flex: 1}, listStyle]}>
        <ScrollView>
            {list.map((item) =>
                <OptionItem
                    styles={{
                        itemContainerStyle,
                        itemContainerStyleSelected,
                        itemTitleStyle,
                        circleSelected,
                        circle,
                        circleCheck,
                        itemDescriptionStyle,
                        isSelectedStyle
                    }}
                    key={makeid(4)}
                    title={item.title}
                    description={item.description}
                    value={item.value}
                    multiSelected={multiSelected}
                    selectedValue={selectedValue}
                    isSelected={isSelected}
                    onPress={onPress}
                    children={item?.children}
                />)}
        </ScrollView>
    </View>
}

export default OptionList