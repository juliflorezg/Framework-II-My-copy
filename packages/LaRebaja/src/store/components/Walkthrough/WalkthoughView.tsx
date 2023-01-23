import { BlockComponent } from "@my-app/app/src/framework/engine/types"
import React, { FC, Fragment } from "react"
import { View, StyleSheet, Text, } from "react-native"
import { Link } from "@my-app/ui"
import { Icons } from "@my-app/ui";
import useStyles from '@my-app/app/src/framework/styleguide/hooks/useStyles'
import useChildren from '@my-app/app/src/framework/engine/hooks/useChildren';

type WalkthroughViewProps = {
    textBtn?: string
    textLink?: string
    urlBtn?: string
    urlLink?: string
    style?: any;
    location: string
}

const WalkthroughView: FC<BlockComponent<WalkthroughViewProps>> = ({
    props, children
}) => {
    const TextStyles = useStyles(props.style);
    const childrens = useChildren({ children });

    return <Fragment>
        <View style={defaultStyles.backgroundContainer}>
            <Icons.BackgroundGradient />
        </View>
        <View style={[defaultStyles.fakeActionSheet,
        TextStyles?.fakeActionSheet]
        }>
           {childrens}
        </View>
    </Fragment>
}

const defaultStyles = StyleSheet.create({
    //
    backgroundContainer: {
        position: "absolute",
        height: "100%",
        width: "100%"
    },
    fakeActionSheet: {
        position: "absolute",
        backgroundColor: "#fff",
        width: "100%",
        height: 394,
        elevation: 5,
        bottom: 0,
        borderTopLeftRadius: 50,
        alignItems: "center",
        
        justifyContent: "center"
    }
})

export default WalkthroughView