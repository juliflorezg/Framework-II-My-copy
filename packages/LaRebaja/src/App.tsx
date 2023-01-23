import React from 'react'
import { App } from '@my-app/app';
import Blocks from './store/blocks/content.json'
import styleguide from './store/components';
import Routes from './store/routes/routes.json'
import Theme from './store/theme/theme.json'
import Styles from './store/styles/styles.json'
import Hooks from './store/hooks/hooks.json'
import machine from './store/state-machine/machine.json'
import * as machineActions from './store/state-machine/actions'

const Main = () => {
    return <App
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