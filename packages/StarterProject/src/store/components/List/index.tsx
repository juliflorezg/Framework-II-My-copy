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
import {useExtension} from '@my-app/app/src/framework/engine/extension/context';

interface PokemonListProps {
  children: React.ReactNode;
  style?: string;
  titleText: string;
  hookName: string;
}

interface StyleProps {
  addCommentsContainer: ViewStyle;
  addCommentsWrapper: ViewStyle;
  addCommentsTitle: TextStyle;
  addCommentsSubtitle: TextStyle;
  addCommentsArrowContainer: ViewStyle;
  addCommentsWrapperText: ViewStyle;
}

interface ItemOption {
  name: string;
  url: string;
}

const PokemonList: FC<BlockComponent<PokemonListProps>> = ({
  props,
  children,
}) => {
  const hookName = props?.hookName;
  const [data, setData] = useState({
    results: [],
  });
  //? aquí obtenemos info del hook
  const {hooks} = useExtension();
  const context = hookName ?? 'usePokemonList';
  const submit = hooks[context as unknown as number];
  //? ********************************

  const componentDidMount = async () => {
    const results = await submit({
      hooks,
    });
    setData(results[context]);
  };

  useEffect(() => {
    componentDidMount();
  }, []);

  return (
    <>
      {data && data?.results.length > 0 && (
        <View style={defaultStyles.container}>
          <Text style={defaultStyles.title}>{props?.titleText}</Text>
          {data?.results.map((item: ItemOption, i: number) => (
            <Text key={item.name + i} style={defaultStyles.listItem}>
              {' '}
              ~*~ {item.name}
            </Text>
          ))}
        </View>
      )}
    </>
  );
};

export default PokemonList;

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
    color: 'blue',
    fontWeight: 'bold',
  },
  listItem: {
    fontSize: 18,
    color: 'blue',
  },
});
