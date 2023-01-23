import React, { FC } from "react";
import { Icons } from "@my-app/ui";
import * as LocalIcons from '../icons'
import { BlockComponent } from "@my-app/app/src/framework/engine/types";
import useStyles from '@my-app/app/src/framework/styleguide/hooks/useStyles'


type StoreIconsTypes = {
    name: string
    style?: any;
}

export const StoreIcons: FC<BlockComponent<StoreIconsTypes>> = ({ props }) => {

    const nestedIcons = {
        ...LocalIcons,
        ...Icons
    }

    const TextStyles = useStyles(props.style);

    const Icon = nestedIcons[props.name]
    return (
        <Icon {...props} style={TextStyles.container} />
    );
}