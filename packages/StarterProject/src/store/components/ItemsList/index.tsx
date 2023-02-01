import {useCommons} from '@my-app/app/src/framework/omni-logic/kernel/utils/use-hook';
import useStyles from '@my-app/app/src/framework/styleguide/hooks/useStyles';
import React, {FC, useEffect, useState} from 'react';
import {View, Text, StyleSheet, ViewStyle, TextStyle} from 'react-native';
import useChildren from '@my-app/app/src/framework/engine/hooks/useChildren';

import {BlockComponent} from '@my-app/app/src/framework/engine/types';

// type Ability = {
//   name: string;
//   url: string;
// };

type ItemOption = {
  // ability: Ability;
  name: string;
  url: string;
};

type ItemsListProps = {
  children: React.ReactNode;
  style?: string;
  titleText: string;
  machineName: string;
  pointer: string;
};

type StyleProps = {
  addCommentsContainer: ViewStyle;
  addCommentsWrapper: ViewStyle;
  addCommentsTitle: TextStyle;
  addCommentsSubtitle: TextStyle;
  addCommentsArrowContainer: ViewStyle;
  addCommentsWrapperText: ViewStyle;
};

const ItemsList: FC<BlockComponent<ItemsListProps>> = ({props, children}) => {
  const MachineConfig = {
    machineName: props.machineName,
    pointer: props.pointer,
  };
  const Styles = useStyles(props?.style) as StyleProps;
  const {StateMachine} = useCommons();
  const [data, setData] = useState({
    arrayItems: [],
  });

  useEffect(() => {
    const machine = StateMachine.getData(MachineConfig.machineName);

    if (machine) {
      const {context} = machine;
      setData({
        arrayItems: context.user[MachineConfig.pointer],
      });
    }
  }, []);

  const childrens = useChildren({children});

  return (
    <>
      {data && data?.arrayItems.length > 0 && (
        <View style={defaultStyles.container}>
          <Text>{JSON.stringify(data.arrayItems)}</Text>
          <Text style={defaultStyles.title}>{props.titleText}</Text>
          {data?.arrayItems.map((item: ItemOption, i: number) => (
            <Text key={item.name + i} style={defaultStyles.item}>
              {item.name}
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
  item: {
    fontSize: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    marginBottom: 20,
    marginHorizontal: 20,
  },
});
