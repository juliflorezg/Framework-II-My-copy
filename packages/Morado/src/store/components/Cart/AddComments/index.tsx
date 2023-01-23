

import {useCommons} from '@my-app/app/src/framework/omni-logic/kernel/utils/use-hook';
import {useGlobalState} from '@my-app/app/src/framework/state-machine';
import useStyles from '@my-app/app/src/framework/styleguide/hooks/useStyles';
import { useUI } from '@my-app/app/src/framework/ui-action-handler';
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


const MachineConfig = {
  machineName: 'cartManager',
  pointer: 'products',
};

type AddCommentsProps = {
  children: React.ReactNode;
  style?: string;
  text?: string; 
};

type StyleProps = {
  addCommentsContainer?: ViewStyle;
  addCommentsWrapper?: ViewStyle;
  addCommentsTitle?: TextStyle;
  addCommentsSubtitle?: TextStyle;
  addCommentsArrowContainer?: ViewStyle;
  addCommentsWrapperText?: ViewStyle;
};

const addCommentsComponent: FC<BlockComponent<AddCommentsProps>> = ({
  props,
  children,
}) => {
  const Styles = useStyles(props?.style) as StyleProps;
  const {openModal} = useUI();
  const {StateMachine} = useCommons();
  const machines = useGlobalState();
  const [{context}] = machines[MachineConfig.machineName]?.actor;
  const [data, setData] = useState({
    products: [],
  });

  useEffect(() => {
    const machine = StateMachine.getData(MachineConfig.machineName);
    if (machine) {
      const {context} = machine;
      setData({
        products: context[MachineConfig.pointer],
      });
    }
  }, [context[MachineConfig.pointer]]);

  const childrens = useChildren({children});

  const openAction = () => {
    openModal({
      content: childrens,
    });
  };

 
  return ( 
    <>
   {data?.products.length > 0 && <TouchableOpacity
      style={[, defaultStyles.container, Styles?.addCommentsContainer]}
      onPress={openAction}>
      <View style={[defaultStyles.wrapper, Styles?.addCommentsWrapper]}>
        <View
          style={[
            defaultStyles.addCommentsWrapperText,
            Styles?.addCommentsWrapperText,
          ]}>
          <Text style={[defaultStyles.title, Styles?.addCommentsTitle]}>
            {'Hacer una observación'}
          </Text>
          <Text style={[defaultStyles.subtitle, Styles?.addCommentsSubtitle]}>
            {'Dinos lo que piensas de los productos'}
          </Text>
        </View>

        <View
          style={[
            defaultStyles.arrowContainer,
            Styles?.addCommentsArrowContainer,
          ]}>
          <ArrowRightSecondVariant stroke={'#fff'} />
        </View>
      </View>
    </TouchableOpacity>}
  </>  
  );
};

export default addCommentsComponent;

const defaultStyles = StyleSheet.create({
  container: {},
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom:20,
  },
  title: {
    fontSize: 18,

    color: '#390052',

    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,

    color: '#390052',

    marginTop: 4,
  },
  addCommentsWrapperText: {},
  arrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 18,
    height: 18,
    borderRadius: 18,
    backgroundColor: '#AA26C6',
  },

  modalWrapper: {
    backgroundColor: '#fff',
    height: 200,
    padding: 16,
    borderRadius: 6,
    shadowOffset: {
      height: 10,
      width: 0,
    },
    shadowOpacity: 0.25,
    elevation: 10,
    width: '88%',
  },
  inputContainer: {
    marginBottom: 10,
    borderColor: '#E1E1E1',
    height: 48,
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 10,
  },
  placeholder: {
    fontSize: 14,
    color: '#390052',
    marginBottom: 10,
  },
  input: {
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#390052',
  },
});