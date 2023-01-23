import React from 'react'
import { App } from '@my-app/app';
import Blocks from './src/store/blocks/content.json'
import styleguide from './src/store/components';
import Routes from './src/store/routes/routes.json'
import Theme from './src/store/theme/theme.json'
import Styles from './src/store/styles/styles.json'
import Hooks from './src/store/hooks/hooks.json'
import machine from './src/store/state-machine/machine.json'
import * as machineActions from './src/store/state-machine/actions'
import configJson from './src/store/config.json'

const Main = () => {
  return <App
    config={configJson}
    blocks={Blocks}
    routes={Routes}
    theme={Theme}
    sharedComponents={{
      ui: styleguide.ui,
      utils: styleguide.utils,
      icons: styleguide.icons
    }}
    styles={Styles}
    hooks={Hooks}
    stateMachines={{
      machine,
      machineActions
    }}
  />
}

export default Main



