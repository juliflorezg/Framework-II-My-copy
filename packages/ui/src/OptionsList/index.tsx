import { BlockComponent } from "@my-app/app/src/framework/engine/types"
import useStyles from "@my-app/app/src/framework/styleguide/hooks/useStyles"
import React, { FC, memo, useCallback, useEffect, useState } from "react"
import OptionsList from "./Options"
import { OptionItem } from "./Options/type"
import { usePrevious } from '@my-app/app/src/framework/engine/utils/usePrevious'
import isEqual from "lodash.isequal"
export type OptionsListProps = {
    list: OptionItem[]
    multi: boolean
    styles?: any
    onChangeText?: (...event: any[]) => void;
}

const OptionsListComponent: FC<OptionsListProps> = ({ list,
    multi = false,
    styles: OptionListStyles,
    onChangeText }) => {

    const [selectedValue, setSelectedValue] = useState<string | number>("")
    const [multiSelected, setMultiSelected] = useState<(string | number)[]>([])


    const addValue = (value: string | number) => {
        const newVal = [...multiSelected, value]
        onChangeText(newVal)
        setMultiSelected(newVal)
    }

    const removeValue = (value: string | number) => {
        let cpy = [...multiSelected]
        const index = multiSelected.findIndex((pred) => pred === value)
        if (index !== -1) {
            cpy.splice(index, 1)
        }
        onChangeText(cpy)
        setMultiSelected(cpy)
    }

    const isItemSelected = (value: string | number) => {
        const index = multiSelected.findIndex((pred) => pred === value)
        if (index !== -1) {
            return true
        }
        return false
    }


    const isSelected = (value: string | number) => {
        if (multi) {
            return isItemSelected(value)
        }

        return selectedValue === value
    }

    const onPress = (value: string | number) => {
        if (multi) {
            if (isSelected(value)) removeValue(value)
            else addValue(value)
        } else {
            setSelectedValue(value)
            onChangeText(value)
        }
    }

    return <OptionsList
        list={list}
        listStyle={OptionListStyles?.listStyle}
        itemContainerStyle={OptionListStyles.itemContainer}
        itemContainerStyleSelected={OptionListStyles.itemContainerSelected}
        itemTitleStyle={OptionListStyles?.itemTitle}
        isSelectedStyle={OptionListStyles?.isSelectedStyle}
        itemDescriptionStyle={OptionListStyles?.itemDescription}
        circleSelected={OptionListStyles?.circleSelected}
        circle={OptionListStyles?.circle}
        onPress={onPress}
        isSelected={isSelected}
        selectedValue={selectedValue}
        multiSelected={multiSelected}
        circleCheck={OptionListStyles?.circleCheck}
    />
}

export default memo(OptionsListComponent, (prev, next) => isEqual(prev.value, next.value))