import React, {FC, useEffect, useMemo, useState} from 'react';
import {Text} from '@my-app/ui';
import {TextStyle, View, ViewStyle} from 'react-native';
import {useExtension} from '@my-app/app/src/framework/engine/extension/context';
import useChildren from '@my-app/app/src/framework/engine/hooks/useChildren';
import {BlockComponent} from '@my-app/app/src/framework/engine/types';
import {addVarToString} from '@my-app/app/src/framework/omni-logic/plugin/utils/addVarToString';
import useStyles from '@my-app/app/src/framework/styleguide/hooks/useStyles';
import {useCommons} from '@my-app/app/src/framework/omni-logic/kernel/utils/use-hook';
import {useGlobalState} from '@my-app/app/src/framework/state-machine';

type Props = {
  style?: string;
};

 
interface StyleProps {
    container?: ViewStyle;
    text?: TextStyle;
    title?: TextStyle;
}


const MachineConfig = {
    machineName: 'wishlistManager',
    pointer: 'count',
  };

 const WishlistCounter: FC<BlockComponent<Props>> = ({props}) => {
     
  const {StateMachine} = useCommons();
  const [totalWishlistItems, setTotalWishlistItems] = useState(0);
  const machines = useGlobalState();

  const [{context}] = machines[MachineConfig.machineName]?.actor;

  useEffect(() => {
    const machine = StateMachine.getData(MachineConfig.machineName);
    if (machine) {
      const {context} = machine;
      setTotalWishlistItems(context[MachineConfig.pointer]);
    }
  }, [context[MachineConfig.pointer]]);

  const text = props?.text;

  const style = props?.style;

  const TextStyles = useStyles(style) as StyleProps;

  // const childrens = useChildren({children});

 
    return <>
      {totalWishlistItems > 0 &&
      <View style={TextStyles?.container}>
         <Text style={TextStyles?.title}>{`Tus productos favoritos`}</Text>
        <Text style={TextStyles?.text}>{`${totalWishlistItems} productos favoritos`}</Text>
      </View>
    }
    </>;
 

 
};

export default WishlistCounter;
