import {useCommons} from '@my-app/app/src/framework/omni-logic/kernel/utils/use-hook';
import {useGlobalState} from '@my-app/app/src/framework/state-machine';
import useStyles from '@my-app/app/src/framework/styleguide/hooks/useStyles';
import {ArrowRightSecondVariant} from '@my-app/ui/src/icons';
import React, {FC, useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import useChildren from '@my-app/app/src/framework/engine/hooks/useChildren';

import {BlockComponent} from '@my-app/app/src/framework/engine/types';

type Ability = {
  name: string;
  url: string;
};

type ItemOption = {
  ability: Ability;
};

type ItemsListProps = {
  children: React.ReactNode;
  style?: string;
  text: string;
};

type StyleProps = {
  addCommentsContainer: ViewStyle;
  addCommentsWrapper: ViewStyle;
  addCommentsTitle: TextStyle;
  addCommentsSubtitle: TextStyle;
  addCommentsArrowContainer: ViewStyle;
  addCommentsWrapperText: ViewStyle;
};

const MachineConfig = {
  machineName: 'authentication',
  pointer: 'habilidadesEnMaquina',
};

const ItemsList: FC<BlockComponent<ItemsListProps>> = ({props, children}) => {
  const Styles = useStyles(props?.style) as StyleProps;
  const {StateMachine} = useCommons();
  const machines = useGlobalState() as object;
  const [{context}] = machines[MachineConfig.machineName]?.actor;
  const [data, setData] = useState({
    abilities: [],
  });

  useEffect(() => {
    const machine = StateMachine.getData(MachineConfig.machineName);

    if (machine) {
      const {context} = machine;
      setData({
        abilities: context.user.habilidadesEnMaquina,
      });
    }
  }, [context[MachineConfig.pointer]]);

  const childrens = useChildren({children});

  return (
    <>
      {data && data?.abilities.length > 0 && (
        <View style={defaultStyles.container}>
          {data?.abilities.map((ability: ItemOption, i: number) => (
            <Text key={ability.ability.name + i} style={defaultStyles.title}>
              {ability.ability.name}
            </Text>
          ))}
        </View>
      )}
    </>
  );
};

export default ItemsList;

const defaultStyles = StyleSheet.create({
  container: {},
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});
