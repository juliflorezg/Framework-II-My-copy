import { BlockComponent } from '@my-app/app/src/framework/engine/types'
import React, { FC, useEffect, useState } from 'react'
import { Text, StyleSheet } from 'react-native'
import useStyles from '@my-app/app/src/framework/styleguide/hooks/useStyles'
import { TouchableOpacity } from 'react-native-ui-lib'
import { useExtension } from '@my-app/app/src/framework/engine/extension/context'
import { useLinkTo } from '@react-navigation/native'
import { useAuth } from '@my-app/app/src/framework/engine/render'



const Logout: FC<BlockComponent> = ({ props }) => {
    const styles = useStyles(props?.style)
    const { hooks } = useExtension();


    const onPress = async () => {
        const submit = hooks[props?.context]
        await submit({
            hooks
        })
    }

    return <TouchableOpacity onPress={() => onPress()}>
        <Text style={[defaultStyles.logout, styles?.text]}>Cerrar Sesión</Text>
    </TouchableOpacity>
}

const defaultStyles = StyleSheet.create({
    logout: {
        textDecorationLine: "underline",
    }
})

export default Logout

