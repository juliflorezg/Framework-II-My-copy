import React, { FC, Fragment, useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";

import { CommerceProvider } from '@vercel/commerce-shopify/index'

import Engine from "./framework/engine";
import { PluginProvider } from "./framework/omni-logic/plugin";
import { StyleguideProvider, StyleguideProps } from "./framework/styleguide/context";
import { EngineProps } from "./framework/engine/contex";
import { GlobalStateProvider } from "./framework/state-machine";
import AppStorage from "./framework/styleguide/utils/async-storage";

const AppRender: FC<FrameworkProps> = (props) => {
  const [loading, setLoading] = useState(true)
  let stateMachines = {
    ...props?.stateMachines?.machine
  }
  const loadState = async () => {
    for (let key in props?.stateMachines?.machine) {
      if (key in props?.stateMachines?.machineActions) {
        const initialVal = await AppStorage.getData(`${key}-xstate`)
        if(initialVal) {
          stateMachines[key].config.initial = initialVal[0].value
          stateMachines[key].config.context = initialVal[0].context
        }
      }
    }
   
}

  const loadInitialData = async() => {
    await loadState()
    setLoading(false)
  }

  useEffect(() => {
    loadInitialData()
  }, [])

  if(loading) return null

  return (
    <CommerceProvider locale='es-CO'>
      <PluginProvider locale="es-co" config={{
        variables: {
          domain: props?.config?.variables?.domain
        }
      }}>
        <StyleguideProvider config={{
          theme: props.theme,
          styles: props.styles,
          CustomComponents: {},
          sharedComponents: props.sharedComponents
        }}>
          <StatusBar backgroundColor={'#fff'} barStyle="dark-content" />
          <GlobalStateProvider stateMachines={{
            machine: stateMachines,
            machineActions: props?.stateMachines?.machineActions
          }}>
            <Engine
              blocks={props.blocks}
              rawHooks={props.hooks}
              routes={props.routes}
            />
          </GlobalStateProvider>
        </StyleguideProvider>
      </PluginProvider>
    </CommerceProvider>
  )
}



type FrameworkProps = EngineProps['data'] & StyleguideProps['config']

const App: FC<FrameworkProps> = (props) => {

  return <SafeAreaView style={styles.root}>
    <AppRender {...props} />
  </SafeAreaView>
}

export { App }

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
});
