import React, {FC, useEffect, useState, useCallback} from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { BlockComponent } from '@my-app/app/src/framework/engine/types';
import { Text } from '@my-app/ui';
import { useExtension } from '@my-app/app/src/framework/engine/extension/context';
import { addVarToString } from '@my-app/app/src/framework/omni-logic/plugin/utils/addVarToString';
import { useLinkTo } from '@react-navigation/native';
import { CategoryListProps, ConnectedType, Categories } from '../types';
import { ArrowRightSecondVariant } from '@my-app/ui/src/icons';
import { Category } from '../../../../utils/category';

const useSharedValue = ({ context }: ConnectedType) => {
  if (!context) return null;
  const { hooks } = useExtension();
  //@ts-ignore
  const fn = hooks[context];
  const [response, setResponse] = useState(null);
  useEffect(() => {
    if (typeof fn !== 'function') return;
    fn().then((res) => setResponse(res));
  }, []);
  return response;
};

const CategoryList: FC<BlockComponent<CategoryListProps>> = ({
  props
}) => {

  const style = props?.style;
  const context = props?.context;

  const sharedValue = useSharedValue({ context });
  //@ts-ignore
  const data: Category = sharedValue?.CategorySearch

  const linkTo = useLinkTo();
  const redirectTo = props.redirectTo;

  const onSubmit = useCallback((term:string) => {
    console.log("termino", {term});
    linkTo(addVarToString(redirectTo, {term}));
  }, [])

  const renderItem = (({ item }) => {
    return (
      <>
        <TouchableOpacity onPress={() => onSubmit(item.name) }>
          <View style={[ defaultStyles.containerCategory ,style?.containerCategory ]}>
            <Text style={[ defaultStyles.textCategory, style?.textCategory ]}>
              {item.name}
            </Text>
            <ArrowRightSecondVariant stroke={"#1C1C1C"} />
          </View>
        </TouchableOpacity> 
      </> 
    )
  })
           
 
  return(
    <View style={[ defaultStyles.container, style?.container ]}>
      <Text style={[ defaultStyles.title, style?.title ]}>
        Categorías
      </Text>
      <FlatList
        style={{flex: 1}}
        data={data}
        keyExtractor={ item => item.id}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        initialNumToRender={10}
        renderItem={renderItem}
        onEndReachedThreshold={0.5}
      />                   
    </View>
  )
}

export default CategoryList;

const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    width: "70%",
    height: "100%",
    backgroundColor: "#fff",
    paddingBottom: 10
  },
  title: {
    marginTop: 15,
    marginLeft: 10,
    color: "#142032",
    fontSize: 18,
    fontWeight: "bold"
  },
  containerCategory: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 24,
  },
  textCategory: {
    color: "#142032",
    fontSize: 20,
    fontWeight: "400"
  },
  containerSubcategory: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginLeft: 64,
    paddingRight: 30
  },
  textSubcategory: {
    color: "#142032",
    fontSize: 16,
    fontWeight: "400"
  }
 });