import {useExtension} from '@my-app/app/src/framework/engine/extension/context';
import {BlockComponent} from '@my-app/app/src/framework/engine/types';
import {makeid} from '@my-app/app/src/framework/engine/utils/randomKey';
import { useCommons } from '@my-app/app/src/framework/omni-logic/kernel/utils/use-hook';
import {addVarToString} from '@my-app/app/src/framework/omni-logic/plugin/utils/addVarToString';
import useStyles from '@my-app/app/src/framework/styleguide/hooks/useStyles';
import {Input} from '@my-app/ui/src';
import {ArrowLeft} from '@my-app/ui/src/icons';
import {useLinkTo, useNavigation} from '@react-navigation/native';
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {View, Text, FlatList, StyleSheet, Modal, TouchableWithoutFeedback, ViewStyle, TextStyle} from 'react-native';
import {
  TouchableOpacity,
} from 'react-native-ui-lib';
import {RefreshIcon, SearchIcon} from '../../icons';
import {ConnectedType} from '../../RichText';


type ItemProps = {
  item: {term: string};
};

type IProps = {
  text?: string;
  style?: string;
  redirectTo: string;
  context: string;
};

type StyleProps = {
  container?: ViewStyle;
  containerModal?: ViewStyle;
  wrapperModal?: ViewStyle;
  wrapperModalInput?: ViewStyle;
  searchIcon?: ViewStyle;
  modalInput?: TextStyle;
  textStyles?: TextStyle;
  modalTextSubtitle?: TextStyle;
  modalListStyles?: ViewStyle;
};


const useSharedValue = ({context}: ConnectedType) => {
  if (!context) return null;
  const {hooks} = useExtension();
  //@ts-ignore
  const fn = hooks[context];
  const [response, setResponse] = useState(null);

  useEffect(() => {
    if (typeof fn !== 'function') return;
    fn().then((res: any) => setResponse(res));
  }, []);

  return response;
};

const SearchInputComponent: FC<BlockComponent<IProps>> = ({props}) => {
  const { StateMachine} = useCommons()

  console.log("Comparacion", StateMachine.getData("topSearches")?.value === "visible")
  const [openAction, setOpenAction] = useState(false);
  const [term, setTerm] = useState('');
  const linkTo = useLinkTo();
  const context = props?.context;
  const sharedValue = useSharedValue({context});
  const flatListRef = useRef<FlatList>(null);
  const SearchInputStyles = useStyles(props?.style) as StyleProps
  
  const onChangeText = (text: string) => {
    setTerm(text);
  };
 
  const onClick = () => {
    setOpenAction(true);
  };

  const onCancel = () => {
    setOpenAction(false);
  };

  const onSubmit = useCallback(() => {
    const redirectToUrl = addVarToString(props.redirectTo, {term});
    linkTo(redirectToUrl);
    setTerm('');
    setOpenAction(false);
  }, [term]);

  const list = useMemo(() => {
    let data: any[] = [];
    //@ts-ignore
    if (sharedValue?.useTopSearches?.searches)
      //@ts-ignore
      data = sharedValue?.useTopSearches?.searches;
    return data;
    //@ts-ignore
  }, [sharedValue?.useTopSearches?.searches]);

  const renderItem: FC<ItemProps> = ({item}) => (
    <TouchableOpacity onPress={() => onChangeText(item?.term)} key={item?.term}>
      <View style={defaultStyles.itemContainer}>
        <RefreshIcon color={'#1A1919'} />
        <Text style={defaultStyles.textStyles}>{item.term}</Text>
      </View>
    </TouchableOpacity>
  );

  return !openAction ? (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={SearchInputStyles?.container}>
        <Text style={SearchInputStyles?.textStyles}>
          {props.text || <Text>Buscar en<Text style={{fontWeight: "bold"}}> La Rebaja</Text></Text>}
        </Text>
        <View style={SearchInputStyles?.searchIcon}>
          <SearchIcon
            color={'#390052'}
            // fill={fill}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  ) : (
    <Modal animationType="slide" visible={openAction} transparent={true}>
      <View
        style={[SearchInputStyles?.containerModal, defaultStyles.container]}>
        <View style={[SearchInputStyles?.wrapperModal, defaultStyles.wrapper]}>
          <View
            style={[
              SearchInputStyles?.wrapperModalInput,
              defaultStyles.wrapperInput,
            ]}>
            <TouchableOpacity onPress={onCancel}>
              <ArrowLeft
                color={'#1A1919'}
                // fill={fill}
              />
            </TouchableOpacity>
            <Input
              styles={[SearchInputStyles?.modalInput, defaultStyles.input]}
              onChangeText={onChangeText}
              placeholder="Buscar en La Rebaja"
              value={term}
            />
            <TouchableOpacity onPress={onSubmit}>
              <SearchIcon
                color={'#390052'}
                // fill={fill}
              />
            </TouchableOpacity>
          </View>
        </View>

        <Text
          style={[
            SearchInputStyles?.modalTextSubtitle,
            defaultStyles.textSubtitle,
          ]}>
          {'Busquedas recientes...'}
        </Text>

        <FlatList
          ref={flatListRef}
          style={[SearchInputStyles?.modalListStyles, defaultStyles.listStyles]}
          data={list}
          keyExtractor={item => item.term}
          showsVerticalScrollIndicator={false}
          horizontal={false}
          initialNumToRender={1}
          maxToRenderPerBatch={1}
          numColumns={1}
          renderItem={renderItem}
        />
      </View>
    </Modal>
  );
};

export default SearchInputComponent;

const defaultStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 6,
    shadowOffset: {
      height: 10,
      width: 0,
    },
    shadowOpacity: 0.25,
    elevation: 10,
    height: '100%',
    width: '100%',
  },
  wrapper: {
    borderRadius: 16,

    paddingHorizontal: 8,
    paddingTop: 10,
    marginTop: 32,
  },
  wrapperInput: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    color: '#c2c2c2',
    flex: 1,
    marginLeft: 10,
    fontFamily: 'Poppins-SemiBold',
  },
  textStyles: {
    color: '#1A1919',
    flex: 1,
    fontWeight: '300',
    fontSize: 16,
    marginLeft: 16,
    fontFamily: 'Poppins',
    textTransform: 'capitalize',
  },
  itemContainer: {
    height: 20,
    width: '100%',
    marginBottom: 10,
    flexDirection: 'row',
  },
  textSubtitle: {
    paddingTop: 20,
    fontSize: 13,
    color: '#DD1E2F',
    fontFamily: 'Poppins-SemiBold',
  },
  listStyles: {
    marginHorizontal: 8,
    marginVertical: 16,
    paddingBottom: 18,
  },
});
