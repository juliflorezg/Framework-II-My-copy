import React, { createContext, FC, useContext, useEffect, useState } from 'react';
import { useInterpret, useActor } from '@xstate/react';
import { createMachine, interpret, Machine, State } from 'xstate';
import AppStorage from '../styleguide/utils/async-storage';
import { usePrevious } from '../engine/utils/usePrevious';
import isEqual from 'lodash.isequal';

export const GlobalStateContext = createContext({});


type Machine = {
    [x: string]: any
}

export const GlobalStateProvider: FC<{
    children: React.ReactElement,
    stateMachines: {
        machine: Machine,
        machineActions: any
    }
}> = (props) => {

    const buildMachines = (machine: Machine, machineActions: any) => {
        let machines = {}

        for (let key in machine) {
            if (key in machineActions) {
                let config = machine[key]?.config
                const options = machine[key]?.options
                if (!config && !options) throw new Error("Can't found config and options inside buildMachines", key)
                const actions = machineActions[key]

                let createdMachine = createMachine(config, {
                    actions: actions
                })
                const initialInterpreted = useInterpret(createdMachine);
                const [interpreted, setInterpreted] = useState(initialInterpreted)
                const actor = useActor(interpreted)

                // Use State.create() to restore state from a plain object

                useEffect(() => {
                    onUpdate()
                }, [actor])

                const onUpdate = async () => {
                    await AppStorage.storeData(`${key}-xstate`, actor)
                }

                const [{ value, context }] = actor
                console.log("Machine", value, context, key)
                machines = {
                    ...machines,
                    [key]: {
                        interpreted,
                        actor
                    }
                }
            } else {
                console.log("ERROR ", key)
            }
        }
        return machines
    }

    const assembleMachines = buildMachines(
        props.stateMachines.machine,
        props.stateMachines.machineActions
    )

    return (
        <GlobalStateContext.Provider value={assembleMachines}>
            {props.children}
        </GlobalStateContext.Provider>
    );
};



export function useGlobalState() {
    return useContext(GlobalStateContext)
}
