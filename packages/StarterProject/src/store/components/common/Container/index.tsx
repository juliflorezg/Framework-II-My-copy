import React, { FC } from 'react'
import { BlockComponent } from '@my-app/app/src/framework/engine/types'
import { Grid, GridType } from '@my-app/ui'
import useChildren from '@my-app/app/src/framework/engine/hooks/useChildren'
import useStyles from '@my-app/app/src/framework/styleguide/hooks/useStyles'


const GridComponent: FC<BlockComponent<GridType>> = ({ props, children }) => {
    const GridStyles = useStyles(props?.style);
    const childrens = useChildren({ children })
    return <Grid
        styles={GridStyles}
        container={props?.container}
        direction={props?.direction}
        justifyContent={props?.justifyContent}
        alignItems={props?.alignItems}
        flex={props?.flex}
        mode={props?.mode}
        horizontal={props?.horizontal}
        showsVerticalScrollIndicator={props?.showsVerticalScrollIndicator}
        >
        {childrens}
    </Grid>
}

export default GridComponent