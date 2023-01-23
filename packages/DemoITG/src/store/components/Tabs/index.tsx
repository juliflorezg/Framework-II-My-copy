import {BlockComponent} from '@my-app/app/src/framework/engine/types';
import React, {FC} from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import {TabController, TabControllerItemProps} from 'react-native-ui-lib';
import useStyles from '@my-app/app/src/framework/styleguide/hooks/useStyles';
import useChildren from '@my-app/app/src/framework/engine/hooks/useChildren';


type TabControllerProps = {
  items: TabControllerItemProps[];
  children: React.ReactElement;
  enableShadows: boolean;
  style: string;
};

type TabStyleProps = {
  container?: ViewStyle;
  indicatorStyle?: ViewStyle;
  wrapper?: ViewStyle;
};

const TabsController: FC<BlockComponent<TabControllerProps>> = ({
  props,
  children,
}) => {
  const style = props?.style;
  const tabControllerStyle = useStyles(style) as TabStyleProps;
  const childrens = useChildren({children});

  return (
    <View style={[tabControllerStyle?.container, defaultStyles.container]}>
      <TabController items={props?.items}>
        <TabController.TabBar
          indicatorStyle={[
            tabControllerStyle?.indicatorStyle,
            defaultStyles.indicatorStyle,
          ]}
          enableShadows={props?.enableShadows || false}
        />
        <View style={[tabControllerStyle?.wrapper, defaultStyles.wrapper]}>
          {childrens}
        </View>
      </TabController>
    </View>
  );
};

const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#FFFDFD",
  },
  wrapper: {
    flex: 1,
    backgroundColor:"#FFFDFD",
   
  },
  indicatorStyle: {backgroundColor: '#390052', height: 2},
});

export default TabsController;
