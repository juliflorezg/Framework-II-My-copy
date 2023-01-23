import React, {FC, Fragment, useMemo, useState} from 'react';
import {Icons, Link} from '@my-app/ui';

import {BlockComponent} from '@my-app/app/src/framework/engine/types';
import useStyles from '@my-app/app/src/framework/styleguide/hooks/useStyles';
import {ParamListBase, RouteProp, useRoute} from '@react-navigation/native';
import {Image} from '@my-app/ui';
import {View, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle} from 'react-native';
import useChildren from '@my-app/app/src/framework/engine/hooks/useChildren';
import {ExpandableSection} from 'react-native-ui-lib';
import {ChevronDown, ChevronUp} from '@my-app/ui/src/icons';

type ConditionalCollectionProps = {
  categories:  CategoriesProps;
  style?: string;
};

type CategoriesProps = {
  'cuidado-del-cabello'?: ItemProps;
  uñas?: ItemProps;
  corporal?: ItemProps;
  barberia?: ItemProps;
  facial?: ItemProps;
  electricos?: ItemProps;
  'aseo-y-bioseguridad'?: ItemProps;
  fragancias?: ItemProps;
};

type ItemProps = {
  children?: React.ReactNode | null;
};

type ParamsRoutes = {
  params: {
    department: string;
  };
};

type StyleProps = {
  container?:ViewStyle;
  containerText?:ViewStyle;
  text?:TextStyle
}
export const ConditionalCollection: FC<
  BlockComponent<ConditionalCollectionProps>
> = ({props}) => {
  const {params} = useRoute<RouteProp<ParamListBase, string>>() as ParamsRoutes;
  const [visible, setVisible] = useState(true);
  if (!params?.department) return;
  const styles = useStyles(props?.style) as StyleProps
  const children = props?.categories[params?.department]?.children;

  if (!children) return;

  const childrens = useChildren({children});

  return (
    <>
      <ExpandableSection
        top
        expanded={visible}
        sectionHeader={
          <View style={[defaultStyles.containerText, styles.containerText]}>
            <Text style={[defaultStyles.text, styles.text]}>{'Ver promociones'}</Text>
            {!visible ? (
              <ChevronDown width={20} height={20} stroke={'#390052'} />
            ) : (
              <ChevronUp width={20} height={20} stroke={'#390052'} />
            )}
          </View>
        }
        onPress={() => setVisible(!visible)}
      />

      {visible && <View style={[defaultStyles.container, styles.container]}>{childrens}</View>}
    </>
  );
};

const defaultStyles = StyleSheet.create({
  container: {
    height: 300,
  },
  containerText: {
    margin: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  text: {
   
    fontSize: 18,
    color: '#390052',
    justifyContent: 'center',
    textAlign: 'center',
  },
});

 
