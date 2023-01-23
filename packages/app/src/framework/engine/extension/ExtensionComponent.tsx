import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React, { memo, useEffect } from "react"
import { importHooks, useEngine } from "../contex"
import useChildren from "../hooks/useChildren"
import isEqual from 'lodash.isequal'
import { ExtensionProvider } from "./context"
import Layout from "../../ui-action-handler/Layout"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useStyleguide } from "../../styleguide/context"
import { getConfig } from "../utils/getScreenConfig"

const ExtensionComponent = (props: NativeStackScreenProps<any, any>) => {
  const { blocks, rawHooks } = useEngine()
  const { sharedComponents: { icons, ui } } = useStyleguide()
  const routeName = props.route.name
  const currentScreen = blocks[`store.${routeName}`]
  const importContext = currentScreen?.importContext || []
  const hooks = importHooks(rawHooks, importContext)
  const childrens = useChildren(currentScreen)
  const navigation = useNavigation()
  const route = useRoute()

  let fnContext = {
    ...hooks
  }

  const config = getConfig(props?.screenProps, route, icons, ui, fnContext)

  useEffect(() => {
    navigation.setOptions(config)
  }, [])


  return <ExtensionProvider data={{ hooks }}><Layout>{childrens}</Layout></ExtensionProvider>
}

export default memo(ExtensionComponent, isEqual)