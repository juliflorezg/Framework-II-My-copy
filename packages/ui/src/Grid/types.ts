import { FlexAlignType, ViewStyle } from "react-native"

export type GridType = {
    container?: boolean
    children?: React.ReactNode
    direction?: ViewStyle["flexDirection"]
    justifyContent?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly" | undefined
    alignItems?: FlexAlignType
    flex?: number
    mode?: "scroll-view" | "view"
    styles?: any
    showsVerticalScrollIndicator?: boolean
    showsHorizontalScrollIndicator?: boolean
    horizontal?:boolean
}