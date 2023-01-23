import React, {FC} from 'react';
import {BlockComponent} from '@my-app/app/src/framework/engine/types';
import {TabController} from 'react-native-ui-lib';
import useChildren from '@my-app/app/src/framework/engine/hooks/useChildren';

type TabControllerProps = {
  children: React.ReactElement;
  index: number;
  lazy?: boolean
};

const TabPage: FC<BlockComponent<TabControllerProps>> = ({props, children}) => {
  const childrens = useChildren({children});

  return (
    
    <TabController.TabPage index={props?.index} lazy={props?.lazy || false}>
      {childrens}
    </TabController.TabPage>
  );
};

export default TabPage;
 
 