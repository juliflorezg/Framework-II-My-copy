import React, { FC, useMemo } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { GridType } from './types'

const Grid: FC<GridType> = ({
  children,
  container,
  direction,
  flex,
  justifyContent,
  alignItems,
  mode = 'view',
  styles,
  showsVerticalScrollIndicator = false,
  showsHorizontalScrollIndicator = false,
  horizontal,
}) => {
  const containerStyles = useMemo(() => {
    let cStyles = {
      flexDirection: direction,
      justifyContent,
      alignItems,
      ...defaultStyles.gridContainer,
    }

    if (styles?.gridContainer) {
      cStyles = {
        ...cStyles,
        ...styles?.gridContainer,
      }
    }
    return cStyles
  }, [
    direction,
    justifyContent,
    alignItems,
    defaultStyles.gridContainer,
    styles,
  ])

  const itemStyles = useMemo(() => {
    let iStyles = {
      justifyContent,
      alignItems,
      flex,
      ...defaultStyles.gridItem,
    }
    if (styles?.gridItem) {
      iStyles = {
        ...iStyles,
        ...styles?.gridItem,
      }
    }
    return iStyles
  }, [justifyContent, alignItems, flex, defaultStyles.gridItem, styles])

  if (mode === 'scroll-view') {
    return (
      <View style={containerStyles}>
        <ScrollView
          style={styles?.scrollViewStyles}
          contentContainerStyle={styles?.scrollContentContainerStyle}
          showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
          showsVerticalScrollIndicator={showsVerticalScrollIndicator}
          horizontal={horizontal}
        >
          {children}
        </ScrollView>
      </View>
    )
  } else {
    return (
      <View style={container ? containerStyles : itemStyles}>{children}</View>
    )
  }
}

const defaultStyles = StyleSheet.create({
  gridContainer: {
    flex: 1,
  },
  gridItem: {},
})

export default Grid
