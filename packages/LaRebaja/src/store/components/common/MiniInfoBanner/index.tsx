import useChildren from '@my-app/app/src/framework/engine/hooks/useChildren'
import { BlockComponent } from '@my-app/app/src/framework/engine/types'
import React, { FC, useState } from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import { ExitIcon } from '../../icons'
const MiniInfoBanner: FC<BlockComponent<any>> = ({ children }) => {

    const [active, setActive] = useState(true)
    const childrens = useChildren({ children })
    const onClose = () => {
        setActive(false)
    }

    const onPress = () => {
        onClose()
    }


    if (!active) return null
    return <View style={defaultStyles.container}>
        {childrens}
        <TouchableOpacity style={defaultStyles.exitButton} onPress={onPress}>
            <ExitIcon />
        </TouchableOpacity>
    </View>
}

const defaultStyles = {
    container: {
        flexDirection: "row",
        backgroundColor: "#390052",
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 8
    },
    exitButton: {
        borderRadius: 32,
        backgroundColor: "#fff",
        width: 24,
        height: 24,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16
    }
}

export default MiniInfoBanner