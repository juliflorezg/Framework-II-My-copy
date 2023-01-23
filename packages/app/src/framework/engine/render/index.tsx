import React, { FC, memo, useEffect, useMemo, useState } from 'react'
import {
    NavigationContainer,
} from '@react-navigation/native';
import getNavigatorLinkingConfig from '../utils/getNavigatorLinkingConfig';
import { getNavigator, } from '../utils/getNavigator';
import { buildScreens } from '../utils/buildScreens';
import isEqual from 'lodash.isequal'
import { useEngine } from '../contex';
import { useCommons } from '../../omni-logic/kernel/utils/use-hook';
import { useGlobalState } from '../../state-machine';
import { useActor } from '@xstate/react';
import { useStyleguide } from '../../styleguide/context';

type AuthConfig = {
    machineName: string
    pointer: string
}

export const useAuth = (config: AuthConfig) => {
    const machines = useGlobalState()
    const [{ value }] = machines[config.machineName].actor
    return value === config.pointer
}

const Render: FC = () => {
    const isAuth = useAuth({
        machineName: "authentication",
        pointer: "authorized"
    })

    console.log(isAuth)

    const { routes, rawHooks } = useEngine();
    const { sharedComponents: { icons, ui } } = useStyleguide()
    
    const RootScreens = useMemo(() => {
        return buildScreens(routes, {
            isAuth: isAuth,
            icons,
            ui
        }, rawHooks) 
    }, [isAuth, icons, ui])



    const Root = useMemo(() => getNavigator(routes.rootType), [routes, isAuth]);

    const linking = useMemo(() => ({
        prefixes: routes.prefixes || [],
        config: {
            screens: getNavigatorLinkingConfig(routes),
        },
    }), [routes]);




    return <NavigationContainer linking={linking}>
        <Root.Navigator initialRouteName={routes.initialRouteName}>
            {RootScreens}
        </Root.Navigator>
    </NavigationContainer>
}

export default memo(Render, isEqual)