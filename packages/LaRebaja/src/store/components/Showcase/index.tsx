import React, {
 FC
} from 'react';
import { BlockComponent } from '@my-app/app/src/framework/engine/types';

import useChildren from '@my-app/app/src/framework/engine/hooks/useChildren'
import { View, StyleSheet, Text } from 'react-native'




type ShowcaseProps = {
 superShowcase: boolean

}

const Showcase: FC<BlockComponent<ShowcaseProps>> = ({ props: { superShowcase }, children }) => {
 const childrens = useChildren({ children })

 const renderSuperShowcase = (childrens: any) => {
  return (
   <View style={styles.containerSuper}>
    {childrens}
   </View>
  )

 }


 return (
  <>
   {!superShowcase
    ?
    <View style={styles.container}>
     {childrens}
    </View>
    :
    renderSuperShowcase(childrens)
   }
  </>
 )
}

const styles = StyleSheet.create({

 containerSuper: {
  flex: 1,
  width: '100%',
  alignItems: 'center',
  height: 480,
  marginTop: 10
 },
 container: {
  backgroundColor: '#fff',
  marginTop: 10,
  marginBottom: 15,
  padding: 10,
  borderRadius: 10,
  shadowColor: "#000",
  shadowOffset: {
   height: 10,
   width: 0,
  },
  shadowOpacity: 0.25,
  elevation: 10,
  height: 400,
  width: '90%',
 }
})
export default Showcase
